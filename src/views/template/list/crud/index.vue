<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button type="primary" icon="el-icon-plus" @click="addPage">頁面新增</el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="list.apiObj" row-key="id" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="姓名" prop="name" width="180"></el-table-column>
				<el-table-column label="性別" prop="sex" width="150"></el-table-column>
				<el-table-column label="郵箱" prop="email" width="250"></el-table-column>
				<el-table-column label="狀態" prop="boolean" width="60">
					<template #default="scope">
						<sc-status-indicator v-if="scope.row.boolean" type="success"></sc-status-indicator>
						<sc-status-indicator v-if="!scope.row.boolean" pulse type="danger"></sc-status-indicator>
					</template>
				</el-table-column>
				<el-table-column label="評分" prop="num" width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="300">
					<template #default="scope">
						<el-button plain size="small" @click="table_show(scope.row)">查看</el-button>
						<el-button type="primary" plain size="small" @click="table_edit(scope.row)">編輯</el-button>
						<el-button type="primary" plain size="small" @click="table_edit_page(scope.row)">頁面編輯</el-button>
						<el-popconfirm title="確定刪除嗎？" @confirm="table_del(scope.row, scope.$index)">
							<template #reference>
								<el-button plain type="danger" size="small">刪除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>

	<el-drawer v-model="dialog.info" :size="800" title="詳細" custom-class="drawerBG" direction="rtl" destroy-on-close>
		<info ref="infoDialog"></info>
	</el-drawer>

</template>

<script>
	import saveDialog from './save'
	import info from './info'

	export default {
		name: 'listCrud',
		components: {
			saveDialog,
			info
		},
		data() {
			return {
				dialog:{
					save: false,
					info: false
				},
				list: {
					apiObj: this.$API.demo.list
				},
				selection: []
			}
		},
		mounted() {

		},
		methods: {
			//窗口新增
			add(){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open()
				})
			},
			//窗口編輯
			table_edit(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('edit').setData(row)
				})
			},
			//頁面新增
			addPage(){
				this.$router.push({
					path: '/template/list/crud/detail',
				})
			},
			//頁面編輯
			table_edit_page(row){
				this.$router.push({
					path: '/template/list/crud/detail',
					query: {
						id: row.id
					}
				})
			},
			//查看
			table_show(row){
				this.dialog.info = true
				this.$nextTick(() => {
					this.$refs.infoDialog.setData(row)
				})
			},
			//刪除明細
			async table_del(row, index){
				var reqData = {id: row.id}
				var res = await this.$API.demo.post.post(reqData);
				if(res.code == 200){
					this.$refs.table.removeIndex(index)
					this.$message.success("刪除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//批量刪除
			async batch_del(){
				var confirmRes = await this.$confirm(`確定刪除選中的 ${this.selection.length} 項嗎？`, '提示', {
					type: 'warning',
					confirmButtonText: '刪除',
					confirmButtonClass: 'el-button--danger'
				}).catch(() => {})

				if(!confirmRes){
					return false
				}

				var ids = this.selection.map(v => v.id)
				this.$refs.table.removeKeys(ids)
				this.$message.success("操作成功")

			},
			//表格選擇後回調事件
			selectionChange(selection){
				this.selection = selection
			},
			//本地更新資料
			handleSaveSuccess(data, mode){
				//為了減少網絡請求，直接變更表格內存資料
				if(mode=='add'){
					this.$refs.table.unshiftRow(data)
				}else if(mode=='edit'){
					this.$refs.table.updateKey(data)
				}

				//當然也可以暴力的直接刷新表格
				// this.$refs.table.refresh()
			}
		}
	}
</script>

<style>
</style>
