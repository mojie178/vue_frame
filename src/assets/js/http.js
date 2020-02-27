import axios from 'axios'
import base from './base'
import router from '../../router'

// 关于axios配置
axios.defaults.timeout = 10000
// 配置请求的根路径
axios.defaults.baseURL = `${base.baseUrl}${base.project}`
// 设置post头部信息
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// 设置token
axios.defaults.headers.common['x-token'] = localStorage.getItem('x-token') || ''

// POST 传参序列化
axios.interceptors.request.use(config => {
    // 发送请求
    return config
}, error => {
    return Promise.reject(error)
})

// 返回结果处理
axios.interceptors.response.use(
    res => {
        // 状态码：-1 没有登录, -2 没有权限, -3 系统报错, 0 后台返回错误信息, 1 成功访问
        switch (Number(res.data.code)) {
            case -1:
                localStorage.removeItem('x-token')
                return router.push('/login')
            case -3:
                return console.log(res.msg)
            default:
                return res.data
        }
    },err => {
        return Promise.reject(err)
    }
)

export default {
  // post 方法
  post(url, data) {
      return axios({
          method: 'post',
          url,
          data: data
      })
  },
  // get 方法
  get(url, data) {
      return axios({
          method: 'get',
          url,
          params: data
      })
  }
}