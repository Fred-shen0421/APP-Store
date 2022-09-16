<!--
 * @Descripttion: 過濾器V2
 * @version: 2.5
 * @Author: sakuya
 * @Date: 2021年7月30日14:48:41
 * @LastEditors: sakuya
 * @LastEditTime: 2022年5月13日21:15:44
-->

<template>
	<div class="sc-filterBar">
		<slot :filterLength="filterObjLength" :openFilter="openFilter">
			<el-badge :value="filterObjLength" type="danger" :hidden="filterObjLength<=0">
				<el-button icon="el-icon-filter" @click="openFilter"></el-button>
			</el-badge>
		</slot>

		<el-drawer title="過濾器" v-model="drawer" :size="650" append-to-body>
			<el-container v-loading="saveLoading">
				<el-main style="padding:0">
					<el-tabs class="root">
						<el-tab-pane lazy>
							<template #label>
								<div class="tabs-label">過濾項</div>
							</template>
							<el-scrollbar>
								<div class="sc-filter-main">
									<h2>設置過濾條件</h2>
									<div v-if="filter.length<=0"  class="nodata">
										沒有默認過濾條件，請點擊增加過濾項
									</div>
									<table v-else>
										<colgroup>
											<col width="50">
											<col width="140">
											<col v-if="showOperator" width="120">
											<col>
											<col width="40">
										</colgroup>
										<tr v-for="(item,index) in filter" :key="index">
											<td>
												<el-tag>{{index+1}}</el-tag>
											</td>
											<td>
												<py-select v-model="item.field" :options="fields" placeholder="過濾字段" filterable @change="fieldChange(item)">
												</py-select>
											</td>
											<td v-if="showOperator">
												<el-select v-model="item.operator" placeholder="運算符">
													<el-option v-for="ope in item.field.operators || operator" :key="ope.value" :label="ope.label" :value="ope.value"></el-option>
												</el-select>
											</td>
											<td>
												<el-input v-if="!item.field.type" v-model="item.value" placeholder="請選擇過濾字段" disabled></el-input>
												<!-- 輸入框 -->
												<el-input v-if="item.field.type=='text'" v-model="item.value" :placeholder="item.field.placeholder||'請輸入'"></el-input>
												<!-- 下拉框 -->
												<el-select v-if="item.field.type=='select'" v-model="item.value" :placeholder="item.field.placeholder||'請選擇'" filterable :multiple="item.field.extend.multiple" :loading="item.selectLoading" @visible-change="visibleChange($event, item)" :remote="item.field.extend.remote" :remote-method="(query)=>{remoteMethod(query, item)}">
													<el-option v-for="field in item.field.extend.data" :key="field.value" :label="field.label" :value="field.value"></el-option>
												</el-select>
												<!-- 日期 -->
												<el-date-picker v-if="item.field.type=='date'" v-model="item.value" type="date" value-format="YYYY-MM-DD" :placeholder="item.field.placeholder||'請選擇日期'" style="width: 100%;"></el-date-picker>
												<!-- 日期範圍 -->
												<el-date-picker v-if="item.field.type=='daterange'" v-model="item.value" type="daterange" value-format="YYYY-MM-DD"  start-placeholder="開始日期" end-placeholder="結束日期" style="width: 100%;"></el-date-picker>
												<!-- 日期時間 -->
												<el-date-picker v-if="item.field.type=='datetime'" v-model="item.value" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" :placeholder="item.field.placeholder||'請選擇日期'" style="width: 100%;"></el-date-picker>
												<!-- 日期時間範圍 -->
												<el-date-picker v-if="item.field.type=='datetimerange'" v-model="item.value" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="開始日期" end-placeholder="結束日期" style="width: 100%;"></el-date-picker>
												<!-- 開關 -->
												<el-switch v-if="item.field.type=='switch'" v-model="item.value" active-value="1" inactive-value="0"></el-switch>
												<!-- 標籤 -->
												<el-select v-if="item.field.type=='tags'" v-model="item.value" multiple filterable allow-create default-first-option no-data-text="輸入關鍵詞後按回車確認" :placeholder="item.field.placeholder||'請輸入'"></el-select>
											</td>
											<td>
												<el-icon class="del" @click="delFilter(index)"><el-icon-delete /></el-icon>
											</td>
										</tr>
									</table>
									<el-button type="primary" text icon="el-icon-plus" @click="addFilter">增加過濾項</el-button>
								</div>
							</el-scrollbar>
						</el-tab-pane>
						<el-tab-pane lazy>
							<template #label>
								<div class="tabs-label">常用</div>
							</template>
							<el-scrollbar>
								<my ref="my" :data="myFilter" :filterName="filterName" @selectMyfilter="selectMyfilter"></my>
							</el-scrollbar>
						</el-tab-pane>
					</el-tabs>
				</el-main>
				<el-footer>
					<el-button type="primary" @click="ok" :disabled="filter.length<=0">立即過濾</el-button>
					<el-button type="primary" plain @click="saveMy" :disabled="filter.length<=0">另存為常用</el-button>
					<el-button @click="clear">清空過濾</el-button>
				</el-footer>
			</el-container>
		</el-drawer>
	</div>
</template>

