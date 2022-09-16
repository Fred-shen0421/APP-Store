
<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never" header="脈衝圓點">
					<el-space wrap :size="15">
						<sc-status-indicator pulse type="primary"></sc-status-indicator>
						<sc-status-indicator pulse type="success"></sc-status-indicator>
						<sc-status-indicator pulse type="warning"></sc-status-indicator>
						<sc-status-indicator pulse type="danger"></sc-status-indicator>
						<sc-status-indicator type="info"></sc-status-indicator>
					</el-space>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="趨勢">
					<el-space wrap :size="15">
						<sc-trend v-model="trendValue" prefix="￥"></sc-trend>
						<sc-trend v-model="trendValue2"></sc-trend>
						<sc-trend v-model="trendValue3" suffix="%"></sc-trend>
					</el-space>

					<p style="margin-top: 15px;color: #999;">設置reverse可反轉顏色。</p>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<div class="up">
						<h2>持續更新中...</h2>
						<p>原子組件庫位置：@/components/scMini/*</p>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'minivab',
		data() {
			return {
				trendValue: 4.6,
				trendValue2: 0,
				trendValue3: -32
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.up {text-align: center;}
	.up h2 {margin-bottom: 10px;}
	.up p {color: #999;line-height: 1.5;}
	.el-card {height:150px;}
</style>
