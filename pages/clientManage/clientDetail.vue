<template>
	<view class="content">
    <view class="center-content">
      <image class="li-image" src="http://ms.geto.pro/static_mobile/images/company.png" style="width: 32px;height: 24px;" mode="widthFix"></image><text class="company-name">{{client_info.name}}</text>
    </view>
    <view class="more-info">
      <button type="primary" size="mini" @click="tabIndex = 1">客户信息</button>
      <button type="primary" size="mini" @click="printLog">主辅客关系</button>
    </view>
    <nav-bar :bar-items="switchBars" @change="barChange" :active-index.sync="tabIndex"></nav-bar>
    <view v-show="tabIndex == 0">
      <uni-list>
        <uni-list-item v-for="(item, index) in tab0List" :key="index"  :note="item.content">
          <view class="gt-list-content">{{item.create_user_name}} <text class="list-r">{{item.create_time}}</text></view>          
        </uni-list-item>
      </uni-list>
      <load-sign :load-all="loadAlltab0"></load-sign>
    </view>
    <view v-show="tabIndex == 1">
      <uni-list>
        <uni-list-item v-for="(item, index) in tab1List" :key="index"  :note="item.region + item.address">
          <view class="gt-list-content">{{item.project_name}}</view>          
        </uni-list-item>
      </uni-list>
      <load-sign :load-all="loadAlltab1"></load-sign>
    </view>
    <view class="add-new" @click="goFeedback"><text>+</text></view>
	</view>
</template>

<script>
  import { ClientApi } from '../../utils/ClientApi.js'
  import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
  import uniList from "@dcloudio/uni-ui/lib/uni-list/uni-list.vue"
  import uniListItem from "@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue"
  import NavBar from '@/components/NavBar/index'
  import LoadSign from '@/components/LoadSign/index'
  

	export default {
		data() {
			return {
        client_info: {},
        switchBars: [
          {
            label: '反馈记录'
          },
          {
            label: '项目信息',
            badge: 10,
            showBadge: true
          },
        ],
        tabIndex: 0,
        tab0List: [],
        tab0Page: 1,
        tab1List: [],
        tab1Page: 1,
        loadAlltab0: false,
        loadAlltab1: false,
        isLoading: false,
			}
    },
    components: {
      uniSearchBar,
      uniList,
      uniListItem,
      NavBar,
      LoadSign
    },
		onLoad(options) {
      let item = JSON.parse(options.item)
      this.client_info = item
      this.getList(0)
      uni.$on('update', this.listenUpdate)
		},
		methods: {
      barChange (index) {
        if (this[`tab${index}List`].length == 0) {
          this.getList(index)
        }
      },
      printLog () {
        console.log(this.tabIndex)
      },
      goFeedback () {
        uni.navigateTo({
          url: './feedbackDetail'
        })
      },
      async getList (tabIndex) {
        uni.showLoading()
        let res
        if (tabIndex == 0) {
          if (this.tab0Page > 1) {
            this.isLoading = true
          }
          res = await ClientApi.getInstance().getFeedbackList({
            page: this.tab0Page,
            sells_client_id: this.client_info.id
          })        
          uni.hideLoading()
          if (res.data.code === 200000) {
            if (this.tab0Page >= res.data.data.last_page) {
                this.isLoading = false 
                this.loadAlltab0 = true
                return
            }
            this.tab0List = this.tab0List.concat(res.data.data.data)
            this.tab0Page = parseInt(res.data.data.current_page)
          } 
        } else {
          if (this.tab1Page > 1) {
            this.isLoading = true
          }
          res = await ClientApi.getInstance().getProjectInfoList({
            page: this.tab1Page,
            sells_client_id: this.client_info.id
          })    
          uni.hideLoading()    
          if (res.data.code === 200000) {
            if (this.tab1Page >= res.data.data.last_page) {
                this.isLoading = false 
                this.loadAlltab1 = true
                return
            }
             this.tab1List = this.tab1List.concat(res.data.data.data)
             this.tab1Page = parseInt(res.data.data.current_page)
          }
        }
        
        if (res.data.code !== 200000) {          
          uni.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
          })          
        }
      },
      listenUpdate (e) {
        // console.log(e)
        if (this.tabIndex == 0) {
          this.tabIndex = 1         
        } else {
          this.tabIndex = 0
        }
        this.tab0List = []
        this.tab0Page = 1
        this.tab1List = []
        this.tab1Page = 1
        this.getList(this.tabIndex)
      }
    },
    /**
     * 上拉触底的监听 上拉刷新
     */
    onReachBottom () {
      if (this.tabIndex == 1) {     
        if (this.loadAlltab1) {
          return
        }            
        if (!this.isLoading) {
          this.tab1Page++
          this.getList(1)
        }
      } else {                   
        if (this.loadAlltab0) {
          return
        }                   
        if (!this.isLoading) {
          this.tab0Page++
          this.getList(0)
        }
      } 
    }
	}
</script>

<style lang='scss'>
  .center-content{
    .li-image{
      vertical-align: middle;
      margin-top: -3px
    }
    text-align: center;
    line-height: 34px
  }
  .company-name{
    color: #3a3a3a;
    font-size: 17px;
    font-weight: 600
  }
  .more-info{
    text-align: center;
    button{
      margin: 10px
    }
  }
  .add-new{
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #999;
    background-color: #fff;
  }
  .list-r{
    float: right;
  }
  
</style>