<script>
	import config from "@/config/filterBar"
	import pySelect from './pySelect'
	import my from './my'

	export default {
		name: 'filterBar',
		components: {
			pySelect,
			my
		},
		props: {
			filterName: { type: String, default: "" },
			showOperator: { type: Boolean, default: true },
			options: { type: Object, default: () => {} }
		},
		data() {
			return {
				drawer: false,
				operator: config.operator,
				fields: this.options,
				filter: [],
				myFilter: [],
				filterObjLength: 0,
				saveLoading: false
			}
		},
		computed: {
			filterObj(){
				const obj = {}
				this.filter.forEach((item) => {
					obj[item.field.value] = this.showOperator ? `${item.value}${config.separator}${item.operator}` : `${item.value}`
				})
				return obj
			}
		},
		mounted(){
			//默認顯示的過濾項
			this.fields.forEach((item) => {
				if(item.selected){
					this.filter.push({
						field: item,
						operator: item.operator || 'include',
						value: ''
					})
				}
			})
		},
		methods: {
			//打開過濾器
			openFilter(){
				this.drawer = true
			},
			//增加過濾項
			addFilter(){
				if(this.fields.length<=0){
					this.$message.warning('無過濾項');
					return false
				}
				const filterNum = this.fields[this.filter.length] || this.fields[0]
				this.filter.push({
					field: filterNum,
					operator: filterNum.operator || 'include',
					value: ''
				})
			},
			//刪除過濾項
			delFilter(index){
				this.filter.splice(index, 1)
			},
			//過濾項字段變更事件
			fieldChange(tr){
				let oldType = tr.field.type
				tr.field.type = ''
				this.$nextTick(() => {
					tr.field.type = oldType
				})
				tr.operator = tr.field.operator || 'include'
				tr.value = ''
			},
			//下拉框顯示事件處理異步
			async visibleChange(isopen, item){
				if(isopen && item.field.extend.request && !item.field.extend.remote){
					item.selectLoading = true;
					try {
						var data = await item.field.extend.request()
					}catch (error) {
						console.log(error);
					}
					item.field.extend.data = data;
					item.selectLoading = false;
				}
			},
			//下拉框顯示事件處理異步搜索
			async remoteMethod(query, item){
				if(query !== ''){
					item.selectLoading = true;
					try {
					var data = await item.field.extend.request(query);
					}catch (error) {
						console.log(error);
					}
					item.field.extend.data = data;
					item.selectLoading = false;
				}else{
					item.field.extend.data = [];
				}
			},
			//選擇常用過濾
			selectMyfilter(item){
				//常用過濾回顯目前過濾項
				this.filter = []
				this.fields.forEach((field) => {
					var filterValue = item.filterObj[field.value]
					if(filterValue){
						var operator = filterValue.split("|")[1]
						var value = filterValue.split("|")[0]
						if(field.type=='select' && field.extend.multiple){
							value = value.split(",")
						}else if(field.type=='daterange'){
							value = value.split(",")
						}
						this.filter.push({
							field: field,
							operator: operator,
							value:  value
						})
					}
				})
				this.filterObjLength = Object.keys(item.filterObj).length
				this.$emit('filterChange',item.filterObj)
				this.drawer = false
			},
			//立即過濾
			ok(){
				this.filterObjLength = this.filter.length
				this.$emit('filterChange',this.filterObj)
				this.drawer = false
			},
			//保存常用
			saveMy(){
				this.$prompt('常用過濾名稱', '另存為常用', {
					inputPlaceholder: '請輸入識別度較高的常用過濾名稱',
					inputPattern: /\S/,
					inputErrorMessage: '名稱不能為空'
				})
				.then(async ({ value }) => {
					this.saveLoading = true
					const saveObj = {
						title: value,
						filterObj: this.filterObj
					}
					try {
						var save = await config.saveMy(this.filterName, saveObj)
					}catch (error) {
						this.saveLoading = false
						console.log(error);
						return false
					}
					if(!save){
						return false
					}

					this.myFilter.push(saveObj)
					this.$message.success(`${this.filterName} 保存常用成功`)
					this.saveLoading = false
				})
				.catch(() => {
					//
				})
			},
			//清空過濾
			clear(){
				this.filter = []
				this.filterObjLength = 0
				this.$emit('filterChange',this.filterObj)
			}
		}
	}
</script>

<style scoped>
	.tabs-label {padding:0 20px;}

	.nodata {height:46px;line-height: 46px;margin:15px 0;border: 1px dashed #e6e6e6;color: #999;text-align: center;border-radius: 3px;}

	.sc-filter-main {padding:20px;border-bottom: 1px solid #e6e6e6;background: #fff;}
	.sc-filter-main h2 {font-size: 12px;color: #999;font-weight: normal;}
	.sc-filter-main table {width: 100%;margin: 15px 0;}
	.sc-filter-main table tr {}
	.sc-filter-main table td {padding:5px 10px 5px 0;}
	.sc-filter-main table td:deep(.el-input .el-input__inner)  {vertical-align: top;}
	.sc-filter-main table td .el-select {display: block;}
	.sc-filter-main table td .el-date-editor.el-input {display: block;width: 100%;}
	.sc-filter-main table td .del {background: #fff;color: #999;width: 32px;height: 32px;line-height: 32px;text-align: center;border-radius:50%;font-size: 12px;cursor: pointer;}
	.sc-filter-main table td .del:hover {background: #F56C6C;color: #fff;}

	.root {display: flex;height: 100%;flex-direction: column}
	.root:deep(.el-tabs__header) {margin: 0;}
	.root:deep(.el-tabs__content) {flex: 1;background: #f6f8f9;}
	.root:deep(.el-tabs__content) .el-tab-pane{overflow: auto;height:100%;}

	.dark .root:deep(.el-tabs__content) {background: var(--el-bg-color-overlay);}
	.dark .sc-filter-main {background: var(--el-bg-color);border-color:var(--el-border-color-light);}
	.dark .sc-filter-main table td .del {background: none;}
	.dark .sc-filter-main table td .del:hover {background: #F56C6C;}
	.dark .nodata {border-color:var(--el-border-color-light);}
</style>
