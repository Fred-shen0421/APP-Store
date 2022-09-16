<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="330" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
			<el-form-item label="編碼" prop="code">
				<el-input v-model="form.code" clearable placeholder="字典編碼"></el-input>
			</el-form-item>
			<el-form-item label="字典名稱" prop="name">
				<el-input v-model="form.name" clearable placeholder="字典顯示名稱"></el-input>
			</el-form-item>
			<el-form-item label="父路徑" prop="parentId">
				<el-cascader v-model="form.parentId" :options="dic" :props="dicProps" :show-all-levels="false" clearable></el-cascader>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
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
					add: '新增字典',
					edit: '編輯字典'
				},
				visible: false,
				isSaveing: false,
				form: {
					id:"",
					name: "",
					code: "",
					parentId: ""
				},
				rules: {
					code: [
						{required: true, message: '請輸入編碼'}
					],
					name: [
						{required: true, message: '請輸入字典名稱'}
					]
				},
				dic: [],
				dicProps: {
					value: "id",
					label: "name",
					emitPath: false,
					checkStrictly: true
				}
			}
		},
		mounted() {
			this.getDic()
		},
		methods: {
			//顯示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this;
			},
			//獲取字典列表
			async getDic(){
				var res = await this.$API.system.dic.tree.get();
				this.dic = res.data;
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
				this.form.name = data.name
				this.form.code = data.code
				this.form.parentId = data.parentId

				//可以和上面一樣單個注入，也可以像下面一樣直接合併進去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
