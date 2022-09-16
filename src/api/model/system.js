import config from "@/config"
import httpReq from "@/utils/request";

export default {
	menu: {
		myMenus: {
			url: `${config.API_URL}/system/menu/myMenus`,
			name: "獲取我的選單",
			get: async function(){
				return await httpReq.get(this.url);
			}
		},
		list: {
			url: `${config.API_URL}/system/menu/list`,
			name: "獲取選單",
			get: async function(){
				return await httpReq.get(this.url);
			}
		}
	},
	dic: {
		tree: {
			url: `${config.API_URL}/system/dic/tree`,
			name: "獲取字典樹",
			get: async function(){
				return await httpReq.get(this.url);
			}
		},
		list: {
			url: `${config.API_URL}/system/dic/list`,
			name: "字典明細",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		},
		get: {
			url: `${config.API_URL}/system/dic/get`,
			name: "獲取字典資料",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		}
	},
	role: {
		list: {
			url: `${config.API_URL}/system/role/list`,
			name: "獲取角色列表",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		}
	},
	dept: {
		list: {
			url: `${config.API_URL}/system/dept/list`,
			name: "獲取部門列表",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		}
	},
	user: {
		list: {
			url: `${config.API_URL}/system/user/list`,
			name: "獲取用戶列表",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		},
		my: {
			url: `${config.API_URL}/system/user/my`,
			name: "修改我的帳號",
			post:  async function(data={}){
				return await httpReq.post(this.url, data);
			}
		},
	},
	app: {
		list: {
			url: `${config.API_URL}/system/app/list`,
			name: "應用列表",
			get: async function(){
				return await httpReq.get(this.url);
			}
		}
	},
	log: {
		list: {
			url: `${config.API_URL}/system/log/list`,
			name: "日誌列表",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		}
	},
	table: {
		list: {
			url: `${config.API_URL}/system/table/list`,
			name: "表格列管理列表",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		},
		info: {
			url: `${config.API_URL}/system/table/info`,
			name: "表格列管理詳情",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		}
	},
	tasks: {
		list: {
			url: `${config.API_URL}/system/tasks/list`,
			name: "系統任務管理",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		}
	}
}
