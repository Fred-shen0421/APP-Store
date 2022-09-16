<template>
	<el-main>
		<el-alert title="來自AVUE的靈感, 業務會有表單裡含有對象數組的可能, 進行封裝後進行增刪改操作, 並且支持聯動form表單的禁用屬性" type="success" style="margin-bottom:20px;"></el-alert>

		<el-card shadow="never">
			<el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="標題" prop="title">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="表格" prop="list">
					<sc-form-table v-model="form.list" :addTemplate="addTemplate" drag-sort placeholder="暫無資料">
						<el-table-column prop="time" label="時間" width="180">
							<template #default="scope">
								<el-time-select v-model="scope.row.time"></el-time-select>
							</template>
						</el-table-column>
						<el-table-column prop="type" label="類型" width="180">
							<template #default="scope">
								<el-select v-model="scope.row.type" placeholder="請選擇">
									<el-option v-for="item in typeDic" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column prop="val" label="數量" min-width="180">
							<template #default="scope">
								<el-input v-model="scope.row.val" placeholder="請輸入內容"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="open" label="checked" width="85" align="center">
							<template #default="scope">
								<el-checkbox v-model="scope.row.checked"></el-checkbox>
							</template>
						</el-table-column>
						<el-table-column prop="open" label="開關" width="80" align="center">
							<template #default="scope">
								<el-switch v-model="scope.row.open"></el-switch>
							</template>
						</el-table-column>
					</sc-form-table>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm">保存</el-button>
				    <el-button @click="resetForm">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'formtable',
		data(){
			return {
				addTemplate: {
					time: '',
					type: '',
					val: '',
					open: true,
					checked: false
				},
				form: {
					title: "標題",
					list: [
						{
							time: '09:00',
							type: '1',
							val: '100',
							open: true,
							checked: true
						},
						{
							time: '10:00',
							type: '0',
							val: '50',
							open: false,
							checked: true
						}
					]
				},
				typeDic: [
					{
						label: "全局",
						value: "0"
					},
					{
						label: "局部",
						value: "1"
					}
				],
				rules: {
					title: [
						{required: true, message: '請上傳', trigger: 'blur'}
					]
				}
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
			}
		}
	}
</script>
