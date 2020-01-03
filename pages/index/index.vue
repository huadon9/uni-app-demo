<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<navigator url="../login/index" hover-class="navigator-hover">
			<button type="default">跳转到uni-app页面</button>
		</navigator>
		<navigator url="../webview/index" hover-class="navigator-hover">
			<button type="default">跳转到web-view页面</button>
		</navigator>
		<!-- <button type="default" @click="patchTest">Patch 请求测试</button> -->
		<button type="default" @click="deleteTest">Delete 请求测试</button>
	</view>
</template>

<script>
	import {Api} from '../../utils/Api.js'
	export default {
		data() {
			return {
				title: 'uni-app demo'
			}
		},
		onLoad() {

		},
		methods: {
			async patchTest () {
				let res = await Api.getInstance().getPack()
				console.log(res)
			},
			deleteTest () {
					console.log(process.env.VUE_APP_UPLOAD)
					console.log(process.env.NODE_ENV)
				// uni.request({
				// 	url: 'http://192.168.66.112:3000/del', 
				// 	method: 'DELETE',
				// 	data: {
				// 	},
				// 	success: (res) => {
				// 		console.log(res.data);
						
						
				// 	}
				// });
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
