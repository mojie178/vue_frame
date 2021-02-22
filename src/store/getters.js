/*
 * @Title: 处理返回路由
 * @Descripttion: 
 * @Author: shaojihao
 */

import { PROCESS_ENV_NODE_ENV } from '@/util/const.js'; 
import devRoutes from '@/mock/routes.js';

const handRoutes = (val = []) => {
  if (val) {
    val.forEach(item => {
      if (item.children && item.children.length > 0) handRoutes(item.children);
      if (item.children) {
        item.path = item.path.substring(1, item.path.length);
        item.component = { render: h => h('router-view') };
      } else {
        let com = item.component;
        item.component = () => import('@/views/' + com + '.vue');
      }
    })
  }
}

export default {
  asideMenu: state => {
    let menuList = PROCESS_ENV_NODE_ENV
      ? state.userInfo && JSON.parse(JSON.stringify(state.userInfo.authMsg.menuList))
      : devRoutes;
    handRoutes(menuList);
    return menuList;
  },
};
