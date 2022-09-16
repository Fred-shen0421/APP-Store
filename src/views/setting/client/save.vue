<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="應用標識" prop="appId">
				<el-input v-model="form.appId" clearable></el-input>
			</el-form-item>
			<el-form-item label="應用名稱" prop="appName">
				<el-input v-model="form.appName" clearable></el-input>
			</el-form-item>
			<el-form-item label="秘鑰" prop="secret">
				<el-input v-model="form.secret" clearable></el-input>
			</el-form-item>
			<el-form-item label="類型範圍" prop="type">
				<el-checkbox-group v-model="form.type">
					<el-checkbox-button label="ALL"></el-checkbox-button>
					<el-checkbox-button label="UPDATA"></el-checkbox-button>
					<el-checkbox-button label="QUERY"></el-checkbox-button>
					<el-checkbox-button label="INSERT"></el-checkbox-button>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="授權至" prop="exp">
				<el-date-picker v-model="form.exp" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="選擇日期時間"></el-date-picker>
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
					add: '新增APP',
					edit: '編輯APP'
				},
				form: {
					id:"",
					appId: "",
					appName: "",
					secret: "",
					type: [],
					exp: ""
				},
				rules: {
					appId:[
						{required: true, message: '請輸入應用標識'}
					],
					appName:[
						{required: true, message: '請輸入應用名稱'}
					],
					secret:[
						{required: true, message: '請輸入秘鑰'}
					],
					type:[
						{required: true, message: '請選擇類型範圍', trigger: 'change'}
					],
					exp:[
						{required: true, message: '請選擇授權到期日期', trigger: 'change'}
					]
				},
				visible: false,
				isSaveing: false
			}
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
				this.form.id = data.id
				this.form.appId = data.appId
				this.form.appName = data.appName
				this.form.secret = data.secret
				this.form.type = data.type
				this.form.exp = data.exp
			}
		}
	}
</script>

<style>
</style>
