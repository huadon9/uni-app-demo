export default {
	methods: {
		/**
		 * 深复制
		 * @param {*} val 
		 */
		deepCopy (val) {
			if (typeof val !== 'object') {
				return val
			}
			return JSON.parse(JSON.stringify(val))
		},
		/**
		 * 页面跳转
		 * @param {*} url 
		 */
		goPage (url) {
			if (!url) return
			uni.navigateTo({
				url: url
			})
		}
	}
}