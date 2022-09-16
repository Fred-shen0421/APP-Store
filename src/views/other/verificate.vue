<template>
	<el-main>
		<el-card shadow="never" header="async-validator內置">
			<el-form ref="form" :model="form" :rules="rules" label-width="100px" status-icon>
				<el-form-item label="必填" prop="required">
					<el-input v-model="form.required"></el-input>
				</el-form-item>
				<el-form-item label="長度" prop="length">
					<el-input v-model="form.length" placeholder="長度需為3位"></el-input>
				</el-form-item>
				<el-form-item label="類型" prop="type">
					<el-input v-model="form.type" placeholder="類型可為string number boolean array date url email等"></el-input>
				</el-form-item>
				<el-form-item label="範圍" prop="range">
					<el-input v-model="form.range" placeholder="請填寫範圍在3至5位"></el-input>
				</el-form-item>
				<el-form-item label="枚舉" prop="enum">
					<el-input v-model="form.enum" placeholder="請填寫admin，user，guest其一"></el-input>
				</el-form-item>
				<el-form-item label="自定義" prop="custom">
					<el-input v-model="form.custom" placeholder="請填寫數字1"></el-input>
				</el-form-item>
				<el-form-item label="異步驗證" prop="async">
					<el-input v-model="form.async" placeholder="請輸入SCUI最新版本號,form開啟status-icon後 可以查看右側狀態"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit">驗證所有字段</el-button>
					<el-button @click="resetForm('form')">Reset</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" header="自定義" style="margin-top: 15px;">
			<el-form ref="form2" :model="form2" :rules="rules2" label-width="100px" status-icon>
				<el-form-item label="手機號碼" prop="phone">
					<el-input v-model="form2.phone"></el-input>
				</el-form-item>
				<el-form-item label="車牌號碼" prop="cars">
					<el-input v-model="form2.cars"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit2">驗證所有字段</el-button>
					<el-button @click="resetForm('form2')">Reset</el-button>
				</el-form-item>
			</el-form>
			<el-alert title="自定義驗證可在 @/utils/verificate.js 中不斷擴展業務需要的驗證. 記得要 import 進來" type="success" />
		</el-card>
	</el-main>
</template>

<script>
	import { verifyPhone, verifyCars } from '@/utils/verificate'

	export default {
		name: 'verificate',
		data() {
			return {
				form: {

				},
				rules: {
					required: [
						{ required: true, message: '請填寫' }
					],
					length: [
						{ required: true, len: 3, message: '長度需為3位' }
					],
					type: [
						{ required: true, type: 'email', message: '類型需為email' }
					],
					range: [
						{ required: true, min: 3, max: 5, message: '範圍在3至5位' }
					],
					enum: [
						{ required: true, type: 'enum', enum: ['admin', 'user', 'guest'], message: '請填寫admin，user，guest其一' }
					],
					custom: [
						{ required: true, validator: (rule, value)=>{return value === '1'}, message: '請填寫數字1' , trigger:'blur'}
					],
					async: [
						{
							required: true,
							validator: (rule, value, callback)=>{
								this.$API.demo.ver.get({value: value}).then(res => {
									if(res.data != value){
										return callback(new Error('請輸入SCUI最新版本號：'+res.data))
									}
									callback()
								})
							},
							trigger:'blur'
						}
					]
				},
				form2: {

				},
				rules2: {
					phone: [
						{ required: true, message: '請輸入姓名' },
						{ validator: verifyPhone, trigger:'blur' }
					],
					cars: [
						{ required: true, validator: verifyCars, trigger:'blur' }
					]
				}
			}
		},
		mounted() {

		},
		methods: {
			submit(){
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						this.$message.success("全部驗證通過")
					}else{
						return false;
					}
				})
			},
			submit2(){
				this.$refs.form2.validate(async (valid) => {
					if (valid) {
						this.$message.success("全部驗證通過")
					}else{
						return false;
					}
				})
			},
			resetForm(ref){
				this.$refs[ref].resetFields()
			}
		}
	}
</script>

<style>

</style>
