const DEFAULT_CONFIG = {
	//標題
	APP_NAME: process.env.VUE_APP_TITLE,

	//次標題，無則留空
	APP_NAME_SUB: process.env.VUE_APP_TITLE_SUB,

	//首頁地址
	DASHBOARD_URL: "/dashboard",

	//版本號
	APP_VER: "1.2.0",

	//內核版本號
	CORE_VER: "1.6.4",

	//接口地址
	API_URL: process.env.NODE_ENV === 'development' && process.env.VUE_APP_PROXY === 'true' ? "/api" : process.env.VUE_APP_API_BASEURL,

	//請求超時
	TIMEOUT: 10000,

	//TokenName
	TOKEN_NAME: "Authorization",

	//Token前綴，注意最後有個空格，如不需要需設置空字符串
	TOKEN_PREFIX: "Bearer ",

	//追加其他頭
	HEADERS: {},

	//請求是否開啟緩存
	REQUEST_CACHE: false,

	//佈局 默認：default | 通欄：header | 經典：menu | 功能塢：dock
	//dock將關閉標籤和麵包屑欄
	LAYOUT: 'menu',

	//選單是否折疊
	MENU_IS_COLLAPSE: false,

	//選單是否啟用手風琴效果
	MENU_UNIQUE_OPENED: false,

	//是否開啟多標籤
	LAYOUT_TAGS: true,

	//UserBar功能啓用設定
	//screen:最大化 | tasks:任務中心 | msg:訊息中心 | name:使用者名稱
	LAYOUT_USERBAR: {
		screen: true,
		tasks: true,
		msg: true,
		name: false,
	},	

	//語言
	LANG: 'zh-tw',

	//主題顏色
	COLOR: '',

	//是否加密localStorage, 為空不加密，可填寫AES(模式ECB,移位Pkcs7)加密
	LS_ENCRYPTION: '',

	//localStorageAES加密秘鑰，位數建議填寫8的倍數
	LS_ENCRYPTION_key: '2XNN4K8LC0ELVWN4',

	//控制台首頁默認佈局
	DEFAULT_GRID: {
		//默認分欄數量和寬度 例如 [24] [18,6] [8,8,8] [6,12,6]
		layout: [12, 6, 6],
		//小組件分佈，com取值:views/home/components 文件名
		copmsList: [
			['welcome'],
			['about', 'ver'],
			['time', 'progress']
		]
	}
}

// 如果生產模式，就合併動態的APP_CONFIG
// public/config.js
if(process.env.NODE_ENV === 'production'){
	Object.assign(DEFAULT_CONFIG, APP_CONFIG)
}

module.exports = DEFAULT_CONFIG
