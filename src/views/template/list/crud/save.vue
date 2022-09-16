<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" placeholder="請輸入姓名" clearable></el-input>
			</el-form-item>
			<el-form-item label="性別" prop="sex">
				<el-radio-group v-model="form.sex">
					<el-radio label="男">男</el-radio>
					<el-radio label="女">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="郵箱" prop="email">
				<el-input v-model="form.email" placeholder="請輸入郵箱" clearable></el-input>
			</el-form-item>
			<el-form-item label="評分" prop="num">
				<el-input-number v-model="form.num" :min="0" style="width: 100%;"></el-input-number>
			</el-form-item>
			<el-form-item label="狀態" prop="boolean">
				<el-switch v-model="form.boolean"></el-switch>
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
					name: "",
					sex: "男",
					email: "",
					num: 0,
					boolean: true
				},
				//驗證規則
				rules: {
					name: [
						{required: true, message: '請輸入姓名'}
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

		},
		methods: {
			//顯示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this
			},
			//表單提交方法
			async submit(){
				var valid = await this.$refs.dialogForm.validate().catch(() => {})
				if(!valid){
					return false
				}
				this.isSaveing = true;
				var res = await this.$API.demo.post.post(this.form);
				this.isSaveing = false;
				if(res.code == 200){
					if(this.mode=='add'){
						this.form.id = res.data
					}
					this.$emit('success', this.form, this.mode)
					this.visible = false;
					this.$message.success("操作成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//表單注入資料
			setData(data){
				this.form.id = data.id
				this.form.name = data.name
				this.form.sex = data.sex
				this.form.email = data.email
				this.form.num = data.num
				this.form.boolean = data.boolean

				//可以和上面一樣單個注入，也可以像下面一樣直接合併進去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
