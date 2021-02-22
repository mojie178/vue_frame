<!--
 * @Title: 登录注册展示入口
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div class="logo_box">
    <!-- 登录 -->
    <div class="wrapper" v-if="value">
      <a href="#" class="logo_left">
        <img src="@/images/base/hytLogo.png">欢迎登录
      </a>
      <!-- <span>
        还没有账号?&nbsp;
        <router-link to="">立即注册</router-link>
      </span> -->
    </div>
    <!-- 注册 -->
    <div class="wrapper" v-else>
      <a href="#" class="logo_left">
        <img src="@/images/base/hytLogo.png">找回密码
      </a>
      <span>
        已有账号?&nbsp;
        <router-link to="/">立即登录</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default  {
  name: 'loginSwitch',
  props: {
    value: { // 显示隐藏
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.logo_box{
  background:#fff;
  .wrapper {
    margin: 0 auto; 
    height: 73px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo_left{    
      font-size: 130%;
      color: #333;
      img{
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}

@media (min-width: 1200px) {
  .wrapper { width: 1080px; }
}
</style>

