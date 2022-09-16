export default {
	//運算符
	operator: [
		{
			label: '等於',
			value: '=',
		},
		{
			label: '不等於',
			value: '!=',
		},
		{
			label: '大於',
			value: '>',
		},
		{
			label: '大於等於',
			value: '>=',
		},
		{
			label: '小於',
			value: '<',
		},
		{
			label: '小於等於',
			value: '<=',
		},
		{
			label: '包含',
			value: 'include',
		},
		{
			label: '不包含',
			value: 'notinclude',
		}
	],
	//過濾結果運算符的分隔符
	separator: '|',
	//獲取我的常用
	getMy: function (name) {
		return new Promise((resolve) => {
			console.log(`這裡可以根據${name}參數請求接口`)
			var list = []
			setTimeout(()=>{
				resolve(list)
			},500)
		})
	},
	/**
	 * 常用保存處理 返回resolve後繼續操作
	 * @name scFilterBar組件的props->filterName
	 * @obj 過濾項整理好的對象
	 */
	saveMy: function (name, obj) {
		return new Promise((resolve) => {
			console.log(name, obj)
			setTimeout(()=>{
				resolve(true)
			},500)
		})
	},
	/**
	 * 常用刪除處理 返回resolve後繼續操作
	 * @name scFilterBar組件的props->filterName
	 */
	delMy: function (name) {
		return new Promise((resolve) => {
			console.log(name)
			setTimeout(()=>{
				resolve(true)
			},500)
		})
	}
}
