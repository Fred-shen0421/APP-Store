<template>
	<el-container>
		<el-aside width="300px" v-loading="showDicloading">
			<el-container>
				<el-header>
					<el-input placeholder="輸入關鍵字進行過濾" v-model="dicFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="dic" class="menu" node-key="id" :data="dicList" :props="dicProps" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="dicFilterNode" @node-click="dicClick">
						<template #default="{node, data}">
							<span class="custom-tree-node">
								<span class="label">{{ node.label }}</span>
								<span class="code">{{ data.code }}</span>
								<span class="do">
									<el-button-group>
										<el-button icon="el-icon-edit" size="small" @click.stop="dicEdit(data)"></el-button>
										<el-button icon="el-icon-delete" size="small" @click.stop="dicDel(node, data)"></el-button>
									</el-button-group>
								</span>
							</span>
						</template>
					</el-tree>
				</el-main>
				<el-footer style="height:51px;">
					<el-button type="primary" size="small" icon="el-icon-plus" style="width: 100%;" @click="addDic">字典分類</el-button>
				</el-footer>
			</el-container>
		</el-aside>
		<el-container class="is-vertical">
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-plus" @click="addInfo"></el-button>
					<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="listApi" row-key="id" :params="listApiParams" @selection-change="selectionChange" stripe :paginationLayout="'prev, pager, next'">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column label="" width="60">
						<template #default>
							<el-tag class="move" style="cursor: move;"><el-icon-d-caret style="width: 1em; height: 1em;"/></el-tag>
						</template>
					</el-table-column>
					<el-table-column label="名稱" prop="name" width="150"></el-table-column>
					<el-table-column label="鍵值" prop="key" width="150"></el-table-column>
					<el-table-column label="是否有效" prop="yx" width="100">
						<template #default="scope">
							<el-switch v-model="scope.row.yx" @change="changeSwitch($event, scope.row)" :loading="scope.row.$switch_yx" active-value="1" inactive-value="0"></el-switch>
						</template>
					</el-table-column>
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
	</el-container>

	<dic-dialog v-if="dialog.dic" ref="dicDialog" @success="handleDicSuccess" @closed="dialog.dic=false"></dic-dialog>

	<list-dialog v-if="dialog.list" ref="listDialog" @success="handleListSuccess" @closed="dialog.list=false"></list-dialog>

</template>

