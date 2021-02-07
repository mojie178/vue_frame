/*
 * @Title: 路由入口
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-02-05 10:28:51
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import * as types from '@/store/mutation-types';
import { PROCESS_ENV_NODE_ENV } from '../util/const.js';
import store from '../store';
Vue.use(VueRouter);

const routers = [{
  name: 'login',
  path: '/',
  component: () => PROCESS_ENV_NODE_ENV
    ? import( /* webpackChunkName: "login" */ '../views/Login/pro.vue')
    : import( /* webpackChunkName: "login" */ '../views/Login/dev.vue')
}, {
  name: '404',
  path: '/404',
  component: () => import( /* webpackChunkName: "error404" */ '../views/Exception/404.vue')
}, {
  name: 'index',
  path: '/admin',
  component: () => import(/* webpackChunkName: "index" */ '@/views/Index/index.vue'),
  redirect: '/admin/about/guide',
  children: store.getters.asideMenu
}]

const router = new VueRouter({
  mode: 'hash',
  routes: routers,
  base: '',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

// 全局守卫钩子 本地路由跳转不做限制
router.beforeEach((to, from, next) => {
  if (PROCESS_ENV_NODE_ENV) {
    let newCookieVal = Cookies.get('SHAREJSESSIONID');
    let cookieVal = store.state.cookieVal;
    if (['/', '/404'].includes(to.fullPath)) next();
    else if (!store.getters.asideMenu || (newCookieVal && newCookieVal != cookieVal)) {
      let url = window.location.href;
      store.commit(types.SET_URL, encodeURIComponent(url));
      if (url.indexOf('code=') != -1) url = url.substr(0, url.indexOf('#/') - 12);
      else url = url.substr(0, url.indexOf('#/'));
      window.location.href = url;
      next();
    } else next();
  } else next();
});

export default router;