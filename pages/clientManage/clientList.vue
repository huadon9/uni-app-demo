<template>
	<view class="content">
    <view style="padding: 0 15px;background-color: transparent">
      <uni-search-bar placeholder="客户名称" @confirm="search" @cancel="cancelSearch" bgColor="#ffffff" v-model="client_name"></uni-search-bar>
    </view>
    <uni-list class="list-item" v-for="(item, index) in client_list" :key="index">
      <uni-list-item :title="item.name" :show-arrow="false" :note="item.region_type_name"></uni-list-item>    
      <view class="logo-info">
        <image class="li-image" src="http://ms.geto.pro/static_mobile/images/company.png" style="width: 120px;height: 86px;" mode="widthFix"></image>
        <view class="li-info"><uni-list-item title="客户分类：" :show-arrow="false" note="附属公司："></uni-list-item>  </view>
      </view>  
      <view class="bottom-btn">
        <button type="primary" size="mini">主辅客管理</button>
        <button type="default" size="mini">联系人维护</button>
        <button type="primary" size="mini" @click="goDetail(item)">详情</button>
        <button type="primary" size="mini">编辑</button>
      </view>
    </uni-list>
	</view>
</template>

<script>
  import { ClientApi } from '../../utils/ClientApi.js'
  import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
  import uniList from "@dcloudio/uni-ui/lib/uni-list/uni-list.vue"
  import uniListItem from "@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
        page: 1,
        client_name: '',
        client_list: [],
        load_all: false, // 列表是否全部加载 若是上拉加载更多无效
        isLoading: false // 是否正在加载 若是上拉暂停
			}
    },
    components: {
      uniSearchBar,
      uniList,
      uniListItem
    },
		onLoad() {
      this.getList()
		},
		methods: {
      async getList () {
        if (this.page > 1) {
          this.isLoading = true;
        }
        uni.showLoading()
        let res = await ClientApi.getInstance().getClientList({
          page: this.page,
          pagesize: 10,
          type: 1,
          name: this.client_name.value || ''
        })
        this.isLoading = false
        uni.hideLoading()
        if (res.data.code === 200000) {
          this.client_list = this.client_list.concat(res.data.data)
        } else {
          uni.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
          })
        }
      },
	    search (e) {
        this.page = 1
        this.client_list = []
        this.getList()
      },
      cancelSearch () {
        this.client_name = ''
        this.page = 1
        this.client_list = []
        this.getList()
      },
      goDetail (item) {
        uni.navigateTo({
            url: './clientDetail?item=' + JSON.stringify(item)
        });
      }
    },
    /**
     * 导航栏的按钮 需要在页面进行监听
     */
    onNavigationBarButtonTap (e) {
      console.log(e)
      console.log('tapped')
    },
    /**
     * 上拉触底的监听 
     */
    onReachBottom () {
      if (this.loadAllcommit) {
          return
      }            
      if (!this.isLoading) {
        this.page++
        this.getList()
      }
    }
	}
</script>

<style lang='scss'>

  .logo-info{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #f2f2f2;
    .li-info{
      flex: 1
    }

  }
  // 隐藏原列表上的装饰线
  /deep/.uni-list-item__container:after{
    display: none; 
  }
  /deep/.uni-searchbar{
    background-color: transparent
  }
  .bottom-btn{
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    button{
      width: calc(25% - 10px);
      height: 32px;
      margin: 0 5px;
      padding: 0;
    }
  }
  .list-item{
    margin-bottom: 10px;
  }
</style>
