/*
 * @Title: 全局指令
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-01-21 17:28:05
 */

import store from '@/store';

// 根据btns判断按钮是否显示
export const directivePermission = {
  inserted(el, binding) {
    let hasPermission = null;
    if (Array.isArray(binding.value)) hasPermission = store.getters.btns.some(item => binding.value.includes(item));
    else hasPermission = store.getters.btns.includes(binding.value);
    el.style.display = hasPermission ? 'inline-block' : 'none';
  }
};