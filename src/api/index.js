/*
 * @Title: 公共类接口
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-02-05 14:31:42
 */

import { jsonAxios } from '@/util/http';

// 单点登录
export const spLogin = (params = {}) => jsonAxios.get('/login', { params: { ...params, java: 'baseUrl' }}); 
// 业务退出
export const spLogOut = (params = {}) => jsonAxios.get('/logout', { params: { ...params, java: 'baseUrl' }}); 
// 单点登录退出
export const spLogOutSys = (params = {}) => jsonAxios.get('/logout', { params: { ...params, java: 'logout' }});
// 获取字典明细表
export const findDictentryByDicttypeName = (params = {}) => jsonAxios.get('/dictentry/findDictentryByDicttypeName', { params: { ...params, java: 'authorityApi' }});
