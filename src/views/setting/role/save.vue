<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="角色名稱" prop="label">
				<el-input v-model="form.label" clearable></el-input>
			</el-form-item>
			<el-form-item label="角色別名" prop="alias">
				<el-input v-model="form.alias" clearable></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="form.sort" controls-position="right" :min="1" style="width: 100%;"></el-input-number>
			</el-form-item>
			<el-form-item label="是否有效" prop="status">
				<el-switch v-model="form.status" active-value="1" inactive-value="0"></el-switch>
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
					label: "",
					alias: "",
					sort: 1,
					status: 1,
					remark: ""
				},
				//驗證規則
				rules: {
					sort: [
						{required: true, message: '請輸入排序', trigger: 'change'}
					],
					label: [
						{required: true, message: '請輸入角色名稱'}
					],
					alias: [
						{required: true, message: '請輸入角色別名'}
					]
				}
			}
		},
		mounted() {

		},
		methods: {
			//顯示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this
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
				this.form.alias = data.alias
				this.form.sort = data.sort
				this.form.status = data.status
				this.form.remark = data.remark

				//可以和上面一樣單個注入，也可以像下面一樣直接合併進去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
