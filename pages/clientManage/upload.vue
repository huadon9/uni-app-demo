<template>
	<view>
			<web-view :webview-styles="webviewStyles" :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				src: ''
			}
		},
		onLoad(options) {
			let src = 'http://192.168.1.183:8080/upload.html'
			let token = options.token
			this.src = src 
		},
		methods: {

		}
	}
</script>

<style>

</style>
