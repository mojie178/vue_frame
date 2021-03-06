/*
 * @Title: 全局指令
 * @Descripttion: 
 * @Author: shaojihao
 */

import _lodash from 'lodash';
import { portLogInfo } from '@/api/index.js';

// 元素点击埋点 v-logc
export const logc = {
  bind: function(el, binding) {
    el.addEventListener('click', _lodash.debounce(() => {
      // 生产环境提交埋点数据
      if (process.env.NODE_ENV === 'production') portLogInfo(JSON.stringify(binding.value));
    }, 500));
  }
};

// 元素显示埋点 v-logs
export const logs = {
  inserted: function(el, binding) {
    if (process.env.NODE_ENV === 'production') portLogInfo(JSON.stringify(binding.value));
  }
};