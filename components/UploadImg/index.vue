<!--
 @author:
 @date:
 @description: 图片上传组件
-->
<template>
	<view class="nav-items">
    
    <view class="choose-btn" @click="chooseImg">
      <text>+</text>
    </view>
	</view>
</template>

<script>
  import uniBadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"
  import utils from '@/mixin/utils'
  import upload from '@/mixin/upload'
	export default {
    name: 'uploadimg',
    mixins: [utils, upload],
    props: {
     
    },
    components: {
      uniBadge
    },
		data() {
			return {
		
			}
		},
		onLoad() {
      
    },
    created () {
      
    },
		methods: {
      chooseImg
    }
	}
</script>

<style scoped lang="scss">
  .choose-btn{
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border: 1px solid #f2f2f2;
  }
</style>
