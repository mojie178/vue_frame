<!--
 * @Title: App.vue
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div id="app">
    <!-- router-view 组件 -->
    <router-view />
    <!-- 顶部加载进度条组件 -->
    <vue-progress-bar />
    <!-- 浏览器版本过低提示框 -->
    <el-dialog
      title="请升级您的浏览器"
      top="30vh"
      width="580px"
      custom-class="browser-dialog"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false">
      <p class="browser_icon">
        <i class="el-icon-first-aid-kit" />
      </p>
      <p class="suggest">
        尊敬的用户：我们强烈建议您升级操作系统或者浏览器获得更好的用户体验。如果您使用的双核浏览器（如：360浏览器和QQ浏览器），请切换至急速模式浏览。
      </p>
      <ul class="browsers">
        <li
          class="browser_link"
          v-for="(item, index) in browser_list"
          :key="index">
          <a :href="item.url" target="_blank">{{item.name}}</a>
        </li>
      </ul>
    </el-dialog>
    <!-- 全局返回顶部 -->
    <el-backtop />
  </div>
</template>

<script>
import { getBrowserInfo } from '@/util/const';

export default {
  name: 'app',
  data() {
    return {
      dialogVisible: false, // 弹窗显示隐藏
      browser_list: [ // 浏览器下载列表
        { url: 'https://www.google.cn/intl/zh-CN/chrome/', name: 'Chrome浏览器' },
        { url: 'https://browser.qq.com/', name: 'QQ浏览器' },
        { url: 'https://browser.360.cn/ee/', name: '360浏览器' }
      ]
    };
  },
  created() {
    // 检查浏览器版本
    const browserInfo = getBrowserInfo();
    const realInfo = Array.isArray(browserInfo) ? browserInfo[0] : browserInfo;
    if (['IE/7', 'IE/8', 'IE/9', 'IE/10'].includes(realInfo)) this.dialogVisible = true;
  }
};
</script>

<style lang="less" scoped>
.browser_icon {
  text-align: center;
  padding-bottom: 20px;
  i { font-size: 52px; }
}
.suggest {
  margin-bottom: 30px;
  font-size: 16px;
  color: #ebeef5;
  text-indent: 2em;
}
.browsers {
  text-align: center;
  font-size: 0;
  .browser_link {
    display: inline-block;
    width: 153px;
    height: 44px;
    margin: 5px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #aaa;
    box-shadow: 0 0 3px #aaa inset;
    a { display: block; height: 100%; color: #fff; }
  }
}
</style>
