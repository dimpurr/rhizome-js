const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader', // 将 JS 字符串生成为 style 节点
                    'css-loader',   // 将 CSS 转化成 CommonJS 模块
                    'sass-loader'   // 将 Sass 编译成 CSS，默认使用 Dart Sass
                ],
            },
        ]
    },
    // externals: {
    //     react: 'react'
    // },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
