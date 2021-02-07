/*
 * @Title: 
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 */
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'etc_company_cli', // 输出文件目录
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240, // 10k
            deleteOriginalAssets: false
          }),
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                // drop_debugger: true,
                // drop_console: true
              }
            },
            parallel: true
          }),
        ]
      };
    }
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {}, // css预设器配置项
    requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8001,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/xxxxxx': { // 接口联调时替换
        target: 'https://192.168.1.1:8080/xxxxxx/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/xxxxxx': '/'
        }
      }
    },
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
  // see https://github.com/Justineo/vue-awesome
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
};
