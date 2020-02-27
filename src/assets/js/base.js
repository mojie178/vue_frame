/**
 * 环境配置文件
 */

export default {
    development: {
        env: 'development', // 环境名称
        baseUrl: 'http://218.23.36.99:8088', // 服务端接口路径
        project: '/sdm',
        package: ''
    },
    production: {
        env: 'production', //环境名称
        baseUrl: 'http://218.23.36.99:8088', // 服务端接口路径
        project: '/sdm',
        package: 'ccdc'
    },
}[process.env.NODE_ENV || 'development']