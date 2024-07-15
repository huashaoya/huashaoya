const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.js");
const ZipPlugin = require('zip-webpack-plugin');
const { name: ProjectName, version: Version } = require('./package.json'); // 引入项目名称与版本

module.exports = merge(baseConfig, {
	mode: "production",
	plugins: [
        // new ZipPlugin({  // 打包压缩
        //     filename: `${ProjectName}_${Version}.zip`,
        //     // 打包的时候不要把sourcemap压缩进去，zip包给出去是不安全的
        //     exclude: [/sourcemaps/],
        // }),
    ],
})
