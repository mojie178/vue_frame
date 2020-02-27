import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '*', name: 'page404', component: () => import(/* webpackChunkName: '404' */ '@/views/common/Page404')},
        {path: '/login', name: 'login', component: () => import(/* webpackChunkName: 'login' */ '@/views/common/LoginPage')},
        {
            path: '/',
            name: 'mainPage',
            component: () => import(/* webpackChunkName: 'main' */ '@/views/common/MainPage'),
            redirect: '/system',
            beforeEnter: (to, form, next) => {
                if (localStorage.getItem('x-token')) next()
                else {
                    localStorage.removeItem('x-token')
                    next({ path: '/login' })
                }
            },
            children: [
                {
                    path: '/system',
                    name: 'systemPage',
                    component: () => import(/* webpackChunkName: 'system' */ '@/views/system/SystemPage'),
                    redirect: '/system/user',
                    meta: {id: '1', name: '系统管理'},
                    children: [
                        {path: '/system/user', name: 'userAdmin', meta: {id: '1-1', name: '用户管理'}, component: () => import(/* webpackChunkName: 'user' */ '@/views/system/UserAdmin')},
                        {path: '/system/post', name: 'postAdmin', meta: {id: '1-2', name: '角色管理'}, component: () => import(/* webpackChunkName: 'post' */ '@/views/system/PostAdmin')},
                    ]
                },
                {
                    path: '/platform',
                    name: 'platformPage',
                    component: () => import(/* webpackChunkName: 'system' */ '@/views/platform/PlatformPage'),
                    redirect: '/platform/set',
                    meta: {id: '2', name: '平台管理'},
                    children: [
                        {path: '/platform/set', name: 'platformSet', meta: {id: '2-1', name: '平台设置'}, component: () => import(/* webpackChunkName: 'set' */ '@/views/platform/PlatformSet')},
                    ]
                },
            ]
        }
    ]
})
