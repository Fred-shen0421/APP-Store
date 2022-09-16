<template>
	<el-container>
		<el-header class="header-tabs">
			<el-tabs type="card" v-model="groupId" @tab-change="tabChange">
				<el-tab-pane label="所有" name="0"></el-tab-pane>
				<el-tab-pane label="未完成" name="1"></el-tab-pane>
				<el-tab-pane label="已退回" name="2"></el-tab-pane>
				<el-tab-pane label="已關閉" name="3"></el-tab-pane>
				<el-tab-pane label="已完成" name="4"></el-tab-pane>
			</el-tabs>
		</el-header>
		<el-header style="height: auto;">
			<sc-select-filter :data="filterData" :label-width="80" @on-change="filterChange"></sc-select-filter>
		</el-header>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus"></el-button>
				<el-button type="danger" plain icon="el-icon-delete"></el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.keyword" placeholder="關鍵詞" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="list.apiObj" row-key="id" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="姓名" prop="name" width="150"></el-table-column>
				<el-table-column label="性別" prop="sex" width="150"></el-table-column>
				<el-table-column label="郵箱" prop="email" width="250"></el-table-column>
				<el-table-column label="評分" prop="num" width="150"></el-table-column>
				<el-table-column label="註冊時間" prop="datetime" width="150" sortable></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="160">
					<template #default>
						<el-button-group>
							<el-button text type="primary" size="small">查看</el-button>
							<el-button text type="primary" size="small">編輯</el-button>
							<el-button text type="primary" size="small">刪除</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>
</template>

<script>
	import scSelectFilter from '@/components/scSelectFilter'

	export default {
		name: 'listTab',
		components: {
			scSelectFilter
		},
		data() {
			return {
				groupId: "0",
				filterData: [
					{
						title: "所屬行業",
						key: "type",
						multiple: true,
						options: [
							{
								label: "全部",
								value: ""
							},
							{
								label: "汽車",
								value: "1"
							},
							{
								label: "醫療",
								value: "2"
							},
							{
								label: "節能環保",
								value: "3"
							},
							{
								label: "人工智慧",
								value: "4"
							},
							{
								label: "文化旅遊",
								value: "5"
							},
							{
								label: "新能源",
								value: "6"
							},
							{
								label: "高端設備",
								value: "7"
							},
							{
								label: "其他行業",
								value: "99"
							}
						]
					},
					{
						title: "所屬區域",
						key: "area",
						options: [
							{
								label: "全部",
								value: ""
							},
							{
								label: "台北市",
								value: "TPE"
							},
							{
								label: "新北市",
								value: "NTPC"
							},
							{
								label: "桃園市",
								value: "TYN"
							},
							{
								label: "台中市",
								value: "TXG"
							},
							{
								label: "台南市",
								value: "TNN"
							},
							{
								label: "高雄市",
								value: "KHH"
							}
						]
					}
				],
				list: {
					apiObj: this.$API.demo.list
				},
				search: {
					keyword: ""
				}
			}
		},
		methods: {
			//搜索
			upsearch(){
				this.$refs.table.upData(this.search)
			},
			//標籤切換
			tabChange(name){
				var params = {
					groupId: name
				}
				this.$refs.table.reload(params)
			},
			filterChange(data){
				this.$refs.table.upData(data)
			}
		}
	}
</script>

<style>
</style>
