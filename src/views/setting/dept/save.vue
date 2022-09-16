<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px">
			<el-form-item label="上級部門" prop="parentId">
				<el-cascader v-model="form.parentId" :options="groups" :props="groupsProps" :show-all-levels="false" clearable style="width: 100%;"></el-cascader>
			</el-form-item>
			<el-form-item label="部門名稱" prop="label">
				<el-input v-model="form.label" placeholder="請輸入部門名稱" clearable></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="form.sort" controls-position="right" :min="1" style="width: 100%;"></el-input-number>
			</el-form-item>
			<el-form-item label="是否有效" prop="status">
				<el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
			</el-form-item>
			<el-form-item label="備註" prop="remark">
				<el-input v-model="form.remark" clearable type="textarea"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button v-if="mode!='show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				mode: "add",
				titleMap: {
					add: '新增',
					edit: '編輯',
					show: '查看'
				},
				visible: false,
				isSaveing: false,
				//表單資料
				form: {
					id:"",
					parentId: "",
					label: "",
					sort: 1,
					status: "1",
					remark: ""
				},
				//驗證規則
				rules: {
					sort: [
						{required: true, message: '請輸入排序', trigger: 'change'}
					],
					label: [
						{required: true, message: '請輸入部門名稱'}
					]
				},
				//所需資料選項
				groups: [],
				groupsProps: {
					value: "id",
					emitPath: false,
					checkStrictly: true
				}
			}
		},
		mounted() {
			this.getGroup()
		},
		methods: {
			//顯示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this
			},
			//加載樹資料
			async getGroup(){
				var res = await this.$API.system.dept.list.get();
				this.groups = res.data;
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
				this.form.id = data.id
				this.form.label = data.label
				this.form.status = data.status
				this.form.sort = data.sort
				this.form.parentId = data.parentId
				this.form.remark = data.remark

				//可以和上面一樣單個注入，也可以像下面一樣直接合併進去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
