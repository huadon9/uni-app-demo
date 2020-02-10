<template>
	<view class="content">
		<!-- #ifndef MP-WEIXIN -->
		<uni-nav-bar 
			left-icon="back" 
			left-text="返回登录" 
			right-text="修改密码" 
			:title="title" 
			color='#fff'
			:fixed="true"
			:status-bar="true"
			@clickLeft="navClick('left')"
			@clickRight="navClick('right')"
			:background-color="backgroundColor">
		</uni-nav-bar>
		<!-- #endif -->
		<!-- 微信小程序导航栏右边的键被小程序组件挡住了 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar 
			left-icon="back" 
			left-text="返回登录" 
			right-text=" " 
			:title="title" 
			color='#fff'
			:fixed="true"
			:status-bar="true"
			@clickLeft="navClick('left')"
			@clickRight="navClick('right')"
			:background-color="backgroundColor">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="menu-items">
			<view class="item" v-for="(item, index) in menu" :key="index" @click="menuClick(item)">
				<!-- 小程序不支持 `` 语法 -->
				<view class="icon" :style="'background-color: ' + item.backgroundColor">
					<uni-icon :class="'iconfont ' + item.icon"></uni-icon>
				</view>
				<view>
					<text class="menu-item-label">{{item.label}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {Api} from '../../utils/Api.js'
	import utils from '@/mixin/utils'
	import uniNavBar from "@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		mixins: [utils],
		data() {
			return {
				title: 'uni-app demo',
				token: '',
				menu: [
					{
						label: '客户管理',
						icon: 'icon-chaxunliebiao',
						backgroundColor: '#8bb38d',
						url: '/pages/clientManage/clientList',
						jumpType: 'uni-app'
					},
					{
						label: '提成比例',
						icon: 'icon-jinduguanli',
						backgroundColor: '#00B9F8',
						url: '/pages/webview/index',
						src: 'http://ms.geto.pro/sell/mcommission/main_list?tabIndex=0',
						jumpType: 'web'
					},
				]
			}
		},
		onLoad() {
			let user_info = JSON.parse(uni.getStorageSync('user_info'))
			this.title = user_info.name || ''
			this.token = user_info.token || ''
		},
		
		methods: {
			navClick (type) {
				if (type === 'left') {
					this.backToLogin()
				}
			},
			backToLogin () {
				uni.showModal({
					title: '提示',
					content: '您确定要返回到登录页面吗？',
					showCancel: true,
					success: function (res) {
							if (res.confirm) {
								uni.navigateBack()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
					}
				})				
			},
			menuClick (item) {
				if (item.jumpType === 'uni-app') {
					uni.navigateTo({
            url: item.url
          });
				} else {
					uni.navigateTo({
            url: `${item.url}?src=${item.src}&token=${this.token}` 
          });
				}
			}
		},
		onBackPress (event) { 
		  if (event.from === 'backbutton') { // 点击物理返回键
				this.backToLogin()
				return true // 表示不执行返回动作
			} 
			return false			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	/deep/.uni-navbar__header-btns-left{
		width: 85px !important;
	}

	.menu-items{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.item{
			width: 33.33%;
			padding: 15px 0;
			text-align: center;
			border-bottom: 1px solid #d9d9d9;
			border-right: 1px solid #d9d9d9;
			&:nth-child(3n){
				border-right: none;
			}
			.icon{
				display: inline-block;
				width: 4rem;
				height: 4rem;
				text-align: center;
				line-height: 4rem;
				color: #fff;				
				border-radius: 50%;
				.iconfont{
					font-size: 34px;
				}
			}
			.menu-item-label{
				font-size: 14px;
			}
		}
	}

</style>
