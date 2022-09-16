<template>
	<el-main>
		<el-alert title="根據角色配置,可讓不同角色訪問不同的控制台視圖,參數值在登錄成功後返回 dashboard:{type}" type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="24">
				<el-card shadow="never" header="我的常用">
					<myapp></myapp>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import myapp from './components/myapp';

	export default {
		components: {
			myapp
		},
		data() {
			return {

			}
		},
		mounted(){
			this.$emit('on-mounted')
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>
