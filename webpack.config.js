const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导出一个对象
module.exports = {
    // 启动模式
    mode: "development",
    // 拿到入口文件
    entry: resolve(__dirname, 'src/main.js'),
    // 输出
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'dist')
    },
    // 省略掉.js 和 .vue
    resolve: {
        extensions: ['.js', '.vue']
    },
    // 先去node_modules找包，找不到去modules里找
    resolveLoader: {
        modules: [
            'node_modules',
            resolve(__dirname, './modules')
        ]
    },
    module: {
        // 处理相关文件
        rules: [{
                // 忽略大小写
                test: /.vue$/i,
                // 使用自己写的 vue-loader
                loader: 'vue-loader'
            },
            {
                test: /.css$/i,
                // 先经过css-loa der处理再经过style-lodaer
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // 使用它来处理HTML模版，帮忙把css和js放入html中
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/index.html')
        })
    ]
}