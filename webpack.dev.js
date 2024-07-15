const { merge } = require("webpack-merge"); // 引入 merge 方法
const baseConfig = require("./webpack.config.js"); // 引入base配置

// 合并两个配置
module.exports = merge(baseConfig, {  
	mode: "development",  // 配置webpack运行模式
	devtool: 'inline-source-map', // 配置sourcemap
    devServer: {
		static: './dist',
		open: true,  // 配置运行是否就打开网页
		port: 8080,  // 配置网页端口，其他配置请参考webpack官网
		hot:false
	},
	optimization: {
		runtimeChunk: 'single',
	}
})
