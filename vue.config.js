const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	//設置為空打包後不分更目錄還是多級目錄
	publicPath:'',
	//build編譯後存放靜態文件的目錄
	//assetsDir: "static",

	// build編譯後不生成資源MAP文件
	productionSourceMap: false,

	//開發服務,build後的生產模式還需nginx代理
	devServer: {
		open: false, //運行後自動打開瀏覽器
		//host: process.env.VUE_APP_HOST, //主機IP 若open: true就要設定host
		port: process.env.VUE_APP_PORT, //掛載端口
		proxy: {
			'/api': {
				target: process.env.VUE_APP_API_BASEURL,
				ws: true,
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	},

	chainWebpack: config => {
		// 移除 prefetch 插件
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
		config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
	},

	configureWebpack: {
		//性能提示
		performance: {
			hints: false
		},
		optimization: {
			splitChunks: {
				chunks: "all",
				automaticNameDelimiter: '~',
				name: "csiChunks",
				cacheGroups: {
					//第三方庫抽離
					vendor: {
						name: "modules",
						test: /[\\/]node_modules[\\/]/,
						priority: -10
					},
					elicons: {
						name: "elicons",
						test: /[\\/]node_modules[\\/]@element-plus[\\/]icons-vue[\\/]/
					},
					tinymce: {
						name: "tinymce",
						test: /[\\/]node_modules[\\/]tinymce[\\/]/
					},
					echarts: {
						name: "echarts",
						test: /[\\/]node_modules[\\/]echarts[\\/]/
					},
					videojs: {
						name: "videojs",
						test: /[\\/]node_modules[\\/]videojs[\\/]/
					},
					codemirror: {
						name: "codemirror",
						test: /[\\/]node_modules[\\/]codemirror[\\/]/
					}
				}
			}
		}
	}
})
