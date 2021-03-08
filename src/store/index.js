/*
 * @Title: state
 * @Descripttion: 
 * @Author: shaojihao
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

Vue.use(Vuex);

const state = {
  token: '', // token
  cookieVal: '', // Cookie
  pageWidth: '', // 当前页面宽度，实时刷新
  userInfo: '', // 当前用户信息
  tabNav: [], // 头部动态标签导航
  url: '', // 当前链接
  nodes: [], // 元素展示权限
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    key: 'vuex',
    reducer(state) {
      return {
        token: state.token,
        url: state.url,
        cookieVal: state.cookieVal,
        userInfo: state.userInfo,
        nodes: state.nodes
      };
    }
  })]
});
