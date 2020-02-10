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
			let src = options.src
			let token = options.token
			this.src = src + '&token=' + token
		},
		methods: {

		}
	}
</script>

<style>

</style>
