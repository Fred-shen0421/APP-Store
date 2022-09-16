<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="400" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="所屬字典" prop="dic">
				<el-cascader v-model="form.dic" :options="dic" :props="dicProps" :show-all-levels="false" clearable></el-cascader>
			</el-form-item>
			<el-form-item label="項名稱" prop="name">
				<el-input v-model="form.name" clearable></el-input>
			</el-form-item>
			<el-form-item label="鍵值" prop="key">
				<el-input v-model="form.key" clearable></el-input>
			</el-form-item>
			<el-form-item label="是否有效" prop="yx">
				<el-switch v-model="form.yx" active-value="1" inactive-value="0"></el-switch>
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
					add: '新增項',
					edit: '編輯項'
				},
				visible: false,
				isSaveing: false,
				form: {
					id: "",
					dic: "",
					name: "",
					key: "",
					yx: "1"
				},
				rules: {
					dic: [
						{required: true, message: '請選擇所屬字典'}
					],
					name: [
						{required: true, message: '請輸入項名稱'}
					],
					key: [
						{required: true, message: '請輸入鍵值'}
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
			if(this.params){
				this.form.dic = this.params.code
			}
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
				this.form.key = data.key
				this.form.yx = data.yx
				this.form.dic = data.dic
			}
		}
	}
</script>

<style>
</style>
