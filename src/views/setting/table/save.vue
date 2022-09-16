<template>
	<el-drawer :title="titleMap[mode]" v-model="visible" :size="1000" destroy-on-close @closed="$emit('closed')">
		<el-container v-loading="loading">
			<el-main style="padding:0 20px 20px 20px">

				<el-form ref="dialogForm" :model="form" :rules="rules" label-width="100px" label-position="top">
					<sc-title title="基礎"></sc-title>
					<el-row :gutter="20">
						<el-col :span="16">
							<el-form-item label="表格名稱" prop="name">
								<el-input v-model="form.name" placeholder="請輸入中文描述標題"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="標識" prop="code">
								<el-input v-model="form.code" placeholder="請輸入唯一標識"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item>
						<el-checkbox v-model="form.remoteSort" label="遠程排序"></el-checkbox>
						<el-checkbox v-model="form.remoteFilter" label="遠程過濾"></el-checkbox>
					</el-form-item>
					<sc-title title="表格列"></sc-title>
					<el-form-item prop="column">
						<sc-form-table v-model="form.column" :addTemplate="addTemplate" drag-sort placeholder="暫無資料">
							<el-table-column prop="label" label="名稱">
								<template #default="scope">
									<el-input v-model="scope.row.label" placeholder="請輸入名稱"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="prop" label="字段" width="150">
								<template #default="scope">
									<el-input v-model="scope.row.prop" placeholder="請輸入字段"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="width" label="寬度" width="100">
								<template #default="scope">
									<el-input v-model="scope.row.width" placeholder="請輸入寬度"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="hide" label="隱藏" width="80" align="center">
								<template #default="scope">
									<el-checkbox v-model="scope.row.hide"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column prop="sortable" label="排序" width="80" align="center">
								<template #default="scope">
									<el-checkbox v-model="scope.row.sortable"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column prop="filters" label="過濾項" width="90" align="center">
								<template #default="scope">
									<el-button text size="small" :type="scope.row.filters.length==0?'':'primary'" @click="setFilters(scope.row.filters)">過濾項</el-button>
								</template>
							</el-table-column>
							<el-table-column prop="fixed" label="固定" width="80" align="center">
								<template #default="scope">
									<el-checkbox v-model="scope.row.fixed"></el-checkbox>
								</template>
							</el-table-column>
						</sc-form-table>
					</el-form-item>
				</el-form>
			</el-main>
			<el-footer>
				<el-button type="primary" :loading="isSaveing" @click="submit">保存</el-button>
				<el-button @click="visible=false">取消</el-button>
			</el-footer>
		</el-container>

		<el-drawer title="過濾項配置" v-model="setFiltersVisible" :size="500" destroy-on-close>
			<el-main style="padding:0 20px 20px 20px">
				<sc-form-table v-model="selectionFilters" :addTemplate="filtersAddTemplate" drag-sort placeholder="暫無資料">
					<el-table-column prop="text" label="名稱">
						<template #default="scope">
							<el-input v-model="scope.row.text" placeholder="請輸入名稱"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="value" label="值" width="150">
						<template #default="scope">
							<el-input v-model="scope.row.value" placeholder="請輸入值"></el-input>
						</template>
					</el-table-column>
				</sc-form-table>
			</el-main>
		</el-drawer>


	</el-drawer>
</template>

<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				loading: false,
				mode: "add",
				titleMap: {
					add: '新增',
					edit: '編輯'
				},
				form: {},
				rules: {
					name: [
						{required: true, message: '請輸入表格名稱', trigger: 'blur'}
					],
					code: [
						{required: true, message: '請輸入唯一標識', trigger: 'blur'}
					]
				},
				addTemplate: {
					label: '',
					prop: '',
					width: '100',
					hide: false,
					sortable: false,
					fixed: false,
					filters: []
				},
				visible: false,
				isSaveing: false,
				selectionFilters: [],
				filtersAddTemplate: {
					text: '',
					value: ''
				},
				setFiltersVisible: false
			}
		},
		mounted() {

		},
		methods: {
			//顯示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this;
			},
			//表單提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true;
						var res = await this.$API.demo.post.post(this.form);
						this.isSaveing = false;
						if(res.code == 200){
							this.$emit('success', this.form, this.mode)
							this.visible = false;
							this.$message.success("操作成功")
						}else{
							this.$alert(res.message, "提示", {type: 'error'})
						}
					}
				})
			},
			//表單注入資料
			setData(data){
				this.loading = true
				const params = {
					id: data.id
				}
				setTimeout(async ()=>{
					var res = await this.$API.system.table.info.get(params)
					this.loading = false
					this.form = res.data
				},400)

			},
			//設置過濾項
			setFilters(filters){
				this.selectionFilters = filters
				this.setFiltersVisible = true
			}
		}
	}
</script>

<style>
</style>
