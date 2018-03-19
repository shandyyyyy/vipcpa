const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const casProxy = require('./proxy');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const PORT = 3010

const theme = require('./antd-theme.js');
module.exports = {
    entry: {
        js: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8091', 'webpack/hot/only-dev-server', './app/client.js'],
        vendor: [
            'react', 'classnames', 'react-router', 'react-dom',
        ],
    },
    output: {
        // path: path.resolve(__dirname, 'dist'),
        // filename: './vendor.js',
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        chunkFilename: '[name].js',
    },
    resolve: {
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
                include: path.join(__dirname, 'app'),
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
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192',
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'file-loader?name=iconfont/[path][name].[ext]',
            },
        ]
    },
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('hot'),
            IS_DEVELOPMETN: true,
        }),
        // 提取css
        new ExtractTextPlugin('vendor.[hash].css'),
        // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // 入口文件名
            filename: 'vendor.bundle.js', // 打包后的文件名
        }),
        /* 压缩优化代码开始  可以关掉*/
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        /* 压缩优化代码结束*/
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin()
        // new OpenBrowserPlugin({
        //   url: `http://localhost:${PORT}/#/login`,
        // }),
        // // 分析代码
        // new BundleAnalyzerPlugin({ analyzerPort: 8188 }),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: './app/',
        historyApiFallback: true,
        //hot: true,
        inline: true,
        // proxy: casProxy(),
        host: '127.0.0.1',
        port: 8091,
    },
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM'
    }
}