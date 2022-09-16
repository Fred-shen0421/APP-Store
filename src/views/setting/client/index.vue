<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="應用ID" prop="appId" width="150"></el-table-column>
				<el-table-column label="應用名稱" prop="appName" width="250"></el-table-column>
				<el-table-column label="狀態" width="50">
					<template #default>
						<el-icon style="color: #67C23A;"><el-icon-circle-check-filled /></el-icon>
					</template>
				</el-table-column>
				<el-table-column label="秘鑰" prop="secret" show-overflow-tooltip width="150"></el-table-column>
				<el-table-column label="授權到期" prop="exp" width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="120">
					<template #default="scope">
						<el-button-group>
							<el-button text type="primary" size="small" @click="table_edit(scope.row, scope.$index)">編輯</el-button>
							<el-popconfirm title="確定刪除嗎？" @confirm="table_del(scope.row, scope.$index)">
								<template #reference>
									<el-button text type="primary" size="small">刪除</el-button>
								</template>
							</el-popconfirm>
						</el-button-group>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSuccess" @closed="dialog.save=false"></save-dialog>

</template>

<script>
	import saveDialog from './save'

	export default {
		name: "client",
		components: {
			saveDialog
		},
		data(){
			return {
				dialog: {
					save: false
				},
				apiObj: this.$API.system.app.list,
				selection: []
			}
		},
		methods: {
			//增加
			add(){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open()
				})
			},
			//編輯
			table_edit(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('edit').setData(row)
				})
			},
			//刪除
			async table_del(row, index){
				var reqData = {id: row.id}
				var res = await this.$API.user.del.post(reqData);
				if(res.code == 200){
					//這裡選擇刷新整個表格 OR 插入/編輯現有表格資料
					this.$refs.table.tableData.splice(index, 1);
					this.$message.success("刪除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//批量刪除
			async batch_del(){
				this.$confirm(`確定刪除選中的 ${this.selection.length} 項嗎？`, '提示', {
					type: 'warning'
				}).then(() => {
					const loading = this.$loading();
					this.selection.forEach(item => {
						this.$refs.table.tableData.forEach((itemI, indexI) => {
							if (item.id === itemI.id) {
								this.$refs.table.tableData.splice(indexI, 1)
							}
						})
					})
					loading.close();
					this.$message.success("操作成功")
				}).catch(() => {

				})
			},
			//表格選擇後回調事件
			selectionChange(selection){
				this.selection = selection;
			},
			//本地更新資料
			handleSuccess(data, mode){
				if(mode=='add'){
					data.id = new Date().getTime()
					this.$refs.table.tableData.unshift(data)
				}else if(mode=='edit'){
					this.$refs.table.tableData.filter(item => item.id===data.id ).forEach(item => {
						Object.assign(item, data)
					})
				}
			}
		}
	}
</script>

<style>
</style>
