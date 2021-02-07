/*
 * @Title: state
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-02-05 10:08:02
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import { PROCESS_ENV_NODE_ENV } from '../util/const.js';

Vue.use(Vuex);

const state = {
  token: '', // token
  cookieVal: '', // Cookie
  pageWidth: '', // 当前页面宽度，实时刷新
  userInfo: '', // 当前用户信息
  tabNav: [], // 头部动态标签导航
  url: '', // 当前链接
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: !PROCESS_ENV_NODE_ENV,
  plugins: [createPersistedState({
    key: 'vuex',
    reducer(state) {
      return {
        token: state.token,
        url: state.url,
        cookieVal: state.cookieVal,
        userInfo: state.userInfo
      };
    }
  })]
});
