import config from "@/config"
import httpReq from "@/utils/request"

export default {
	ver: {
		url: `${config.API_URL}/demo/ver`,
		name: "獲取最新版本號",
		get: async function(params){
			return await httpReq.get(this.url, params);
		}
	},
	post: {
		url: `${config.API_URL}/demo/post`,
		name: "分頁列表",
		post: async function(data){
			return await httpReq.post(this.url, data, {
				headers: {
					//'response-status': 401
				}
			});
		}
	},
	page: {
		url: `${config.API_URL}/demo/page`,
		name: "分頁列表",
		get: async function(params){
			return await httpReq.get(this.url, params);
		}
	},
	list: {
		url: `${config.API_URL}/demo/list`,
		name: "資料列表",
		get: async function(params){
			return await httpReq.get(this.url, params);
		}
	},
	menu: {
		url: `${config.API_URL}/demo/menu`,
		name: "普通用戶選單",
		get: async function(){
			return await httpReq.get(this.url);
		}
	},
	status: {
		url: `${config.API_URL}/demo/status`,
		name: "模擬無權限",
		get: async function(code){
			return await httpReq.get(this.url, {}, {
				headers: {
					"response-status": code
				}
			});
		}
	}
}
