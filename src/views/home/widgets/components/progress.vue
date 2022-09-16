<template>
	<el-card shadow="hover" header="進度環">
		<div class="progress">
			<el-progress type="dashboard" :percentage="85.5" :width="160">
				<template #default="{ percentage }">
				    <div class="percentage-value">{{ percentage }}%</div>
				    <div class="percentage-label">目前進度</div>
				  </template>
			</el-progress>
		</div>

	</el-card>
</template>

<script>
	export default {
		title: "進度環",
		icon: "el-icon-odometer",
		description: "進度環原子組件演示",
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.progress {text-align: center;}
	.progress .percentage-value {font-size: 28px;}
	.progress .percentage-label {font-size: 12px;margin-top: 10px;}
</style>
