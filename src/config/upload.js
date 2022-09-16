import API from "@/api";

//上傳配置

export default {
	apiObj: API.common.upload,			//上傳請求API對像
	filename: "file",					//form請求時文件的key
	successCode: 200,					//請求完成代碼
	maxSize: 10,						//最大文件大小 默認10MB
	parseData: function (res) {
		return {
			code: res.code,				//分析狀態字段結構
			fileName: res.data.fileName,//分析文件名稱
			src: res.data.src,			//分析圖片遠程地址結構
			msg: res.message			//分析描述字段結構
		}
	},
	apiObjFile: API.common.uploadFile,	//附件上傳請求API對像
	maxSizeFile: 10						//最大文件大小 默認10MB
}
