<!--
 * @Descripttion: 圖標選擇器組件演示文件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年7月27日09:33:06
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-alert title="支持擴展的圖標選擇器,除了默認的圖標組還可以在 @/config/iconSelect 中定義更多的圖標組" type="success" style="margin-bottom:20px;"></el-alert>
		<el-card shadow="never">
			<el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="圖標" prop="icon">
					<sc-icon-select v-model="form.icon" :disabled="disabled"></sc-icon-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm">保存</el-button>
				    <el-button @click="resetForm">重置</el-button>
					 <el-button @click="setdisabled">{{disabled?'移除禁用':'設為禁用'}}</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-main>
</template>

<script>
	import scIconSelect from '@/components/scIconSelect'

	export default {
		name: 'iconSelect',
		components: {
			scIconSelect
		},
		data() {
			return {
				form: {
					icon: ''
				},
				rules: {
					icon: [
						{required: true, message: '請選擇圖標', trigger: 'change'}
					]
				},
				disabled: false
			}
		},
		methods: {
			submitForm(){
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						alert('請看控制台輸出');
						console.log(this.form);
					}else{
						return false;
					}
				})
			},
			resetForm(){
				this.$refs.ruleForm.resetFields();
			},
			setdisabled(){
				this.disabled = !this.disabled
			}
		}
	}
</script>

<style>
</style>
