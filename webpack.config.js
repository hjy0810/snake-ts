const path = require('path');
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 引入CSS样式抽离插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env, argv) => {
  return {
    entry:'./src/index.ts',
    output:{
      filename: 'bundle.js', //将所有依赖的模块合并输出到一个叫bundle.js文件内
      path:path.resolve(__dirname,'dist'),
    },
    devtool: argv.mode === 'development' ?  'eval-source-map' : false,
    module:{
      rules:[
        {
          test:/\.less$/,
          use:[
            // 'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            // postcss,类似于babel，把css语法转换兼容旧版浏览器的语法
            {
              loader:'postcss-loader',
              options:{
                postcssOptions:{
                  plugins:[require('autoprefixer')]
                }
              }
            },
            'less-loader'
          ],
          include:path.resolve(__dirname,'src'),
          exclude:/node_modules/
        },
        {
          test:/\.ts$/,
          use:[
            {
              loader:'babel-loader',
              options:{
                cacheDirectory: true,  // 启动缓存机制，防止重复二次编译。
                // 设置预定义的环境
                presets:[
                  [
                     // 指定环境的插件
                    '@babel/preset-env',
                    // 配置信息
                    {
                      // 要兼容的目标浏览器
                      targets:{
                        'chrome':'69'
                      },
                      // 指定corejs的版本
                      corejs:3,
                      // 使用corejs的方式 "usage" 表示按需加载
                      useBuiltIns: "usage"
                    }
                  ]
                ]
              }
            },
            'ts-loader',
          ],
          exclude:/node_modules/
        }
      ]
    },
  
    plugins:[
      new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),//加的参数是指，当文件改变后我们不想删除index.html文件
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'./src/index.html'), //模板文件
        filename:'index.html'   //打包后生成的文件
      }),
      new MiniCssExtractPlugin({
        filename:'css/main.css'
      })
    ],
    resolve:{
      extensions:['.ts','.js']
    },
    devServer:{
      port:3000,
      open: 'Google Chrome',
      contentBase: path.resolve(__dirname, "dist") , // 起服务的地址，默认是打包输出的文件夹，即output.path
      inline: true,             // 实时刷新
      stats: 'errors-only',     //只有错误的才会被打印，没有错误就不打印，多余的信息就不会显示出来了。该属性值还有 'minimal', 'normal', 'verbose' 等
    },
  }
}
