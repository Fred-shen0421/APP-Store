<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.keyword" placeholder="部門名稱" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" hidePagination>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="部門名稱" prop="label" width="250"></el-table-column>
				<el-table-column label="排序" prop="sort" width="150"></el-table-column>
				<el-table-column label="狀態" prop="status" width="150">
					<template #default="scope">
						<el-tag v-if="scope.row.status==1" type="success">啟用</el-tag>
						<el-tag v-if="scope.row.status==0" type="danger">停用</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="創建時間" prop="date" width="180"></el-table-column>
				<el-table-column label="備註" prop="remark" min-width="300"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="170">
					<template #default="scope">
						<el-button-group>
							<el-button text type="primary" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
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

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>

</template>

<script>
	import saveDialog from './save'

	export default {
		name: 'dept',
		components: {
			saveDialog
		},
		data() {
			return {
				dialog: {
					save: false
				},
				apiObj: this.$API.system.dept.list,
				selection: [],
				search: {
					keyword: null
				}
			}
		},
		methods: {
			//添加
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
			//查看
			table_show(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('show').setData(row)
				})
			},
			//刪除
			async table_del(row){
				var reqData = {id: row.id}
				var res = await this.$API.demo.post.post(reqData);
				if(res.code == 200){
					this.$refs.table.refresh()
					this.$message.success("刪除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//批量刪除
			async batch_del(){
				this.$confirm(`確定刪除選中的 ${this.selection.length} 項嗎？如果刪除項中含有子集將會被一併刪除`, '提示', {
					type: 'warning'
				}).then(() => {
					const loading = this.$loading();
					this.$refs.table.refresh()
					loading.close();
					this.$message.success("操作成功")
				}).catch(() => {

				})
			},
			//表格選擇後回調事件
			selectionChange(selection){
				this.selection = selection;
			},
			//搜索
			upsearch(){

			},
			//根據ID獲取樹結構
			filterTree(id){
				var target = null;
				function filter(tree){
					tree.forEach(item => {
						if(item.id == id){
							target = item
						}
						if(item.children){
							filter(item.children)
						}
					})
				}
				filter(this.$refs.table.tableData)
				return target
			},
			//本地更新資料
			handleSaveSuccess(data, mode){
				if(mode=='add'){
					this.$refs.table.refresh()
				}else if(mode=='edit'){
					this.$refs.table.refresh()
				}
			}
		}
	}
</script>

<style>
</style>
