<template>
	<view>
		<view class="list">
			<view class="list-l">
				<text>选择项目</text>
			</view>
			<view class="list-r">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		<view class="list">
			<view class="list-l">
				<text>上传图片</text>
			</view>
		</view>
		<view class="images-content">
			<view class="add-image" v-for="(item, index) in images_list" :key="index">
				<image mode="aspectFit" style="width: 70px; height: 70px;" :src="item" @click="viewImage(item)"></image>
			</view>
			<view class="add-image" @click="chooseImage" >
				<text class="add-image-label">＋</text>
			</view>
		</view>
		<view class="add-new" @click="submit()">
			<text class="add-new-label">提交</text>
		</view>

		<view class="image-view-content" :animation="animationData" v-show="show_view" @click="show_view = false">
			<image style="width: 100%;" mode="widthFix" :src="view_image_src"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images_list: [],
				animationData: {},
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				view_image_src: '',
				show_view: false
			};
		},
		onShow () {
			console.log('show page 2')
		},
		methods: {
			viewImage(src) {
				this.view_image_src = src
				this.show_view = true
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})

				this.animation = animation

				animation.opacity(1).step()

				this.animationData = animation.export()

				// setTimeout(function() {
				// 	animation.translate(30).step()
				// 	this.animationData = animation.export()
				// }.bind(this), 1000)
			},
			chooseImage() {
				var self = this
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						self.images_list = res.tempFilePaths
					}
				});
			},
			submit() {
				uni.uploadFile({
					url: 'http://192.168.66.122:3000/upload', //仅为示例，非真实的接口地址
					filePath: this.images_list[0],
					name: 'sampleFile',
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						uni.showToast({
						    title: '上传成功',
						    duration: 1000
						});
						console.log(JSON.stringify(uploadFileRes));
					}
				});
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		},
		mounted() {


		}
	}
</script>

<style lang="scss">
	.image-view-content {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 99;
		background-color: #000;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
	}

	.image-el {
		width: 70px;
		height: 70px;
	}

	.add-new {
		width: 100%;
		height: 50px;
		background-color: #1aad19;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add-new:active {
		background-color: #1aad10;
	}

	.add-new-label {
		color: #fff;
	}

	.images-content {
		padding: 0 15px;
		display: flex;
		flex-direction: row;
	}

	.add-image {
		width: 70px;
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: ceter;
		border-width: 1px;
		border-color: #d2d2d2;
		border-style: solid;
		border-radius: 12rpx;
		margin: 0 0 10px 10px;
	}

	.add-image-label {
		font-size: 36px;
		color: #000;
		line-height: 63px;
		text-align: center;
	}

	.list {
		display: flex;
		flex-direction: row;
		padding: 15px;
	}

	.list-l {
		width: 100px;
		justify-content: center;
		align-items: center;
	}

	.list-r {
		flex: 1;
		justify-content: center;
		align-items: ceter;
	}
</style>
