<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="頭像" prop="avatar">
				<sc-upload v-model="form.avatar" title="上傳頭像"></sc-upload>
			</el-form-item>
			<el-form-item label="登錄帳號" prop="userName">
				<el-input v-model="form.userName" placeholder="用於登錄系統" clearable></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" placeholder="請輸入完整的真實姓名" clearable></el-input>
			</el-form-item>
			<template v-if="mode=='add'">
				<el-form-item label="登錄密碼" prop="password">
					<el-input type="password" v-model="form.password" clearable show-password></el-input>
				</el-form-item>
				<el-form-item label="確認密碼" prop="password2">
					<el-input type="password" v-model="form.password2" clearable show-password></el-input>
				</el-form-item>
			</template>
			<el-form-item label="所屬部門" prop="dept">
				<el-cascader v-model="form.dept" :options="depts" :props="deptsProps" clearable style="width: 100%;"></el-cascader>
			</el-form-item>
			<el-form-item label="所屬角色" prop="group">
				<el-select v-model="form.group" multiple filterable style="width: 100%">
					<el-option v-for="item in groups" :key="item.id" :label="item.label" :value="item.id"/>
				</el-select>
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
					add: '新增用戶',
					edit: '編輯用戶',
					show: '查看'
				},
				visible: false,
				isSaveing: false,
				//表單資料
				form: {
					id:"",
					userName: "",
					avatar: "",
					name: "",
					dept: "",
					group: []
				},
				//驗證規則
				rules: {
					avatar:[
						{required: true, message: '請上傳頭像'}
					],
					userName: [
						{required: true, message: '請輸入登錄帳號'}
					],
					name: [
						{required: true, message: '請輸入真實姓名'}
					],
					password: [
						{required: true, message: '請輸入登錄密碼'},
						{validator: (rule, value, callback) => {
							if (this.form.password2 !== '') {
								this.$refs.dialogForm.validateField('password2')
							}
							callback()
						}}
					],
					password2: [
						{required: true, message: '請再次輸入密碼'},
						{validator: (rule, value, callback) => {
							if (value !== this.form.password) {
								callback(new Error('兩次輸入密碼不一致!'))
							}else{
								callback()
							}
						}}
					],
					dept: [
						{required: true, message: '請選擇所屬部門'}
					],
					group: [
						{required: true, message: '請選擇所屬角色', trigger: 'change'}
					]
				},
				//所需資料選項
				groups: [],
				groupsProps: {
					value: "id",
					multiple: true,
					checkStrictly: true
				},
				depts: [],
				deptsProps: {
					value: "id",
					checkStrictly: true
				}
			}
		},
		mounted() {
			this.getGroup()
			this.getDept()
		},
		methods: {
			//顯示
			open(mode='add'){
				this.mode = mode
				this.visible = true
				return this
			},
			//加載樹資料
			async getGroup(){
				var res = await this.$API.system.role.list.get()
				this.groups = res.data.rows
			},
			async getDept(){
				var res = await this.$API.system.dept.list.get()
				this.depts = res.data
			},
			//表單提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true
						var res = await this.$API.demo.post.post(this.form)
						this.isSaveing = false
						if(res.code == 200){
							this.$emit('success', this.form, this.mode)
							this.visible = false
							this.$message.success("操作成功")
						}else{
							this.$alert(res.message, "提示", {type: 'error'})
						}
					}else{
						return false
					}
				})
			},
			//表單注入資料
			setData(data){
				this.form.id = data.id
				this.form.userName = data.userName
				this.form.avatar = data.avatar
				this.form.name = data.name
				this.form.group = data.group
				this.form.dept = data.dept

				//可以和上面一樣單個注入，也可以像下面一樣直接合併進去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
