<template>
	<sc-page-header :title="id?'編輯':'新增'" description="可用於非常複雜的表單提交，如一些較為簡單的表單提交應使用dialog或者drawer更合適" icon="el-icon-burger"></sc-page-header>

	<el-main>
		<el-alert title="注意: 因為keep-alive只接受組件name,導致多路由共用組件時,關閉或刷新一個標籤導致其他同一組件的頁面緩存失效,後續還在尋找完美的解決方案.建議在列表頁使用dialog或者drawer形式" type="error" style="margin-bottom: 15px;"></el-alert>
		<el-card shadow="never">
			<el-form ref="form" label-width="100px">
				<el-form-item label="id">
					<el-input v-model="id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">保存</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'listCrud-detail',
		data() {
			return {
				id: this.$route.query.id,
				input: ""
			}
		},
		created() {

		},
		mounted() {
			//修改tab名稱
			this.$store.commit("updateViewTagsTitle", this.id?`CURD編輯ID:${this.id}`:"CURD新增")
		},
		methods: {

		}
	}
</script>

<style>
</style>
