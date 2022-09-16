//表格選擇器配置

export default {
	pageSize: 20,						//表格每一頁條數
	parseData: function (res) {
		return {
			data: res.data,
			rows: res.data.rows,		//分析行資料字段結構
			total: res.data.total,		//分析總數字段結構
			msg: res.message,			//分析描述字段結構
			code: res.code				//分析狀態字段結構
		}
	},
	request: {
		page: 'page',					//規定目前分頁字段
		pageSize: 'pageSize',			//規定一頁條數字段
		keyword: 'keyword'				//規定搜索字段
	},
	props: {
		label: 'label',					//映射label顯示字段
		value: 'value',					//映射value值字段
	}
}
