<template>
	<view class="content">
    <view class="logo">
      <image class="li-image" src="/static/images/logo-whiteFont.png" style="width: 187.5px;height:48px;" mode="widthFix"></image>
    </view>
    <view class="item">
      <text class="label">账号:</text><input type="text" v-model="username" class="input" placeholder="请输入账号用户名">
    </view>
    <view class="item">
      <text class="label">密码:</text><input type="password" v-model="password" class="input" placeholder="请输入密码">
    </view>
    <view class="login">
      <button size="mini" @click="doLogin" type="primary" class="full-width-btn"><text>登录</text></button>
    </view>
    
	</view>
</template>

<script>
  import { ClientApi } from '@/utils/ClientApi.js'
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
        uni.showLoading()
        let res = await ClientApi.getInstance().Login({
          username: this.username,
          password: this.password
        })
        uni.hideLoading()
        if (res.data.code === 200000) {
          uni.setStorage({ // 异步存储方式
            key: "user_info", 
            data: JSON.stringify(res.data.data)
          });
          uni.setStorage({
            key: "media_type", 
            data: '2'
          });
          uni.navigateTo({
            url: '/pages/menu/index'
          });
        } else {
          uni.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
          })
        }
      }
    }
	}
</script>

<style lang='scss'>
  .logo{
    padding: 100px 0 80px 0; 
    text-align: center;
  }
  .item{
    padding: 10px 15px;
    display: flex;
    flex-direction: row;
    position: relative;
    &::after{
      content: '';
      height: 1px;
      background-color: #f2f2f2;
      position: absolute;
      bottom: 0;
      left: 15px;
      right: 15px;
    }
    .label{
      width: 105px;
      font-size: 16px;
      color: black;
    }
    input{
      border: none;
    }
  }
  .login{
    text-align: center;
    margin-top: 15px;
    padding: 0 15px;
  }
  .full-width-btn{
    width: 100%;
    height: 40px;
    line-height: 40px !important;
  }
</style>
