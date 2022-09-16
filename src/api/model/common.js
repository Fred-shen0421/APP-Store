import config from "@/config"
import httpReq from "@/utils/request"

export default {
	upload: {
		url: `${config.API_URL}/upload`,
		name: "文件上傳",
		post: async function(data, config={}){
			return await httpReq.post(this.url, data, config);
		}
	},
	uploadFile: {
		url: `${config.API_URL}/uploadFile`,
		name: "附件上傳",
		post: async function(data, config={}){
			return await httpReq.post(this.url, data, config);
		}
	},
	exportFile: {
		url: `${config.API_URL}/fileExport`,
		name: "導出附件",
		get: async function(data, config={}){
			return await httpReq.get(this.url, data, config);
		}
	},
	importFile: {
		url: `${config.API_URL}/fileImport`,
		name: "導入附件",
		post: async function(data, config={}){
			return await httpReq.post(this.url, data, config);
		}
	},
	file: {
		menu: {
			url: `${config.API_URL}/file/menu`,
			name: "獲取文件分類",
			get: async function(){
				return await httpReq.get(this.url);
			}
		},
		list: {
			url: `${config.API_URL}/file/list`,
			name: "獲取文件列表",
			get: async function(params){
				return await httpReq.get(this.url, params);
			}
		}
	}
}
