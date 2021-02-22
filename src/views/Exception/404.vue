<!--
 * @Title: 404 页面
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div class="wscn_box">
    <div class="wscn_http404">
      <div class="pic_404">
        <img class="pic_404_parent" src="@/images/base/404.png" alt="404" />
        <img class="pic_404_child left" src="@/images/base/404Cloud.png" alt="404" />
        <img class="pic_404_child mid" src="@/images/base/404Cloud.png" alt="404" />
        <img class="pic_404_child right" src="@/images/base/404Cloud.png" alt="404" />
      </div>
      <div class="bullshit">
        <div class="bullshit_oops">Not Found!</div>
        <div class="bullshit_headline">你没有这个页面的权限</div>
        <div class="bullshit_headline" style="padding-left: 60px;">OR</div>
        <div class="bullshit_headline">这个页面不存在的</div>
        <div class="bullshit_info">请检查您输入的网址是否正确，请点击以下按钮返回主页</div>
        <a href="/" class="bullshit_return_home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wscn_box {
  background: #f0f2f5;
  margin-top: -20px;
  height: 100%;
  .wscn_http404 {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    margin: 20px auto 60px;
    padding: 0 100px;
    overflow: hidden;
    .pic_404 {
      position: relative;
      float: left;
      width: 600px;
      padding: 150px 0;
      overflow: hidden;
      &_parent { width: 100%; }
      &_child {
        position: absolute;
        &.left {
          width: 80px;
          top: 17px;
          left: 220px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 4s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
          animation-iteration-count: infinite;
        }
        &.mid {
          width: 46px;
          top: 10px;
          left: 420px;
          opacity: 0;
          animation-name: cloudMid;
          animation-duration: 4s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1.2s;
          animation-iteration-count: infinite;
        }
        &.right {
          width: 62px;
          top: 100px;
          left: 500px;
          opacity: 0;
          animation-name: cloudRight;
          animation-duration: 4s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
          animation-iteration-count: infinite;
        }
        @keyframes cloudLeft {
          0% { top: 17px; left: 220px; opacity: 0; }
          20% { top: 33px; left: 188px; opacity: 1; }
          80% { top: 81px; left: 92px; opacity: 1; }
          100% { top: 97px; left: 60px; opacity: 0; }
        }
        @keyframes cloudMid {
          0% { top: 10px; left: 420px; opacity: 0; }
          20% { top: 40px; left: 360px; opacity: 1; }
          70% { top: 130px; left: 180px; opacity: 1; }
          100% { top: 160px; left: 120px; opacity: 0; }
        }
        @keyframes cloudRight {
          0% { top: 100px; left: 500px; opacity: 0; }
          20% { top: 120px; left: 460px; opacity: 1; }
          80% { top: 180px; left: 340px; opacity: 1; }
          100% { top: 200px; left: 300px; opacity: 0; }
        }
      }
    }
    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 150px 0;
      overflow: hidden;
      &_oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &_headline {
        font-size: 20px;
        line-height: 24px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &_info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &_return_home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% { transform: translateY(60px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
    }
  }
}
</style>
