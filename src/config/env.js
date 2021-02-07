/*
 * @Title: 基本环境配置
 * @Descripttion: 配置编译环境和线上环境之间的切换
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-02-05 10:23:09
 * 
 */

let baseURL = ''; // API 接口路径
let uploadURL = ''; // 上传地址
let upLoadMergeURL = ''; // 公共上传报错地址
let downloadURL = ''; // 文件下载地址

if (process.env.NODE_ENV === 'development') {
  baseURL = {
    baseUrl: '/xxxxxx', // 业务平台 牵涉本机代理，不需写全路径
    authorityApi: 'https://testauth.ahggwl.com/tms-authority-mng', // 字典平台
    logout: 'https://testsso.ahggwl.com', // 退出登录
  };
  uploadURL = 'https://testfile.ahggwl.com/api/chunk';
  upLoadMergeURL = 'https://testfile.ahggwl.com/api/merge/';
  downloadURL = 'https://testfile.ahggwl.com/api/download?fileId=';
} else if (process.env.NODE_ENV === 'production') {
  baseURL = {
    baseUrl: 'https://xxxxxxxxxxxxxx/xxxxxx', // 业务平台
    authorityApi: 'https://testauth.ahggwl.com/tms-authority-mng', // 字典平台
    logout: 'https://testsso.ahggwl.com', // 退出登录
  }
  uploadURL = 'https://testfile.ahggwl.com/api/chunk';
  upLoadMergeURL = 'https://testfile.ahggwl.com/api/merge/';
  downloadURL = 'https://testfile.ahggwl.com/api/download?fileId=';
}

module.exports = {
  baseURL,
  uploadURL,
  upLoadMergeURL,
  downloadURL
};
