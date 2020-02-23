<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import './static/css/iconfont.css';

	/*每个页面公共css */
	/* 统一设置页面的背景颜色 */
	page{
		background-color: #f8f8f8
	}
	
	uni-button[type=primary]{
		background-color:#1aad19;
	}

	/* 取消loading组件的黑色透明背景 only h5 */
	uni-toast .uni-toast{
		background-color: transparent
	}
</style>
