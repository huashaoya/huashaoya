const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./js/[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        proxy:[
            {
                context: () => true, // 这样可以匹配所有的路径
                target: 'http://localhost:8081', //需要跨域的url
                changeOrigin: true,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html"
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'dist')
            }]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[s]?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]//让 TypeScript 处理 .vue 文件中的 TypeScript 代码
                },
                //exclude:/node_modules/
            }
        ]
    },
}