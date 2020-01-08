<!--
 @author:
 @date:
 @description: 加载标志 组件
-->
<template>
  <view>
    <view class="load-sign" v-show="loadAll">
      <text>已全部加载</text>
    </view>
  </view>	
</template>

<script>
	export default {
    name: 'load-sign',
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      loadAll: {
        type: Boolean,
        default: false
      }
    },	
    created () {
  
    }
	}
</script>

<style scoped lang="scss">
  .load-sign{
    text-align: center;
    font-size: 15px;
    color: #fff;
    background-color: transparent;
    color: #666;
    line-height: 38px;
  }
</style>
