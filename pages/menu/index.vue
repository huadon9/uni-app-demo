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
			<template v-for="(item, index) in menu" >
				<view class="item"  v-if="item.show" @click="menuClick(item)" :key="index">
					<!-- 小程序不支持 `` 语法 -->
					<view class="icon" :style="'background-color: ' + item.backgroundColor">
						<uni-icon :class="'iconfont ' + item.icon"></uni-icon>
					</view>
					<view>
						<text class="menu-item-label">{{item.label}}</text>
					</view>
					<uni-badge :text="item.badge" :type="item.badgeType" v-if="item.badge != undefined" class="badge"></uni-badge>
				</view>
			</template>			
		</view>
		
	</view>
</template>

<script>
	import utils from '@/mixin/utils'
	import uniNavBar from "@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue"
	import uniBadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"
	export default {
		components: {
			uniNavBar,
			uniBadge
		},
		mixins: [utils],
		data() {
			return {
				title: '', // 页面navbar标题
				token: '', // 登录成功后的token
				resource: [],
				user_info_copy: '', // 移除resource属性后的user_info
				host: '', // 旧页面的host
				menu: [
					// {
					// 	label: '客户管理',
					// 	icon: 'icon-chaxunliebiao',
					// 	backgroundColor: '#8bb38d',
					// 	url: '/pages/clientManage/clientList',
					// 	jumpType: 'uni-app'
					// },
					{
						label: '开始备案',
						icon: 'icon-tianjiaadd140',
						backgroundColor: '#44C8A7',
						url: '/pages/webview/index',
						src: '/main/add_record_info.html',
						permissionSrc: 'sell/record/save_add', // 某些页面的权限判断并不是判断其跳转的url
						show: false,
						badgeType: 'error', // 表示红色
						jumpType: 'web'
					},
					{
						label: '发货前进度管理',
						icon: 'icon-jinduguanli',
						backgroundColor: '#00B9F8',
						url: '/pages/webview/index',
						src: '/sell/mprogress/plan_list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '发货更新进度',
						icon: 'icon-jinduguanli',
						backgroundColor: '#ff8300',
						url: '/pages/webview/index',
						src: '/sell/mprogress/plan_all_list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '发货后进度管理',
						icon: 'icon-jinduguanli',
						backgroundColor: '#7272D0',
						url: '/pages/webview/index',
						src: '/sell/mprogress/complete_list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '楼层增减管理',
						icon: 'icon-tianjialouceng-jiaofei',
						backgroundColor: '#c58b6b',
						url: '/pages/webview/index',
						src: '/sell/mprogress/contract_list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '分配项目',
						icon: 'icon-fenpeixiangmu',
						backgroundColor: '#79e7f2',
						url: '/pages/webview/index',
						src: '/sell/mprogress/distribution_list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '备案查询',
						icon: 'icon-chaxun',
						backgroundColor: '#11C5D1',
						url: '/pages/webview/index',
						src: '/main/ba_list.html',
						permissionSrc: 'sell/record/list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '生产通知单',
						icon: 'icon-tianjiaadd140',
						backgroundColor: '#44c8a7',
						url: '/pages/webview/index',
						src: '/product/m/notice/project/page',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '生产进度管理',
						icon: 'icon-tianjiaadd140',
						backgroundColor: '#00B9F8',
						url: '/pages/webview/index',
						src: '/workshop/progress/unit_list_page',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '签证管理',
						icon: 'icon-tianjiaadd140',
						backgroundColor: '#28f7c2',
						url: '/pages/webview/index',
						src: '/certificate/certificate/project_list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '审核模块',
						icon: 'icon-chaxunliebiao',
						backgroundColor: '#21cef7',
						url: '/pages/webview/index',
						src: '/product/m/notice/audit/module',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '客户管理',
						icon: 'icon-chaxunliebiao',
						backgroundColor: '#8bb38d',
						url: '/pages/webview/index',
						src: '/basic/mclient/listPage',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '开发商管理',
						icon: 'icon-chaxunliebiao',
						backgroundColor: '#6ea637',
						url: '/pages/webview/index',
						src: '/basic/mdeveloper/listPage',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '报价系统',
						icon: 'icon-tianjiaadd142',
						backgroundColor: '#ecce2e',
						url: '/pages/webview/index',
						src: '/sell/calculator/index',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '楼栋补充',
						icon: 'icon-tianjiaadd140',
						backgroundColor: '#2ecc71',
						url: '/pages/webview/index',
						src: '/sell/m_record/record_list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '项目跟进',
						icon: 'icon-tianjiaadd140',
						backgroundColor: '#00B9F8',
						url: '/pages/webview/index',
						src: '/sell/mfollow/main_list',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '提成比例',
						icon: 'icon-jinduguanli',
						backgroundColor: '#00B9F8',
						url: '/pages/webview/index',
						src: '/sell/mcommission/main_list?tabIndex=0',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '发货申请',
						icon: 'icon-tianjiaadd140',
						backgroundColor: '#44c8a7',
						url: '/pages/webview/index',
						src: '/ship/ship/ship_building_unit_page',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
					{
						label: '工程管理',
						icon: 'icon-jinduguanli',
						backgroundColor: '#44C8A7',
						url: '/pages/webview/index',
						src: '/engineering/page',
						show: false,
						badgeType: 'error', 
						jumpType: 'web'
					},
				]
			}
		},
		onLoad() {
			this.handleUserInfo()
			this.getShownMenu()
		},		
		methods: {
			handleUserInfo () {
				let user_info = JSON.parse(uni.getStorageSync('user_info'))
				let user_info_copy = this.deepCopy(user_info)
				delete user_info_copy.resource // 减少传递的长度				
				this.title = user_info.name || ''
				this.token = user_info.token
				this.resource = user_info.resource
				user_info_copy.resource = this.getWebInnerResource()
				this.user_info_copy = JSON.stringify(user_info_copy)
			},
			getWebInnerResource () {
				let include_resource = [ // ms里某些页面需要的权限resource
					'basic/mclient/edit',
					'basic/mclient/open',
					'basic/client/add',
					'basic/client/edit',
					'engineering/apply/m/list',
					'engineering/allot/m/list',
					'engineering/daily/m/project_list',
					'engineering/attendance/m/project_list',
					'engineering/problem/m/project',
					'product/m/notice/audit/page',
					'ship/ship_audit/ship_application_audit_list',
					'sell/area/add_view',
					'sell/mprogress/complete'
				]
				let resource = []
				include_resource.forEach( item => {
					if (this.inArray(this.resource, item)) {
						resource.push(item)
					}
				})
				return resource
			},
			getShownMenu () {
				this.host = 'http://ms.geto.pro'
				this.menu.forEach( (item, index) => {
					let p = ''
					if (item.permissionSrc) {
						p = item.permissionSrc
					} else {
						p = item.src
					}
					p = p.split('?')[0]
					if (p.charAt(0) === '/') {
						p = p.slice(1)
					}
					item.show = this.inArray(this.resource, p)
					item.src = this.host + item.src
				})
			},
			navClick (type) {
				if (type === 'left') {
					this.backToLogin()
				} else {
					this.host = 'http://ms.geto.pro'
					uni.navigateTo({
            url: `/pages/webview/index?src=${encodeURIComponent(this.host + '/main/changePassword.html')}&sign=${encodeURI(this.user_info_copy)}` 
          });
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
            url: `${item.url}?src=${encodeURIComponent(item.src)}&sign=${encodeURI(this.user_info_copy)}` 
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
			box-sizing: border-box;
			position: relative;
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
			.badge{
				position: absolute;
				top: 3px;
				right: 3px;
			}
		}
	}

</style>
