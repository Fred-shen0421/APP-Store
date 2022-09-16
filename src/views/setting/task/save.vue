<!--
 * @Descripttion: 系統計劃任務配置
 * @version: 1.2
 * @Author: sakuya
 * @Date: 2021年7月7日09:28:32
 * @LastEditors: sakuya
 * @LastEditTime: 2021年7月10日20:56:47
-->

<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="400" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="描述" prop="title">
				<el-input v-model="form.title" placeholder="計劃任務標題" clearable></el-input>
			</el-form-item>
			<el-form-item label="執行類" prop="handler">
				<el-input v-model="form.handler" placeholder="計劃任務執行類名稱" clearable></el-input>
			</el-form-item>
			<el-form-item label="定時規則" prop="cron">
				<sc-cron v-model="form.cron" placeholder="請輸入Cron定時規則" clearable :shortcuts="shortcuts"></sc-cron>
			</el-form-item>
			<el-form-item label="是否啟用" prop="state">
				<el-switch v-model="form.state" active-value="1" inactive-value="-1"></el-switch>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	import scCron from '@/components/scCron';
	
	export default {
		components: {
			scCron
		},
		emits: ['success', 'closed'],
		data() {
			return {
				mode: "add",
				titleMap: {
					add: '新增計劃任務',
					edit: '編輯計劃任務'
				},
				form: {
					id:"",
					title: "",
					handler: "",
					cron: "",
					state: "1"
				},
				rules: {
					title:[
						{required: true, message: '請填寫標題'}
					],
					handler:[
						{required: true, message: '請填寫執行類'}
					],
					cron:[
						{required: true, message: '請填寫定時規則'}
					]
				},
				visible: false,
				isSaveing: false,
				shortcuts: [
					{
						text: "每天8點和12點 (自定義追加)",
						value: "0 0 8,12 * * ?"
					}
				]
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
				this.$refs.dialogForm.validate((valid) => {
					if (valid) {
						this.isSaveing = true;
						setTimeout(()=>{
							this.isSaveing = false;
							this.visible = false;
							this.$message.success("操作成功")
							this.$emit('success', this.form, this.mode)
						},1000)
					}
				})
			},
			//表單注入資料
			setData(data){
				this.form.id = data.id
				this.form.title = data.title
				this.form.handler = data.handler
				this.form.cron = data.cron
				this.form.state = data.state
			}
		}
	}
</script>

<style>
</style>
