#  vue通用框架

### 一、项目说明 ###
本项目基于 vue 脚手架搭建编写，请在 Node(8.0.0以上) 环境下安装 npm 包再运行，具体安装流程请自行查询。项目编写文件为 vue 格式，具体编写规则请操作 [vue](https://cn.vuejs.org/)

### 二、文件目录及作用 ###
> 文件目录基于脚手架，具体细节可参考 具体作用可参考 [vue](https://cn.vuejs.org/)

+ node_modules —— 存放 npm 第三包文件，可忽略
+ public —— 存放静态资源文件
+ src —— 项目主要文件
    + assets —— 公共类配置文件，如接口请求配置，公共通用方法等
    + components —— 网页源文件
    + App.vue —— vue 页面模板
    + main.js —— vue 项目入口 js 文件
    + router —— 路由配置
    + store —— 状态存储
+ .gitignore —— git 配置文件
+ .babel.config.js —— babel 配置文件
+ package.json —— 项目配置文件
+ README.md —— 说明文件
+ vue.config.js —— vue 框架配置文件

#### 1、文件命名规范 ####
+ vue 文件创建采用小驼峰命名方法，名字能表示文件功能
+ 文件命名采用英文，禁止使用拼音
+ 文件夹管理与网站左侧导航栏统一
+ 接口命名由后端接口路径拼接而来

#### 2、代码编写规范 ####
+ 编写代码缩进为 2 格
```js
for (let i = 0; i < 5; i++) {
    console.log(i)
}
```
+ 编写分号不做要求，但单个文件需统一
```js
console.log('hello')
console.log('hello');
```
+ 方法、变量使用小驼峰法命名，常量用大写，若已存在类似功能，请参考相同命名
```js
function helloWorld() {}
const TIME = '2018-10-01'
```
+ 运算符、数字、赋值号、中英文之间留有空格
```js
let sum = num1 + num2
```
+ 要求使用 ES6 及以上语法
```js
setTimeout(() => {}, 1000)
```
+ template 或者 html 标签中，请用双引号，js 中请用单引号
```js
let hello = 'hello'
```
+ 方法、变量请备注说明
+ vue 文件内模块编写请按照 [vue](https://cn.vuejs.org/) 要求和建议

### 五、项目启动 ###
1. 请先部署 Node(8.0.0以上) 环境，具体操作可操作 [Node](https://nodejs.org/zh-cn/)，npm 会自动安装对应版本
2. 环境安装好后，请操作以下命名启动/打包项目

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9999
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

3. 本项目并没有配置前端接口跨域代理，如有需求可在 vue.config.js 文件配置，具体操作请参考 [vue](https://cn.vuejs.org/)
4. 接口域名配置请在 src/assets/js/base.js 配置
5. 如果正常操作仍无法打开，请检查 node_modules 中第三方包版本是否合适，自行更换。
