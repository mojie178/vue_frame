<!--
 * @Title: 单点登录入口
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-02-05 10:29:28
-->

<template>
  <div class="scope">
    <div class="box">
      页面正在加载中，请稍后。。。
      <div class="loaders_animation" />
    </div>
  </div>
</template>

<script >
import Cookies from 'js-cookie';
import * as TYPE from '@/store/mutation-types';
import { spLogin } from '@/api';
import { getBrowserInfo } from '@/util/const';

export default {
  created() {
    this.login();
  },
  methods: {
    /**
     * @name: 登录方法
     */    
    async login() {
      const url = window.location.href;
      let res = {};
      if (url.indexOf('code=') != -1) { // 如果 code 存在， 截取 code
        let code = url.substr(url.indexOf('code=') + 5, 6);
        res = await spLogin({ code }); // 根据 code 请求登录接口
      } else res = await spLogin(); // 若无 code 直接请求，获取跳转路径
      // 根据返回接口做对应跳转
      if (res.code === 7) window.location.href = res.data; // 7：未经单点登录，跳转公共登录界面
      else if (res.code === 20) { // 正常登录，返回登录信息
        this.$store.commit(TYPE.USER_INFO, res.data); // 存储用户信息
        this.$store.commit(TYPE.COOKIE_VAL, Cookies.get('SHAREJSESSIONID')); // 存储 Cookie 信息
        if (url.indexOf('state=') != -1) { // 如果存在原路径 state，跳转该路径
          let state = url.substr(url.indexOf('state=') + 6);
          window.location.href = decodeURIComponent(state);
        } else {
          if (this.$store.state.url) window.location.href = decodeURIComponent(this.$store.state.url);
          else  window.location.href = url + 'admin'; // 否则跳转 /admin
        }
        this.$router.addRoutes([{
          name: 'index',
          path: '/admin',
          component: () => import(/* webpackChunkName: "index" */ '@/views/Index/index.vue'),
          children: [
            ...this.$store.getters.asideMenu
          ]
        }])
        // 如果为 IE 浏览器，自动刷新以提示用户更换浏览器查看
        const browserInfo = getBrowserInfo();
        const realInfo = Array.isArray(browserInfo) ? browserInfo[0] : browserInfo;
        if (['IE/7', 'IE/8', 'IE/9', 'IE/10', 'IE/11'].includes(realInfo)) window.location.reload();
      }
    },
  }
}
</script>

<style lang="less" scoped>
.scope {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #fff;
  .box {
    box-sizing: border-box;
    border: 1px dashed currentcolor;
    border-radius: 3px;
    font-size: 30px;
    color: rgba(200, 200, 200, 0.5);
    padding: 1em;
    margin-bottom: 0.25em;
    vertical-align: top;
    -webkit-transition: 0.3s color, 0.3s border;
    transition: 0.3s color, 0.3s border;
  }
}
</style>