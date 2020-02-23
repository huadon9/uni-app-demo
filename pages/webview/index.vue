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
			this.src = this.getWebSrc(options)
		},
		methods: {
			getWebSrc (options) {
				let src = decodeURIComponent(options.src)
				console.log(src)
				let sign = options.sign
				let token = this.getToken(sign)
				if (src.indexOf('?') > -1) {
					src = `${src}&token=${token}&unisignspec=${sign}`
				} else {
					src = `${src}?token=${token}&unisignspec=${sign}`
				}
				return src
			},
			getToken (sign) {
				let obj = JSON.parse(sign)
				return obj.token
			}
		}
	}
</script>

<style>

</style>
