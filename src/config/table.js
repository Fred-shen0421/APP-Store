//資料表格配置

import tool from '@/utils/tool'

export default {
	successCode: 200,												//請求完成代碼
	pageSize: 20,													//表格每一頁條數
	pageSizes: [10, 20, 30, 40, 50],								//表格可設置的一頁條數
	paginationLayout: "total, sizes, prev, pager, next, jumper",	//表格分頁佈局，可設置"total, sizes, prev, pager, next, jumper"
	parseData: function (res) {										//資料分析
		return {
			data: res.data,				//分析無分頁的資料字段結構
			rows: res.data.rows,		//分析行資料字段結構
			total: res.data.total,		//分析總數字段結構
			summary: res.data.summary,	//分析合計行字段結構
			msg: res.message,			//分析描述字段結構
			code: res.code				//分析狀態字段結構
		}
	},
	request: {							//請求規定字段
		page: 'page',					//規定目前分頁字段
		pageSize: 'pageSize',			//規定一頁條數字段
		prop: 'prop',					//規定排序字段名字段
		order: 'order'					//規定排序規格字段
	},
	/**
	 * 自定義列保存處理
	 * @tableName scTable組件的props->tableName
	 * @column 用戶配置好的列
	 */
	columnSettingSave: function (tableName, column) {
		return new Promise((resolve) => {
			setTimeout(()=>{
				//這裡為了演示使用了session和setTimeout演示，開發時應用資料請求
				tool.session.set(tableName, column)
				resolve(true)
			},1000)
		})
	},
	/**
	 * 獲取自定義列
	 * @tableName scTable組件的props->tableName
	 * @column 組件接受到的props->column
	 */
	columnSettingGet: function (tableName, column) {
		return new Promise((resolve) => {
			//這裡為了演示使用了session和setTimeout演示，開發時應用資料請求
			const userColumn = tool.session.get(tableName)
			if(userColumn){
				resolve(userColumn)
			}else{
				resolve(column)
			}
		})
	},
	/**
	 * 重置自定義列
	 * @tableName scTable組件的props->tableName
	 * @column 組件接受到的props->column
	 */
	columnSettingReset: function (tableName, column) {
		return new Promise((resolve) => {
			//這裡為了演示使用了session和setTimeout演示，開發時應用資料請求
			setTimeout(()=>{
				tool.session.remove(tableName)
				resolve(column)
			},1000)
		})
	}
}
