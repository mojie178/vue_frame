<!--
 * @Title: 平台脚部
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 14:48:51
 * @LastEditTime: 2021-01-21 15:43:09
-->

<template>
  <div class="footer">
    <div class="footer_wrapper">
      <div class="footer_des">
        <ul class="des_top">
          <li class="des_li">
            <h3>慧联金融</h3>
            <p>慧联运金融产品,<br />
              专注物流供应链,<br />
              提供安全、便捷的物流金融服务。</p>
          </li>
          <li class="des_li">
            <h3>会员保障</h3>
            <p>更省钱、更尊贵、更贴心,<br />
              免费提供电子对账单，<br />
              倾情打造高速货运通行品质服务。</p>
          </li>
          <li class="des_li">
            <h3>优质服务</h3>
            <p>更高效、更安全、更省心,<br />
              多渠道专属客服一对一服务，<br />
              先通行后付费解决后顾之忧。</p>
          </li>
          <li class="footer_logo">
            <img src="@/images/base/footerLogo.png" alt="" />
          </li>
        </ul>
        <div class="des_center">
          <div class="code_left">
            <h3>合作伙伴</h3>
            <a href="https://www.ahhtk.com" target="_blank">安徽交通卡服务网站</a>
          </div>
          <div class="code_right">
            <div class="code_box">
              <img src="@/images/base/2wmWx.jpg" />
              <p>移动客户端</p>
              <p>下载</p>
            </div>
            <div class="code_box">
              <img src="@/images/base/2wmWap.jpg" />
              <p>微信公众号</p>
              <p>扫码关注</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 胶部链接 -->
    <div class="footer_link">
      <a href="https://www.ahggwl.com" target="_blank">慧联运</a>|
      <router-link to="/about/aboutus">关于我们</router-link>|
      <router-link to="/about/legalstatement">法律声明</router-link>|
      <router-link to="/about/contactus">联系我们</router-link>
    </div>
    <!-- 版本号 -->
    <copyright />
  </div>
</template>

<script>
import Copyright from '@/components/Copyright/index.vue';

export default {
  name: 'footer',
  components: {
    Copyright
  }
}
</script>

<style lang="less" scoped>
.footer {
  background-color: #252525;
  color: #535353;
  .footer_wrapper{
    height: 380px;
    margin: 0 auto;
    .des_top {
      display: flex;
      justify-content: space-between;
      .des_li {
        margin: 25px 0;
        box-sizing: border-box;
        border-right: 1px solid #373535;
        width: 20%;
        h3 {
          font-size: 24px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        p { line-height: 26px; }
      }
      .footer_logo {
        padding: 40px 0 40px 20px;
        img { max-width: 100%; }
      }
    }
    .des_center {
      display: flex;
      .code_left {
        width: 68%;
        border-top: 1px solid #302f2f;
        margin-right: 84px;
        h3 {
          font-size: 24px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        a { color: #535353; }
      }
      .code_right {
        display: flex;
        justify-content: space-between;
        width: 20%;
        .code_box {
          margin-top: 10px;
          p { text-align: center; }
        }
      }
    }
  }
  .footer_link{
    border-top: 1px solid #302f2f;
    height: 42px;
    line-height: 42px;
    text-align: center;
    a { color: #535353; padding: 0 7px; }
  }
}
@media (min-width: 1200px) {
  .footer_wrapper { width: 1080px; }
}
</style>
