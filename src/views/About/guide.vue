<!--
 * @Title: 引导说明
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <layout :name="$route.meta.menuName" description="本页为引导说明文件，正式开发可删除此模块和相关路由配置">
    <div slot="operation">
      <el-button icon="el-icon-back" slot="operation" @click="$router.push('/admin')">返回首页</el-button>
    </div>
    <!-- 文件说明 -->
    <h2>SRC 文件夹内容说明</h2>
    <h5>注：文件夹、文件名、函数方法等，若无特殊要求，请使用小驼峰命名法（如 helloWorld）；正式开发请按照说明要求编写业务代码</h5>
    <el-table
      :element-loading-text="LOADING_TEXT"
      :data="tableData"
      row-key="name"
      :tree-props="{ children: 'children' }"
      size="mini"
      border
      stripe
      highlight-current-row>
      <el-table-column prop="name" label="名称" align="center" width="200" />
      <el-table-column prop="explain" label="说明" align="center" />
      <el-table-column prop="remark" label="备注" align="center" min-width="300" />
    </el-table>
    <!-- 开发要求 -->
    <h2>开发要求</h2>
    <p>· 请先安装 <a href="https://nodejs.org/zh-cn/" target="_blank">Node</a>、<a href="https://git-scm.com/" target="_blank">Git</a>，并推荐使用 <a href="https://yarn.bootcss.com/" target="_blank">Yarn</a></p>
    <p>· 主流编辑器即可，推荐使用 <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> 编辑器，并推荐安装 koroFileHeader 等插件以便文件注释</p>
    <p>. 请在 README.md 上说明该项目所负责的业务流程和注意事项</p>
    <!-- 本机接口联调说明 -->
    <h2>本机接口联调</h2>
    <h5>若不需接口联调，启动项目后，直接点击立即登录按钮即可，不需做任何配置</h5>
    <p>1、先将 vue.config.js 中的 devServer 配置代理路径设置为联调服务端的本机 IP 端口号</p>
    <p>2、将 config/env.js 中的 baseUrl 进行配置为当前工程号</p>
    <p>3、需服务端将前端本机 IP 端口号进行相关配置，防止接口跨域问题</p>
    <p>4、本机启动项目后自动打开登录页面，输入 cookie 点击立即登录按钮后，进入主体业务视图</p>
    <!-- 注意事项 -->
    <h2>注意事项</h2>
    <p>· 文件夹、文件名、函数方法等，若无特殊要求，请使用小驼峰命名法（如 helloWorld）；css 样式命名若无特殊需求，请使用下划线分隔命名法（如 hello_world）</p>
    <p>· 若牵涉到较为复杂的数学计算和较为复杂的业务流程，请将计算公式、业务流程、注意事项等注释说明</p>
    <p>· 修改公共基础类文件后，若改动较大，修改后请在代码处注释说明修改原因和注意事项等，建议将老代码做注释处理</p>
    <p>· 若新增公共基础类文件，请文件头部注释文件说明、创建者等信息，所有全局变量、方法必须注释说明，函数方法额外注释入参格式、返回格式</p>
    <p>· 原则上不允许删除公共基础类文件，若删除则必须在 Git 信息中备注说明，并在开发群中通知其他开发人员</p>
    <p>· 页面左侧导航 icon 配置名称一定要与图片名称相同，否则图标无法正常展示</p>
    <p>· 若服务端未做本地联调适配修改，暂时以假数据解决，可在 mock 中对应文件配置</p>
    <p>· 打包文件名和 title 名称可在 vue.config.js 中配置</p>
    <!-- 注意事项及问题答复 -->
    <h2>遇到问题</h2>
    <p>文件引用报错？</p>
    <h5>请查看文件名和文件引用是否正确</h5>
    <p>接口跨域？</p>
    <h5>咨询服务端开发人员，IP 端口号配置是否正确。若正确，则需要同服务端共同排查其它跨域情况</h5>
    <p>cookie 信息如何获取？</p>
    <h5>可向服务端开发人员索取，若项目已提测，可从测试环境 api 接口请求头部信息和测试环境 localStorage 中的 vuex/cookieVal 获取</h5>
    <p>cookie 失效？</p>
    <h5>回退到登录视图界面，填写最新 cookie 重新登录</h5>
    <p>多模块接口联调？</p>
    <h5>若本机联调视图界面，需用到其他服务端人员负责的接口，若他人已提交相关模块最新代码，则要求当前服务端人员同步最新代码，否则暂时以假数据或者其它方式解决</h5>
    <p>本地联调，数据不同步？</p>
    <h5>可手动更换 mock 数据信息，只要数据结构符合要求即可</h5>
    <!-- 老项目调试优化 -->
    <h2>老项目调试优化步骤</h2>
    <h5>可全文件搜索 PROCESS_ENV_NODE_ENV 查看关键修改点，具体项目可做相应自主调整</h5>
    <p>1. 在 util/const.js 中配置 PROCESS_ENV_NODE_ENV 常量</p>
    <p>2. 拷贝 views/Login/dev.vue 于老项目对应登录文件夹</p>
    <p>3. 创建本地 mock 数据，包含 userInfo.js（用户信息）、 routes.js（本地路由信息）和 nodes.js（本地按钮权限），本地 mock 数据结构与后端返回相同</p>
    <p>4. 在 router/index.js 中引入 PROCESS_ENV_NODE_ENV，并根据该环境常量，登录界面动态展示登录界面和是否启用路由守卫</p>
    <p>5. 在 store/getters.js 中引入 PROCESS_ENV_NODE_ENV，并根据该环境常量，左侧导航动态使用本地路由或后端配置路由</p>
    <p>6. 在 store/actions.js 中引入 PROCESS_ENV_NODE_ENV，并根据该环境常量，左侧导航动态使用本地按钮权限或后端配置路由</p>
    <p>7. 在 util/http.js 中引入 PROCESS_ENV_NODE_ENV，并根据该环境常量，动态配置接口请求 isallow 配置</p>
    <p>8. 在 views/Index/index.vue 中引入 PROCESS_ENV_NODE_ENV，并根据该环境常量，动态修改退出登录</p>
  </layout>
