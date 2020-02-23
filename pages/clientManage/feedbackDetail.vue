<template>
	<view>
		<!-- 更多功能，请参照sunui-upimg.vue data -->
		<!-- 如需单页面使用多次,重置一下@change返回值以及修改ref钩子名称即可-->
		<view class="sunui-title">图片上传</view>
		<sunui-upimg @change="getImageInfo" :upload_auto="true" :upimg_move="true" ref="upimg"></sunui-upimg>
		<view>
			<input type="file">123
		</view>
		<button @click="goUploadPage()">上传页面</button>
		<!-- <upload-file></upload-file> -->
		<button @click="pageComunication">跨页面通信切换详情页navbar</button>
		<!-- <view class="uni-title uni-common-pl" @click="printLog">地区选择器</view> -->
		<view class="uni-list">
				<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							时间选择
						</view>
						<view class="uni-list-cell-db">
							<gt-picker v-model="time" mode="time"></gt-picker>
						</view>
						<view class="uni-list-cell-left">
							日期选择
						</view>
						<view class="uni-list-cell-db">
							<gt-picker v-model="date" mode="date" fields="month"></gt-picker>
						</view>
						<view class="uni-list-cell-left">
							单选picker
						</view>
						<view class="uni-list-cell-db">
							<gt-picker v-model="country" mode="selector" :options="countryOptions"></gt-picker>
						</view>
						<view class="uni-list-cell-left">
							多选picker
						</view>
						<view class="uni-list-cell-db">
							<gt-picker v-model="multiSelect" mode="multiSelector" :options="multiOptions"></gt-picker>
						</view>
						<view class="uni-list-cell-left">
							级联选择
						</view>
						<view class="uni-list-cell-db">
							<gt-cascader v-model="city" :options="cityOptions"></gt-cascader>
						</view>
				</view>
		</view>
	</view>
</template>

<script>
	import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue'
	import GtPicker from '@/components/GtPicker/index'
	import GtCascader from '@/components/GtCascader/index'
	import UploadFile from '@/components/UploadFile/index'
	export default {
		components: {
			'sunui-upimg': sunUiUpimg,
			GtPicker,
			GtCascader,
			UploadFile
		},
		data() {
			return {
				auto: false,
				time: '19:12',
				date: '2020-01',
				country: 0,
				countryOptions: [{
					label: '中国',
					value: 0
				},{
					label: '美国',
					value: 1
				}
				],
				multiSelect: [0,0],
				multiOptions: [
					[
						{
							label: '中国',
							value: 0
						},
						{
							label: '美国',
							value: 1
						},
					],
					[
						{
							label: '国内',
							value: 0
						},
						{
							label: '国外',
							value: 1
						},
					]
				],
				city: [10, 12, 122],
				cityOptions: [{
					label: '广东',
					value: 10,
					children: [
						{
							label: '中山',
							value: 11,
							children: [
								{
									label: '石歧',
									value: 111,
								},
								{
									label: '三乡',
									value: 112,
								}
							]
						},
						{
							label: '广州',
							value: 12,
							children: [
								{
									label: '海珠',
									value: 121,
								},
								{
									label: '白云',
									value: 122,
								}
							]
						}
					]
				},
				{
					label: '四川',
					value: 20,
					children: [
						{
							label: '成都',
							value: 21,
							children: [
								{
									label: '武林',
									value: 211,
								},
								{
									label: '城西',
									value: 212,
								}
							]
						},
						{
							label: '南充',
							value: 22,
							children: [
								{
									label: '阆中',
									value: 221,
								},
								{
									label: '嘉陵',
									value: 222,
								}
							]
						}
					]
				}]
				// cityOptions: [
				// 	[{
				// 		label: '广东',
				// 		value: 0
				// 	},{
				// 		label: '四川',
				// 		value: 1
				// 	}
				// 	],[
				// 		{
				// 			label: '中山',
				// 			value: 0
				// 		},
				// 		{
				// 			label: '广州',
				// 			value: 1
				// 		}
				// 	]
				// ]
			}
		},
		mounted() {
			// 关于删除图标样式更改,可以去源码：13行
			// 是否显示删除图标 - upimg_move:true/false,默认true
			// 是否自动上传 - upload_auto:true/false，默认自动上传. 如需手动上传则置为false,再置为true

			// 这里是上传服务器的后端url(这里是后端签名等，然后前端直接调用->这种方式支持App/小程序/h5)
			this.$refs.upimg.url = 'upload/upload/base/file/upload_vue';
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
			},
			goUploadPage () {
				uni.navigateTo({
          url: './upload'
        });
			}
		}
	}
</script>

<style lang="scss">
 .uni-list-cell-left{
	font-size: 15px;
	color: #666;
	padding: 10px 15px;
 }
 .uni-list-cell-db{
	padding: 0 15px;
 }
</style>
