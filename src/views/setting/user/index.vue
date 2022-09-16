<template>
	<el-container>
		<el-aside width="200px" v-loading="showGrouploading">
			<el-container>
				<el-header>
					<el-input placeholder="輸入關鍵字進行過濾" v-model="groupFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="group" class="menu" node-key="id" :data="group" :current-node-key="''" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="groupFilterNode" @node-click="groupClick"></el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container>
				<el-header>
					<div class="left-panel">
						<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
						<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
						<el-button type="primary" plain :disabled="selection.length==0">分配角色</el-button>
						<el-button type="primary" plain :disabled="selection.length==0">密碼重置</el-button>
					</div>
					<div class="right-panel">
						<div class="right-panel-search">
							<el-input v-model="search.name" placeholder="登入帳號 / 姓名" clearable></el-input>
							<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
						</div>
					</div>
				</el-header>
				<el-main class="nopadding">
					<scTable ref="table" :apiObj="apiObj" @selection-change="selectionChange" stripe remoteSort remoteFilter>
						<el-table-column type="selection" width="50"></el-table-column>
						<el-table-column label="ID" prop="id" width="80" sortable='custom'></el-table-column>
						<el-table-column label="頭像" width="80" column-key="filterAvatar" :filters="[{text: '已上傳', value: '1'}, {text: '未上傳', value: '0'}]">
							<template #default="scope">
								<el-avatar :src="scope.row.avatar" size="small"></el-avatar>
							</template>
						</el-table-column>
						<el-table-column label="登入帳號" prop="userName" width="150" sortable='custom' column-key="filterUserName" :filters="[{text: '系統帳號', value: '1'}, {text: '普通帳號', value: '0'}]"></el-table-column>
						<el-table-column label="姓名" prop="name" width="150" sortable='custom'></el-table-column>
						<el-table-column label="所屬角色" prop="groupName" width="200" sortable='custom'></el-table-column>
						<el-table-column label="加入時間" prop="date" width="170" sortable='custom'></el-table-column>
						<el-table-column label="操作" fixed="right" align="right" width="160">
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
	</el-container>

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSuccess" @closed="dialog.save=false"></save-dialog>

</template>

<script>
	import saveDialog from './save'

	export default {
		name: 'user',
		components: {
			saveDialog
		},
		data() {
			return {
				dialog: {
					save: false
				},
				showGrouploading: false,
				groupFilterText: '',
				group: [],
				apiObj: this.$API.system.user.list,
				selection: [],
				search: {
					name: null
				}
			}
		},
		watch: {
			groupFilterText(val) {
				this.$refs.group.filter(val);
			}
		},
		mounted() {
			this.getGroup()
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
			async table_del(row, index){
				var reqData = {id: row.id}
				var res = await this.$API.demo.post.post(reqData);
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
			//加載樹資料
			async getGroup(){
				this.showGrouploading = true;
				var res = await this.$API.system.dept.list.get();
				this.showGrouploading = false;
				var allNode ={id: '', label: '所有'}
				res.data.unshift(allNode);
				this.group = res.data;
			},
			//樹過濾
			groupFilterNode(value, data){
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			//樹點擊事件
			groupClick(data){
				var params = {
					groupId: data.id
				}
				this.$refs.table.reload(params)
			},
			//搜索
			upsearch(){
				this.$refs.table.upData(this.search)
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
