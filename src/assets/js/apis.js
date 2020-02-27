import axios from './http'

// 1 正常，2 禁用，10 删除

/* 公共类 */
export const resourceGetMenus = (params = {}) => axios.get('/resource/getMenus', params) // 获取主导航栏
export const resourceGetTreeAllResource = (params = {}) => axios.get('/resource/getTreeAllResource', params) // 获取网站目录
export const platformConfigGetAll = (params = {}) => axios.post('/platformConfig/getAll', params) // 获取平台设置
export const platformConfigSaveAll = (params = {}) => axios.post('/platformConfig/saveAll', params) // 平台设置

/* 用户信息 */
export const loginApi = (params = {}) => axios.post('/user/login', params) // 登录
export const signOutApi = (params = {}) => axios.post('/user/signOut', params) // 登出
export const userUpdatePwd = (params = {}) => axios.post('/user/updatePwd', params) // 修改密码
export const userGetPageList = (params = {}) => axios.post('/user/getPageList', params) // 获取用户信息列表
export const userGetCurrentLoginUser = (params = {}) => axios.get('/user/getCurrentLoginUser', params) // 获取用户信息
export const userGetById = (params = {}) => axios.get('/user/getById', params) // 根据ID获取用户信息
export const userDeleteById = (params = {}) => axios.post('/user/deleteById', params) // 根据ID删除用户信息
export const userAdd = (params = {}) => axios.post('/user/add', params) // 新增用户信息
export const userUpdate = (params = {}) => axios.post('/user/update', params) // 修改用户信息
export const userDisable = (params = {}) => axios.post('/user/disable', params) // 禁用用户
export const userEnable = (params = {}) => axios.post('/user/enable', params) // 启用用户
export const userResetPwd = (params = {}) => axios.post('/user/resetPwd', params) // 重置用户密码
export const userGetList = (params = {}) => axios.post('/user/getList', params) // 获取用户信息列表

/* 角色信息 */
export const roleGetAllList = (params = {}) => axios.post('/role/getAllList', params) // 获取所有角色列表
export const roleGetListExceptAssist = (params = {}) => axios.post('/role/getListExceptAssist', params) // 获取所有角色列表
export const roleGetPageList = (params = {}) => axios.post('/role/getPageList', params) // 获取角色列表
export const roleGetById = (params = {}) => axios.get('/role/getById', params) // 通过ID获取角色信息
export const roleDelete = (params = {}) => axios.post('/role/delete', params) // 删除角色
export const roleAdd = (params = {}) => axios.post('/role/add', params) // 新增角色
export const roleUpdate = (params = {}) => axios.post('/role/update', params) // 修改角色