const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs-extra')
const theme = require('./antd-theme.js');

module.exports = {
  entry: {
    index: './app/client.js',
    vendor: [
      'react', 'classnames', 'react-router', 'react-dom',
    ],
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: './vendor.js',
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    chunkFilename: '[name].[hash].js',
  },
  resolve: {
    //extensions: ['', '.js', '.json'],
    alias: {
      components: __dirname + '/app/components',
      actions: __dirname + '/app/actions',
      api: __dirname + '/app/api',
      reducers: __dirname + '/app/reducers',
      util: __dirname + '/app/util',
      assets: __dirname + '/app/assets',
    },
  },
  module: {
    rules: [{
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?sourceMap=true", `less-loader?{'sourceMap':true,'modifyVars':${JSON.stringify(theme)}}`]
        })
      }, {
        test: /\.css/,
        // loader: 'style!css',
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?{"sourceMap":true}'),
        use: [
          'style-loader',
          'css-loader',
        ]
      },

      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)(\?.+)?$/,
        use: [{
          loader: "url-loader?limit=10000&name=images/[name].[ext]&publicPath=/dist/"
        }]
      }
    ]
  },
  plugins: [
    // 清除dist文件夹
    new CleanWebpackPlugin(['dist']),
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // 提取css
    new ExtractTextPlugin('vendor.[hash].css'),
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    //new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor.[hash]', // 入口文件名
      filename: 'vendor.[hash].bundle.js', // 打包后的文件名
    }),
    // 为组件分配id
    // new webpack.optimize.OccurrenceOrderPlugin(),
    /* 压缩优化代码开始  可以关掉*/
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    /* 压缩优化代码结束*/
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html'),
      filename: '../index.html'
    }),
    // 分析代码
    // new BundleAnalyzerPlugin({ analyzerPort: 8188 }),
  ],
}

//fs.copy('./app/assets/images', './dist/images')
//fs.copy('./app/iconfont', './dist/iconfont')
// CopyDir({ from: './app/images', to: './dist/images' })
// CopyDir('./app/iconfont', './dist/iconfont')