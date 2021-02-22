/*
 * @Title: 通用常量数据
 * @Descripttion: 
 * @Author: shaojihao
 */

import { findDictentryByDicttypeName } from '@/api';

// 当前环境标识
export const PROCESS_ENV_NODE_ENV = process.env.NODE_ENV === 'production';

// 默认分页大小
export const DEFAULT_PAGE_SIZE = 10;

// 加载文本
export const LOADING_TEXT = '正在加载...';

// 富文本字节大小 64kb
export const RICH_TEXT_SIZE = 64 * 1024;

// 获取元素距离浏览器顶部距离
export const getOffsetTop = (obj) => {
  let tmp = obj.offsetTop;
  let node = obj.offsetParent;
  while (node != null) {
    tmp += node.offsetTop;
    node = node.offsetParent;
  }
  return tmp;
}

// 获取字典值
export const getDicList = (dicttypeName) => {
  let arr = dicttypeName.map(item => {
    return new Promise((resolve, reject) => {
      findDictentryByDicttypeName({
        dicttypeName: item
      }).then(res => {
        if (res.code === 1) {
          resolve({
            [item]: res.data
          });
        } else {
          reject(res.msg);
        }
      });
    })
  });
  return Promise.all(arr);
}

//控制元素显示
export function setDisplay(name, value) {
  if (value && value.length) {
    let display = value.filter(item => item.eleCode === name)[0] && value.filter(item => item.eleCode === name)[0].display
    if (display === 'none') {
      return false
    } else {
      return  true
    }
  } else {
    return  true
  }
}

//控制元素可用
export function setDisabled(name, value) {
  if (value && value.length) {
    let disabled = value.filter(item => item.eleCode === name)[0] && value.filter(item => item.eleCode === name)[0].disabled
    return disabled === 'false' ? true : false;
  } else { return false; }
}

// 检查浏览器版本
export function getBrowserInfo() {
  let agent = navigator.userAgent.toLowerCase();
  let regStrFF = /firefox\/[\d.]+/gi;
  let regStrChrome = /chrome\/[\d.]+/gi;
  let regStrSaf = /safari\/[\d.]+/gi;
  let isIE = agent.indexOf('compatible') > -1 && agent.indexOf('msie' > -1); // 判断是否IE<11浏览器
  let isEdge = agent.indexOf('edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  let isIE11 = agent.indexOf('trident') > -1 && agent.indexOf('rv:11.0') > -1;
  if (isIE) {
    let reIE = new RegExp('msie (\\d+\\.\\d+);');
    reIE.test(agent);
    // eslint-disable-next-line
    let fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion * 1 === 7) { return 'IE/7'; }
    else if (fIEVersion * 1 === 8) { return 'IE/8'; }
    else if (fIEVersion * 1 === 9) { return 'IE/9'; }
    else if (fIEVersion * 1 === 10) { return 'IE/10'; }
  } // isIE end
  if (isIE11) return 'IE/11';
  if (isEdge) return 'IE/edge';
  // firefox
  if (agent.indexOf('firefox') > 0) { return agent.match(regStrFF); }
  // Safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) { return agent.match(regStrSaf); }
  // Chrome
  if (agent.indexOf('chrome') > 0) { return agent.match(regStrChrome); }
}

// 联级选择器单个id回显
export function handId(arr, id) {
  let newArr = [];
  let hand = (arrCon, id) => {
    arrCon.forEach(ele => {
      if (ele.id != id) {
        ele.children && hand(ele.children, id);
      } else {
        ele.paraentId != 0 && newArr.unshift(ele.paraentId);
        hand(arr, ele.paraentId);
      }
    });
  };
  hand(arr, id);
  newArr.push(id);
  return newArr;
}

// 应对Chrome浏览器下载限制，将返回链接http更换承https
export function httpToHttps(url) {
  return /^http:\/\//.test(url) ? `https://${/(?<=http:\/\/).*/.exec(url)[0]}` : url
}