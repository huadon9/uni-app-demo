<template>
	<view class="content">
    <view class="item">
      <input type="text" v-model="username">
    </view>
    <view class="item">
      <input type="password" v-model="password">
    </view>
    <view class="item">
      <button size="mini" @click="doLogin">登录</button>
    </view>
    
	</view>
</template>

<script>
  import { ClientApi } from '../../utils/ClientApi.js'
	export default {
		data() {
			return {
        username: '',
        password: ''
			}
    },
    components: {
 
    },
		onLoad() {
   
		},
		methods: {
      async doLogin () {
        let res = await ClientApi.getInstance().Login({
          username: this.username,
          password: this.password
        })
        if (res.data.code === 200000) {
          sessionStorage.setItem("user_info", JSON.stringify(res.data.data));
          sessionStorage.setItem("media_type", '1');
          uni.navigateTo({
            url: '/pages/clientManage/clientList'
          });
        }
      }
    },
    /**
     * 导航栏的按钮 需要在页面进行监听
     */
    onNavigationBarButtonTap (e) {
      console.log(e)
      console.log('tapped')
    },
    /**
     * 上拉触底的监听 
     */
    onReachBottom () {

    }
	}
</script>

<style lang='scss'>
  .item{
    text-align: center;
    margin: 15px 0;
    input{
      border: 1px solid #3a3a3a
    }
  }
</style>