</template>

<script>
import { baseMixin, tableMixin } from '@/mixins';

export default {
  mixins: [baseMixin, tableMixin],
  data() {
    return {
      isShow: true, // 是否显示富文本
      htmlStr: '', // 初始值
      tableData: [{
        name: 'api',
        explain: '服务端 API 接口文档',
        remark: '各个模块 api 存入各自同名文件夹中，index.js 存放公共基础类 api 接口'
      }, {
        name: 'components',
        explain: '公共组件',
        remark: '组件文件夹名称采用大驼峰命名法（如 HelloWorld），如无特殊需求，组件入口视图采用 index.vue 命名',
        children: [{
          name: 'BaseHeader',
          explain: '公共类平台基础头部',
          remark: '一般使用于登录、注册等非主体业务视图界面'
        }, {
          name: 'Copyright',
          explain: '公司版权标注',
          remark: '一般使用于登录、注册等非主体业务视图界面'
        }, {
          name: 'Footer',
          explain: '公共类平台基础脚部',
          remark: '一般使用于登录、注册等非主体业务视图界面'
        }, {
          name: 'Identify',
          explain: '生成注册码',
          remark: '一般使用于登录、注册等非主体业务视图界面'
        }, {
          name: 'Layout',
          explain: '主体业务视图基础布局框架',
          remark: '已在 mixins/index.js 中 baseMixin 引用，如果引用 baseMixin， 请勿重复引用此组件'
        }, {
          name: 'LoginSwitch',
          explain: '登录、注册、找回密码等按钮',
          remark: '一般使用于登录、注册等非主体业务视图界面'
        }, {
          name: 'Map',
          explain: '对百度地图的二次封装',
          remark: '经纬度点采用百度经纬度标准，注意 public/index.html 中是否引入百度地图 JS 文件'
        }, {
          name: 'PasswordInput',
          explain: '钱包密码输入框',
          remark: '返回输入的密码，默认是 6 位密码输入框，父组件使用 getPwd 方法获取输入密码'
        }, {
          name: 'PicShow',
          explain: '图片大图展示',
          remark: '支持放大、缩小、拖拽和旋转'
        }, {
          name: 'Tinymce',
          explain: '富文本编辑框',
          remark: '基于 Tinymce 搭建，图片直接上传功能暂不支持，引入图片需使用链接方式引入'
        }, {
          name: 'Upload',
          explain: '公共切片上传',
          remark: '使用 config/env.js 中的 downloadURL 路径加文件 id 查看或者下载，文件格式支持 jpg、jpeg、png、PNG、JPG、JPEG、doc、docx、ppt、pptx、xls、xlsx、pdf、mp4、avi、mov、rmvb'
        }]
      }, {
        name: 'config',
        explain: '基本环境配置',
        remark: '暂时只区分 development 和 production 环境'
      }, {
        name: 'directives',
        explain: '公共类 vue 指令',
        remark: 'index.js 中的指令命名以 directive 开头，所有指令已在 main.js 中全局引入，无需单独引用'
      }, {
        name: 'filters',
        explain: '公共类 vue 过滤器',
        remark: 'index.js 中的过滤器命名以 filter 开头，所有过滤器已在 main.js 中全局引入，无需单独引用'
      }, {
        name: 'images',
        explain: '图片文件夹',
        remark: '各个模块图片存入各自同名文件夹中',
        children: [{
          name: 'base',
          explain: '基础类图片',
          remark: '存放基础模块如登录注册、组件的图片'
        }, {
          name: 'common',
          explain: '存放通用图片',
          remark: '存放多个业务视图模块使用的图片'
        }, {
          name: 'menu',
          explain: '存放左侧导航栏 icon 图标',
          remark: '页面左侧导航自定义配置的时候，icon 配置名称一定要与图片名称相同，否则左侧 icon 图标无法正常展示'
        }]
      }, {
        name: 'mixins',
        explain: '公共类 mixins',
        remark: 'index.js 中的混入方法命名以 mixin 结尾'
      }, {
        name: 'mock',
        explain: '本机调试运行数据',
        remark: '所有数据的数据结构请与 production 环境保持一致，routes.js 、userInfo.js 和 nodes.js 请勿删除',
        children: [{
          name: 'nodes.js',
          explain: '模拟 production 环境权限配置',
          remark: '本机提供增删改查基本权限，具体展示隐藏以产线为准'
        }, {
          name: 'routes.js',
          explain: '模拟 production 环境路由数据',
          remark: '一级路由 path 务必带 /，二级路由不需带 /，此处因公共配置平台历史遗留问题造成'
        }, {
          name: 'userInfo.js',
          explain: '模拟 production 环境当前用户数据',
          remark: '本机联调，服务端以 cookie 为准，当前登录用户可自行配置，此处不会产生阻碍性问题'
        }]
      }, {
        name: 'router',
        explain: '平台 router 配置',
        remark: '本机调试的主体业务性路由请在 mock/routes.js 配置，平台采用正序首位路由作为默认自定义跳转路由'
      }, {
        name: 'store',
        explain: '平台 store 配置',
        remark: '如需配置，请按 vuex 规则配置'
      }, {
        name: 'styles',
        explain: '平台公共类样式配置',
        remark: 'common.js、element.js 和 reset.js 请勿删除'
      }, {
        name: 'util',
        explain: '平台公共类方法配置',
        remark: 'const.js、http.js 和 validate.js 请勿删除'
      }, {
        name: 'views',
        explain: '平台视图层',
        remark: '文件夹名称命名使用大驼峰命名法（如 HelloWorld），若无特殊需求，模块视图入口文件命名使用 index.vue，Exception、Login 和 Index 模块请勿删除',
        children: [{
          name: 'About',
          explain: '引导视图模块',
          remark: '框架使用引导说明页面，正式开发可删除'
        }, {
          name: 'Exception',
          explain: '404 视图模块',
          remark: '此处回到首页按钮回退到平台路由首页，当前配置为登录页'
        }, {
          name: 'Login',
          explain: '登录视图模块',
          remark: 'dev.vue 为本机联调登录页，如果静态页开发可不传入 cookie 直接登录，pro.vue 为单点登录页面'
        }, {
          name: 'Index',
          explain: '主题业务入口视图模块',
          remark: '包含头部、左侧导航栏等模块，主体业务通用调用 api、配置方法等操作可在此处编写'
        }, {
          name: 'App.vue',
          explain: 'App.vue',
          remark: '覆盖 element-ui 样式或通用样式请在 styles 中对应文件中编写'
        }, {
          name: 'main.js',
          explain: 'main.js',
          remark: '非公共类、通用化程度高的方法或者 npm 包，请勿在此处引用'
        }]
      }]
    }
  }
}
</script>