<template>
	<el-main>
		<el-card shadow="never" header="過濾器">
			<scFilterBar filterName="filterName" :options="options" @filterChange="change">
				<template #default="{filterLength, openFilter}">
					<el-badge :value="filterLength" type="danger" :hidden="filterLength<=0">
						<el-button icon="el-icon-filter" @click="openFilter"></el-button>
					</el-badge>
				</template>
			</scFilterBar>
		</el-card>
		<el-alert title="SCUI 獨創的過濾條Filterbar,可配置不同類型的過濾字段,以及異步獲取資料,在@/config/filterBar.js中可以更改運算符以及其他配置,操作上方過濾條查看下方change事件的回調,在表格查詢的場景下非常合適" type="success" style="margin:20px 0;"></el-alert>
		<el-card shadow="never" header="返回值">
			<pre>{{ filterData }}</pre>
		</el-card>
	</el-main>
</template>

<script>
	import scFilterBar from '@/components/scFilterBar';

	export default {
		name: 'filterBar',
		components: {
			scFilterBar
		},
		data() {
			return {
				filterData : {},
				defaultFilter : [],
				options: [
					{
						label: '訂單號',
						value: 'id',
						type: 'text',
						selected: true,
						placeholder: '請輸入訂單號'
					},
					{
						label: '類型',
						value: 'type',
						type: 'select',
						operator: '=',
						selected: true,
						placeholder: '請選擇類型',
						extend: {
							data:[
								{
									label: "選項1",
									value: "1"
								},
								{
									label: "選項2",
									value: "2"
								}
							]
						}
					},
					{
						label: '類型(多選)',
						value: 'type2',
						type: 'select',
						operator: '=',
						placeholder: '請選擇類型',
						extend: {
							multiple: true,
							data:[
								{
									label: "選項1",
									value: "1"
								},
								{
									label: "選項2",
									value: "2"
								}
							]
						}
					},
					{
						label: '通知(異步)',
						value: 'noticeType',
						type: 'select',
						operator: '=',
						placeholder: '請選擇通知類型',
						extend: {
							request: async () => {
								var list = await this.$API.system.dic.get.get()
								return list.data.map(item => {
									return {
										label: item.label,
										value: item.value
									}
								})
							}
						}
					},
					{
						label: '通知(遠程搜索)',
						value: 'noticeType2',
						type: 'select',
						operator: '=',
						placeholder: '請輸入關鍵詞後檢索',
						extend: {
							remote: true,
							request: async (query) => {
								var data = {
									keyword: query,
								}
								var list = await this.$API.system.dic.get.get(data)
								return list.data.map(item => {
									return {
										label: item.label,
										value: item.value
									}
								})
							}
						}
					},
					{
						label: '關鍵詞(標籤)',
						value: 'tags',
						type: 'tags',
						operator: 'include',
						operators: [
							{
								label: '包含',
								value: 'include',
							},
							{
								label: '不包含',
								value: 'notinclude',
							}
						]
					},
					{
						label: '開關',
						value: 'switch',
						type: 'switch',
						operator: '='
					},
					{
						label: '日期單選',
						value: 'date',
						type: 'date',
						operator: '=',
						operators: [
							{
								label: '等於',
								value: '=',
							},
							{
								label: '不等於',
								value: '!=',
							}
						]
					},
					{
						label: '日期範圍',
						value: 'date2',
						type: 'daterange'
					}
				]
			}
		},
		methods: {
			change(data){
				this.filterData = data;
			}
		}
	}
</script>

<style>
</style>
