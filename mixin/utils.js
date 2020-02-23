export default {
	data: function () {  
		return {
			backgroundColor: 'rgb(26, 173, 25)'
		}
	},
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
		},
		/**
		 * 判断是否是数组
		 * @param {} param 
		 */
		isArray (param) {
			if (!Array.isArray) {
				Array.isArray = function(arg) {
					return Object.prototype.toString.call(arg) === '[object Array]';
				};
			}
			return Array.isArray(param)
		},
		/**
		 * 判断元素是否包含在数组中
		 * @param {*} array 
		 * @param {*} item 
		 */
		inArray (array, item) {
			return array.indexOf(item) > -1
		}
	}
}