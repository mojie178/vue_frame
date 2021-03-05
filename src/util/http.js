/*
 * @Title: axios 配置文件
 * @Descripttion: 
 * @Author: shaojihao
 */

import Vue from 'vue';
import qs from 'qs';
import axios from 'axios';
import * as types from '@/store/mutation-types';
import { baseURL } from '@/config/env';
import { spLogOut, spLogOutSys, spLogin } from '@/api';
import { PROCESS_ENV_NODE_ENV } from './const.js';

const ContentType = {
  json: 'application/json;charset=utf-8',
  form: 'application/x-www-form-urlencoded;charset=utf-8'
};

const StatusMap = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  405: '方法不被允许',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
};

axios.defaults.timeout = 1000000;
axios.defaults.withCredentials = true;

// Json 格式
const jsonInstance = axios.create({
  baseURL: '',
  headers: {
    isallow: !PROCESS_ENV_NODE_ENV,
    post: { 'Content-Type': ContentType.json },
    delete: { 'Content-Type': ContentType.json },
    put: { 'Content-Type': ContentType.json }
  },
});

// FormData 格式
const formInstance = axios.create({
  baseURL: '',
  headers: {
    isallow: !PROCESS_ENV_NODE_ENV,
    post: { 'Content-Type': ContentType.form },
    delete: { 'Content-Type': ContentType.form },
    put: { 'Content-Type': ContentType.form }
  }
});

// 文件上传
const uploadInstance = axios.create({
  baseURL: '',
  headers: {
    isallow: !PROCESS_ENV_NODE_ENV,
    post: { 'Content-Type': ContentType.form },
    delete: { 'Content-Type': ContentType.form },
    put: { 'Content-Type': ContentType.form }
  }
});

// 请求拦截器
[jsonInstance, formInstance, uploadInstance].forEach((instance, index) => {
  instance.interceptors.request.use(
    config => {
      let javaType = config[0] || config.params.java;
      config.baseURL = baseURL[javaType];
      if (config.method === 'get') { // IE浏览器get请求会有缓存 响应码为302
        const time = new Date().getTime();
        config.url += config.url.includes('?') ? `&t=${time}` : `?t=${time}`;
      }
      if (index === 1) config.data = qs.stringify(config.data, { allowDots: true });
      return config;
    },
    error => { return Promise.reject(error); }
  );
});

// 响应拦截器
[jsonInstance, formInstance, uploadInstance].forEach(instance => {
  instance.interceptors.response.use(
    response => {
      if (response.data.code === 7) window.location.href = response.data.data; // 接口请求返回为 7，跳转登录界面
      else if (response.data.code === 400) { // 提示用户没有权限
        Vue.prototype.$alert('该用户没有此权限！', '提示', {
          type: 'warning',
          showClose: false,
          confirmButtonText: '确定',
          callback: () => {}
        });
        return;
      } else if (response.data.code === 20) { // 登录成功
        if (response.data.data.authMsg.menuList == null) { // 判断用户有无页面查看权限
          Vue.prototype.$alert('该用户没有此权限！', '提示', {
            type: 'warning',
            showClose: false,
            confirmButtonText: '确定',
            callback: () => {
              // 退出登录
              spLogOut().then(() => {
                spLogOutSys().then(() => {
                  this.$store.commit(types.LOGOUT);
                  spLogin();
                })
              });
            }
          });
          return;
        } else { return response.data; } // 返回信息
      } else { return response.data; } // 返回信息
    }, err => {
      if (err.message.includes('Network Error')) { // 网络错误
        Vue.prototype.$notify.closeAll();
        Vue.prototype.$notify({
          title: '网络错误',
          message: `请稍后重试或者联系管理员！<br />${err.message}`,
          dangerouslyUseHTMLString: true,
          type: 'error'
        });
        return Promise.reject(err.response);
      }
      if (err.message.includes('timeout')) { // 请求超时
        Vue.prototype.$notify.closeAll();
        Vue.prototype.$notify({
          title: '请求超时',
          message: `请稍后重试或者联系管理员！<br />${err.message}`,
          dangerouslyUseHTMLString: true,
          type: 'error'
        });
        return Promise.reject(err.response);
      }
      if (err && err.response) { // 返回状态码非 200 的错误处理
        const errUrl = err.response.config.url.replace(err.response.config.baseURL, '');
        err.message = `Msg：${StatusMap[err.response.status * 1]}<br />
          <p class="ellipsis">URL：${err.response.config.baseURL}</p>
          <p class="ellipsis">Path：${errUrl}</p>`;
        Vue.prototype.$notify.closeAll();
        Vue.prototype.$notify({
          title: `接口出错 ${err.response.status}`,
          message: err.message,
          dangerouslyUseHTMLString: true,
          type: 'error'
        });
      }
      return Promise.reject(err.response);
    }
  );
});

export const jsonAxios = jsonInstance;
export const formAxios = formInstance;
export const uploadAxios = uploadInstance;