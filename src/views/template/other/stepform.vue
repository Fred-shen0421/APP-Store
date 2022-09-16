<template>
	<el-main>
		<el-card shadow="never" header="分步表單">
			<el-steps :active="active" align-center style="margin-bottom: 20px;">
				<el-step title="填寫轉帳資訊"></el-step>
				<el-step title="確認轉帳資訊"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<el-row>
				<el-col :lg="{span: 8, offset: 8}">
					<el-form v-if="active==0" ref="stepForm_0" :model="form" :rules="rules" label-position="top">
						<el-form-item label="付款帳戶" prop="paymentAccount">
							<el-select v-model="form.paymentAccount" clearable>
								<el-option label="paoxiaonan@ch-si.com.tw" value="paoxiaonan@ch-si.com.tw"></el-option>
								<el-option label="wulanren@sh-si.com.tw" value="wulanren@sh-si.com.tw"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="收款帳戶" prop="collectionAccount">
							<el-input v-model="form.collectionAccount" clearable></el-input>
						</el-form-item>
						<el-form-item label="收款人姓名" prop="collectionName">
							<el-input v-model="form.collectionName" clearable></el-input>
						</el-form-item>
						<el-form-item label="轉帳金額" prop="amount">
							<el-input v-model="form.amount"></el-input>
						</el-form-item>
					</el-form>
					<el-form v-if="active==1" ref="stepForm_1" :model="form" :rules="rules" label-position="top">
						<el-alert title="確認轉帳後，資金將直接打入對方帳戶，無法退回。" type="warning" show-icon style="margin-bottom: 15px;"/>
						<el-descriptions :column="1" border>
							<el-descriptions-item label="付款帳戶">{{form.paymentAccount}}</el-descriptions-item>
							<el-descriptions-item label="收款帳戶">{{form.collectionAccount}}</el-descriptions-item>
							<el-descriptions-item label="收款人姓名">{{form.collectionName}}</el-descriptions-item>
							<el-descriptions-item label="轉帳金額">{{form.amount}} 元</el-descriptions-item>
						</el-descriptions>
						<el-divider></el-divider>
						<el-form-item label="支付密碼" prop="payPassword">
							<el-input v-model="form.payPassword" show-password placeholder="請輸入"></el-input>
						</el-form-item>
					</el-form>
					<div v-if="active==2">
						<el-result icon="success" title="操作成功" sub-title="預計兩小時內到帳">
							<template #extra>
								<el-button type="primary" @click="again">再轉一筆</el-button>
								<el-button>查看帳單</el-button>
							</template>
						</el-result>
					</div>
					<el-button v-if="active>0 && active<2" @click="pre" :disabled="submitLoading">上一步</el-button>
					<el-button v-if="active<1" type="primary" @click="next">下一步</el-button>
					<el-button v-if="active==1" type="primary" @click="submit" :loading="submitLoading">提交</el-button>
				</el-col>
			</el-row>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'stepform',
		data() {
			return {
				active: 0,
				submitLoading: false,
				form: {
					paymentAccount: 'wulanren@sh-si.com.tw',
					collectionAccount: 'test@example.com',
					collectionName: 'Wulanren',
					amount: '100',
					payPassword: ''
				},
				rules: {
					paymentAccount: [
						{
							required: true,
							message: '請選擇付款帳戶',
						}
					],
					collectionAccount: [
						{
							required: true,
							message: '請輸入收款帳戶',
						}
					],
					collectionName: [
						{
							required: true,
							message: '請輸入收款人姓名',
						}
					],
					amount: [
						{
							required: true,
							message: '請輸入轉帳金額',
						}
					],
					payPassword: [
						{
							required: true,
							message: '需要支付密碼才能進行支付',
						}
					]
				}
			}
		},
		mounted() {

		},
		methods: {
			//下一步
			next(){
				const formName = `stepForm_${this.active}`
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.active += 1
					}else{
						return false
					}
				})
			},
			//上一步
			pre(){
				this.active -= 1
			},
			//提交
			submit(){
				const formName = `stepForm_${this.active}`
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submitLoading = true
						setTimeout(()=>{
							this.submitLoading = false
							this.active += 1
						},1000)
					}else{
						return false
					}
				})
			},
			//再來一次
			again(){
				this.active = 0
			}
		}
	}
</script>

<style scoped>
	.el-steps:deep(.is-finish) .el-step__line {background: var(--el-color-primary);}
</style>
