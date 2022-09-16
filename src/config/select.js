import API from "@/api";

//字典選擇器配置

export default {
	dicApiObj: API.system.dic.get,		//獲取字典接口對像
	parseData: function (res) {
		return {
			data: res.data,				//分析行資料字段結構
			msg: res.message,			//分析描述字段結構
			code: res.code				//分析狀態字段結構
		}
	},
	request: {
		name: 'name'					//規定搜索字段
	},
	props: {
		label: 'label',					//映射label顯示字段
		value: 'value',					//映射value值字段
	}
}
