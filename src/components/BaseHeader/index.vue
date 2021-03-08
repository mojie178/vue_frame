<!--
 * @Title: 平台头部
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div class="toper">
    <div class="container">
      <div class="header_wrapper">
        <div class="header_left">
          <a href="https://www.ahggwl.com" target="_blank">慧联运首页</a>
        </div>
        <div class="header_right">
          <!-- 登录注册路由 -->
          <a href="#" @click="toggleShow = !toggleShow">
            <img src="@/images/base/mobile.png" class="mobile_img">慧联运APP
          </a>
          <div class="dropdown_menu" v-show="toggleShow">
            <img src="@/images/base/3wmWap.png" />
            <a href="http://dlhly.ahggwl.com/hytpay/hyt.apk" target="_blank">点击直接下载</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'baseHeader',
  data() {
    return {
      toggleShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.toper {
  width: 100%;
  background-color: #252525;
  color: #fff !important;
  border-bottom: 1px solid #eee;
  height: 34px;
  line-height: 34px;
  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin: 0 auto;
    height: 100%;
    .header_wrapper{
      display: flex;
      justify-content: space-between;
      a { color:#fff; margin:0 10px; }
      .header_right{
        position: relative;
        .mobile_img{
          vertical-align: middle;
          margin-right: 5px;
        }
        .dropdown_menu {
          position: absolute;
          z-index: 1000;
          min-width: 160px;
          margin: 2px 0 0;
          font-size: 14px;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid rgba(0,0,0,.15);
          border-radius: 4px;
          box-shadow: 0 6px 12px rgba(0,0,0,.175);
          right: -19%;
          text-align: center;
          overflow: hidden;
          img {
            width: 140px;
            height: 140px;
            margin-top: 6px;
            display: block;
            margin-left: 9px;
          }
          a {
            display: block;
            padding: 3px 20px;
            clear: both;
            font-weight: 400;
            line-height: 1.42857143;
            color: #333;
            white-space: nowrap;
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .container { width: 1080px; }
}
</style>