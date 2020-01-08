<!--
 @author:
 @date:
 @description: SwitchBar 组件 由于uni-app 在非h5环境暂不支持 slot，所以该组件只是head部分，
 body部分需要在页面实现 https://uniapp.dcloud.io/use?id=vue-%e7%bb%84%e4%bb%b6
-->
<template>
	<view class="switch-bar">
    <view class="switch-item" v-for="(item, index) in barSets" :key="index" :class="{'active': item.active}" @click="changeTab(index)">
      <text>{{item.label}}</text>
      <uni-badge :text="item.badge" :type="item.badgeType" v-if="item.showBadge"></uni-badge>
    </view>
	</view>
</template>

<script>
  import uniBadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"
  import utils from '@/mixin/utils'
	export default {
    name: 'nav-bar',
    mixins: [utils],
    props: {
      barItems: {
        type: Array,
        default: [
          // {
          //   label: '项目信息',
          //   badge: 10,
          //   showBadge: true,
          //   badgeType: 'error',
          //   hideBadgeInOther: false // 切换到其他tab时 是否隐藏badge TODO
          // }
        ]
      },
      activeIndex: {
        type: Number,
        default: 0
      }
    },
    watch: {
      activeIndex (val) {
        this.switchAction(val)
      }
    },
    components: {
      uniBadge
    },
		data() {
			return {
				barSets: []
			}
		},
		onLoad() {
      
    },
    created () {
      this.setData()
      this.switchAction(this.activeIndex)
    },
		methods: {
      setData () {   
        this.barItems.forEach(item => {      
          item.active = false
          if (!item.badgeType) {
            item.badgeType = 'error'
          }
        })     
        this.barSets = this.deepCopy(this.barItems)
      },
	    changeTab (index) {
        this.$emit('change', index)
        this.$emit('update:activeIndex', index)
      },
      switchAction (index) {
        this.barSets.forEach((item, idx) => {
          item.active = false
          if (idx == index) {
            item.active = true
          }
        })
      }
     }
	}
</script>

<style scoped lang="scss">
  .switch-bar{
    display: flex;
    flex-direction: row;
    height: 34px;
    line-height: 34px;
    .switch-item{
      text-align: center;
      flex: 1;
      font-size: 15px;
      position: relative;
      &.active{
        &::after{
          content: '';
          display: block;
          width: 70px;
          height: 2px;
          background-color: #1aad19;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%)
        }
      }
      .uni-badge{
        position: absolute;
        top: 0px;
        right: 15px;
      }
    }
  }
</style>