<script>
	import dicDialog from './dic'
	import listDialog from './list'
	import Sortable from 'sortablejs'

	export default {
		name: 'dic',
		components: {
			dicDialog,
			listDialog
		},
		data() {
			return {
				dialog: {
					dic: false,
					info: false
				},
				showDicloading: true,
				dicList: [],
				dicFilterText: '',
				dicProps: {
					label: 'name'
				},
				listApi: null,
				listApiParams: {},
				selection: []
			}
		},
		watch: {
			dicFilterText(val) {
				this.$refs.dic.filter(val);
			}
		},
		mounted() {
			this.getDic()
			this.rowDrop()
		},
		methods: {
			//加載樹資料
			async getDic(){
				var res = await this.$API.system.dic.tree.get();
				this.showDicloading = false;
				this.dicList = res.data;
				//獲取第一個節點,設置選中 & 加載明細列表
				var firstNode = this.dicList[0];
				if(firstNode){
					this.$nextTick(() => {
						this.$refs.dic.setCurrentKey(firstNode.id)
					})
					this.listApiParams = {
						code: firstNode.code
					}
					this.listApi = this.$API.system.dic.list;
				}
			},
			//樹過濾
			dicFilterNode(value, data){
				if (!value) return true;
				var targetText = data.name + data.code;
				return targetText.indexOf(value) !== -1;
			},
			//樹增加
			addDic(){
				this.dialog.dic = true
				this.$nextTick(() => {
					this.$refs.dicDialog.open()
				})
			},
			//編輯樹
			dicEdit(data){
				this.dialog.dic = true
				this.$nextTick(() => {
					var editNode = this.$refs.dic.getNode(data.id);
					var editNodeParentId =  editNode.level==1?undefined:editNode.parent.data.id
					data.parentId = editNodeParentId
					this.$refs.dicDialog.open('edit').setData(data)
				})
			},
			//樹點擊事件
			dicClick(data){
				this.$refs.table.reload({
					code: data.code
				})
			},
			//刪除樹
			dicDel(node, data){
				this.$confirm(`確定刪除 ${data.name} 項嗎？`, '提示', {
					type: 'warning'
				}).then(() => {
					this.showDicloading = true;

					//刪除節點目前是否為高亮 是的話 設置第一個節點高亮
					var dicCurrentKey = this.$refs.dic.getCurrentKey();
					this.$refs.dic.remove(data.id)
					if(dicCurrentKey == data.id){
						var firstNode = this.dicList[0];
						if(firstNode){
							this.$refs.dic.setCurrentKey(firstNode.id);
							this.$refs.table.upData({
								code: firstNode.code
							})
						}else{
							this.listApi = null;
							this.$refs.table.tableData = []
						}
					}

					this.showDicloading = false;
					this.$message.success("操作成功")
				}).catch(() => {

				})
			},
			//行拖拽
			rowDrop(){
				const _this = this
				const tbody = this.$refs.table.$el.querySelector('.el-table__body-wrapper tbody')
				Sortable.create(tbody, {
					handle: ".move",
					animation: 300,
					ghostClass: "ghost",
					onEnd({ newIndex, oldIndex }) {
						const tableData = _this.$refs.table.tableData
						const currRow = tableData.splice(oldIndex, 1)[0]
						tableData.splice(newIndex, 0, currRow)
						_this.$message.success("排序成功")
					}
				})
			},
			//添加明細
			addInfo(){
				this.dialog.list = true
				this.$nextTick(() => {
					var dicCurrentKey = this.$refs.dic.getCurrentKey();
					const data = {
						dic: dicCurrentKey
					}
					this.$refs.listDialog.open().setData(data)
				})
			},
			//編輯明細
			table_edit(row){
				this.dialog.list = true
				this.$nextTick(() => {
					this.$refs.listDialog.open('edit').setData(row)
				})
			},
			//刪除明細
			async table_del(row, index){
				var reqData = {id: row.id}
				var res = await this.$API.demo.post.post(reqData);
				if(res.code == 200){
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
			//提交明細
			saveList(){
				this.$refs.listDialog.submit(async (formData) => {
					this.isListSaveing = true;
					var res = await this.$API.demo.post.post(formData);
					this.isListSaveing = false;
					if(res.code == 200){
						//這裡選擇刷新整個表格 OR 插入/編輯現有表格資料
						this.listDialogVisible = false;
						this.$message.success("操作成功")
					}else{
						this.$alert(res.message, "提示", {type: 'error'})
					}
				})
			},
			//表格選擇後回調事件
			selectionChange(selection){
				this.selection = selection;
			},
			//表格內開關事件
			changeSwitch(val, row){
				//1.還原資料
				row.yx = row.yx == '1'?'0':'1'
				//2.執行加載
				row.$switch_yx = true;
				//3.等待接口返回後改變值
				setTimeout(()=>{
					delete row.$switch_yx;
					row.yx = val;
					this.$message.success(`操作成功id:${row.id} val:${val}`)
				}, 500)
			},
			//本地更新資料
			handleDicSuccess(data, mode){
				if(mode=='add'){
					data.id = new Date().getTime()
					if(this.dicList.length > 0){
						this.$refs.table.upData({
							code: data.code
						})
					}else{
						this.listApiParams = {
							code: data.code
						}
						this.listApi = this.$API.dic.info;
					}
					this.$refs.dic.append(data, data.parentId[0])
					this.$refs.dic.setCurrentKey(data.id)
				}else if(mode=='edit'){
					var editNode = this.$refs.dic.getNode(data.id);
					//判斷是否移動？
					var editNodeParentId =  editNode.level==1?undefined:editNode.parent.data.id
					if(editNodeParentId != data.parentId){
						var obj = editNode.data;
						this.$refs.dic.remove(data.id)
						this.$refs.dic.append(obj, data.parentId[0])
					}
					Object.assign(editNode.data, data)
				}
			},
			//本地更新資料
			handleListSuccess(data, mode){
				if(mode=='add'){
					data.id = new Date().getTime()
					this.$refs.table.tableData.push(data)
				}else if(mode=='edit'){
					this.$refs.table.tableData.filter(item => item.id===data.id ).forEach(item => {
						Object.assign(item, data)
					})
				}
			}
		}
	}
</script>

<style scoped>
	.custom-tree-node {display: flex;flex: 1;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 24px;height:100%;}
	.custom-tree-node .code {font-size: 12px;color: #999;}
	.custom-tree-node .do {display: none;}
	.custom-tree-node:hover .code {display: none;}
	.custom-tree-node:hover .do {display: inline-block;}
</style>
