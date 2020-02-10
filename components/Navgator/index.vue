<!--
 @author:
 @date:
 @description: 自定义导航栏 h5端无法取消导航栏左侧的返回按钮 需要使用自定义导航栏 
 https://uniapp.dcloud.io/collocation/pages?id=h5
-->
<template>
	<view class="nav-items" :style="navStyle">
    <view class="title"> 
      <text>{{title}}</text>
    </view>
    <view v-for="(item, index) in buttons" :key="index" class="nav-item" :class="item.float">
        <icon :type="item.icon" :size="item.size" v-if="item.icon"/>
        <text>{{item.label}}</text>
    </view>

	</view>
</template>

<script>
  import uniBadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"
  import utils from '@/mixin/utils'
	export default {
    name: 'navgator',
    mixins: [utils],
    props: {
      buttons: {
        type: Array,
        default: [
         
        ]
      },
      title: {
        type: String,
        default: ''
      },
      navStyle: {
        type: String
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
      
    },
		methods: {
  
    }
	}
</script>

<style scoped lang="scss">
  .nav-items{
    padding-top: var(--status-bar-height); // 状态栏的高度
    height: 44px;
    width: 100%;
  }
</style>
