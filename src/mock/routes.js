/*
 * @Title: 子路由文件
 * @Descripttion: 默认将第一个作为默认展示视图
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-02-06 15:30:27
 */

export default [{
  path: '/about',
  icon: 'icon1',
  component: 'About/guide',
  meta: { id: 99, hidden: false, menuName: '框架文档', modelUrl: '/' },
  children: [{
    component: 'About/guide',
    path: 'guide',
    meta: { id: 991, hidden: false, menuName: '引导说明', modelUrl: '/' }
  }, {
    component: 'About/text',
    path: 'text',
    meta: { id: 992, hidden: false, menuName: '测试页面', modelUrl: '/' }
  }]
}];