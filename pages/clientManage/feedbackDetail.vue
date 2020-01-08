<template>
	<view>
		<!-- 更多功能，请参照sunui-upimg.vue data -->
		<!-- 如需单页面使用多次,重置一下@change返回值以及修改ref钩子名称即可-->
		<view class="sunui-title">图片上传</view>
		<sunui-upimg @change="getImageInfo" :upload_auto="true" :upimg_move="true" ref="upimg"></sunui-upimg>
		<button @click="upfile">上传</button>
		<button @click="pageComunication">跨页面通信</button>
		<view class="uni-title uni-common-pl" @click="printLog">地区选择器</view>
		<view class="uni-list">
				<view class="uni-list-cell">
						<view class="uni-list-cell-left">
								当前选择
						</view>
						<view class="uni-list-cell-db">
								<gt-picker v-model="time" mode="time"></gt-picker>
						</view>
						<view class="uni-list-cell-db">
								<gt-picker v-model="date" mode="date" fields="month"></gt-picker>
						</view>
				</view>
		</view>
	</view>
</template>

<script>
	import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue'
	import GtPicker from '@/components/GtPicker/index'
	export default {
		data() {
			return {
				auto: false,
				time: '19:12',
				date: '2020-01'
			}
		},
		mounted() {
			// 关于删除图标样式更改,可以去源码：13行
			// 是否显示删除图标 - upimg_move:true/false,默认true
			// 是否自动上传 - upload_auto:true/false，默认自动上传. 如需手动上传则置为false,再置为true

			// 这里是上传服务器的后端url(这里是后端签名等，然后前端直接调用->这种方式支持App/小程序/h5)
			this.$refs.upimg.url = '/upload/base/file/upload_vue';
			// 上传数量控制
			this.$refs.upimg.upload_count = 4;
			// 图片以及添加宽高
			this.$refs.upload_img_wh = 162;
			// 上传容量控制,默认1M(暂时有缺陷)
			this.$refs.upload_max = 1;
			// 这里放置服务器预览图片链接地址
			this.$refs.upimg.upload_before_list = [
        // {
        //   path: 'http://a3q.dns06.net.cn/15742420068480.png'
        // }
      ];
		},
		components: {
			'sunui-upimg': sunUiUpimg,
			GtPicker
		},
		methods: {
			upfile() {
				// upload_auto为true才可上传(手动上传)
				this.$refs.upimg.upload(this.auto = true);
			},
			getImageInfo(e) {
				// 上传图片或者删除图片返回信息
				console.log('返回图片信息：', e);
			},
			pageComunication () {
				uni.$emit('update',{msg:'页面更新'})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			printLog () {
				console.log(this.time)
			}
		}
	}
</script>

<style lang="scss">

</style>
