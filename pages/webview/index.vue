<template>
	<view>
        <web-view :webview-styles="webviewStyles" src="http://ms.geto.pro/main/"></web-view>
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
				}
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
