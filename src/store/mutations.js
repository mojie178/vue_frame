/*
 * @Title: mutations
 * @Descripttion: 
 * @Author: shaojihao
 */

import * as types from './mutation-types';

export default {
  [types.LOGIN]: (state, token) => { // 添加token
    state.token = token;
  },
  [types.LOGOUT]: state => { // 清除token
    state.token = '';
    state.userInfo = '';
    state.url = '';
  },
  [types.PAGE_WIDTH]: (state, payload) => { // 页面宽度
    state.pageWidth = payload;
  },
  [types.USER_INFO]: (state, payload) => { // 添加用户信息
    state.userInfo = payload;
  },
  [types.COOKIE_VAL]: (state, val) => { // 添加 cookie
    state.cookieVal = val;
  },
  [types.SET_URL]: (state, url) => { // 设置当前路由
    state.url = url;
  },
  [types.SET_NODE]: (state, nodes) => { // 获取元素展示权限
    state.nodes = nodes;
  },
  [types.ADD_NVA]: (state, route) => { // 添加头部面包屑
    state.tabNav.forEach((item, i) => {
      if (item.meta.id === route.meta.id)
        state.tabNav.splice(i, 1);
    })
    state.tabNav.push(route);
    state.tabNav = state.tabNav.slice(-8);
  },
  [types.DEL_NVA]: (state, id) => { // 删除头部面包屑
    state.tabNav.forEach((item, i) => {
      if (item.meta.id === id)
        state.tabNav.splice(i, 1);
    });
  }
};
