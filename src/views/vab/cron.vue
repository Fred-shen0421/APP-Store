<template>
	<el-main>
		<el-alert title="SCUI獨創, 區別於市面上的規則生成器, 對不是很理解Cron的操作員也可以選擇設置的快捷錄入" type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never" header="默認">
					<sc-cron v-model="v1" placeholder="請輸入Cron定時規則" clearable></sc-cron>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="快捷擴展">
					<sc-cron v-model="v2" placeholder="請輸入Cron定時規則" clearable :shortcuts="shortcuts"></sc-cron>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import scCron from '@/components/scCron'

	export default {
		name: 'cron',
		components: {
			scCron
		},
		data() {
			return {
				v1: "",
				v2: "",
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

		}
	}
</script>