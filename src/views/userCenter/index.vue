<template>
	<el-main>
		<div id="container">
		<el-row :gutter="15">
			<el-col :lg="{span: 8, offset: 8}">
					<el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 100%;margin-top:20px;">
						<div class="title">
							<label>我的帳號</label>
						</div>
						<el-form-item label="帳號">
							<el-input v-model="form.userName" disabled></el-input>
						</el-form-item>	
						<el-form-item label="角色">
							<el-input v-model="form.groupName" disabled></el-input>
						</el-form-item>										
						<el-form-item label="姓名" prop="name">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="行動電話" prop="phone">
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
						<el-form-item label="Email" prop="mail">
							<el-input v-model="form.mail"></el-input>
						</el-form-item>						
						<div class="title">
							<label>修改密碼</label>
						</div>
						<el-form-item label="輸入舊密碼" prop="pwdOld">
							<el-input v-model="form.pwdOld" placeholder="修改前密碼" show-password></el-input>
						</el-form-item>
						<el-form-item label="輸入新密碼" prop="pwdNew">
							<el-input v-model="form.pwdNew" placeholder="修改後密碼" show-password></el-input>
						</el-form-item>
						<el-form-item label="確認新密碼" prop="pwdNew2">
							<el-input v-model="form.pwdNew2" placeholder="確認修改後密碼" show-password></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" :loading="isSaveing" @click="submit()">儲存</el-button>
						</el-form-item>						
					</el-form>
			</el-col>
		</el-row>
				</div>
	</el-main>
</template>

<script>

	export default {
		name: 'userCenter',
		data() {
			let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,16}$/
			var validateOldPwd = (rule, value, callback) => {
				if (!value) {
					if (this.form.pwdNew) {
						callback(new Error('舊密碼不可爲空白！'))
					}
				}
				callback() 
			}			
			var validateNewPwd = (rule, value, callback) => {
				if (value) {
					if (!reg.test(value)) {
						callback(new Error('密碼應是8-16位數字、英文字母或字符，且至少應包含英文及數字！'))
					} else if (this.form.pwdOld === value) {
						callback(new Error('新密碼與舊密碼不可一致！'))
					} else {
						callback()
					}
				} else {
					if (this.form.pwdNew2 || this.form.pwdOld) {
						callback(new Error('新密碼不可爲空白！'))
					} else {					
						callback()
					}
				}
			}
			var validateComfirmPwd = (rule, value, callback) => {
				if (value) {
					if (!reg.test(value)) {
						callback(new Error('密碼應是8-16位數字、字母或字符！'))
					} else if (this.form.pwdNew !== value) {
						callback(new Error('確認密碼與新密碼不一致！'))
					} else {
						callback()
					}
				} else {
					if (this.form.pwdNew) {
						callback(new Error('確認密碼不可爲空白！'))
					} else {						
						callback()
					}
				}
			}

			return {
				isSaveing: false,
				form: {
					userName: "",
					name: "",
					mail: "",
					phone: "",
					groupName: "",
				},
				rules: {
					name: [
						{ required: true, message: '請輸入姓名', trigger: 'blur' },
               			{ min: 2, max: 10, message: '長度在 2 到 10 個字符', trigger: 'blur' },
						{
							required: true,
							pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
							message: '姓名不支持特殊字符',
							trigger: 'blur'
						}						
					],
					phone: [
						{
							pattern: /^09[0-9]{2}-[0-9]{6}$/,
							message: '行動電話號碼格式有誤，應爲09xxxxxxxx！',
							trigger: 'blur'
						}			
					],	
					mail: [
						{
							pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Email格式有誤',
							trigger: 'blur'
						}
					],
					pwdOld: [
						{ validator: validateOldPwd, trigger: 'blur' }
					],					
					pwdNew: [
						{ validator: validateNewPwd, trigger: 'blur' }
					],
					pwdNew2: [
						{ validator: validateComfirmPwd, trigger: 'blur' }
					]					
				},
			}
		},
		created() {
			var userInfo = this.$TOOL.data.get("USER_INFO");
			this.form.userName = userInfo.userName;
			this.form.groupName = userInfo.groupName;
			this.form.name = userInfo.name;
			this.form.mail = userInfo.mail;
			this.form.phone = userInfo.phone;
		},	
		//路由跳轉進來 判斷from是否有特殊標識做特殊處理
		beforeRouteEnter (to, from, next){
			next((vm)=>{
				if(from.is){
					//刪除特殊標識，防止標籤刷新重複執行
					delete from.is
					//執行特殊方法
					vm.$alert('路由跳轉過來後含有特殊標識，做特殊處理', '提示', {
						type: 'success',
						center: true
					}).then(() => {}).catch(() => {})
				}
			})
		},		
		methods: {
			//表單提交方法
			submit(){
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						var reqData = {
							userName: this.form.userName,
							name: this.form.name,
							mail: this.form.mail,
							phone: this.form.phone,
						}

						if(this.form.pwdOld && this.form.pwdNew) {
							reqData.pwdOld = this.form.pwdOld
							reqData.pwdNew = this.form.pwdNew
						}
						this.isSaveing = true;
						var res = await this.$API.system.user.my.post(reqData)
						this.isSaveing = false;
						if(res.code == 200){
							let userInfo = this.$TOOL.data.get("USER_INFO");
							if (userInfo.userName === res.data.userName) {
								let userData = {
	        						name: res.data.name,
        							mail: res.data.mail,
        							phone: res.data.phone,
								}
								Object.assign(userInfo, userData)
								this.$TOOL.data.set("USER_INFO", userInfo)
								this.$message.success(res.message)
							} else {
								this.$message.warning('更新資料錯誤！')
							}
						}else{
							this.$alert(res.message, "提示", {type: 'error'})
						}
						delete this.form.pwdOld;
						delete this.form.pwdNew;
						delete this.form.pwdNew2;						
					}else{
						return false;
					}
				})
			},		
		}
	}
</script>

<style scoped>

	form > div { margin-bottom: 30px; }
	form > div div { padding-bottom: 3px;}
	#container { background-color: #fff; }
	#container .title { padding-top: 10px;margin-left: 40px; text-align: center;font-size: 1.5rem;font-weight: bold;color: #777;}
	#container form { margin: auto;text-align: left; }
</style>
