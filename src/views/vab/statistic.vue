<!--
 * @Descripttion: 統計數值組件演示
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月23日10:28:17
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-alert title="一個非常簡單的組件, 目的就是省去重複寫樣式, 支持千分符/前後綴等." type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="Title" value="112893" description="Description" tips="Tips" groupSeparator></sc-statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="今日淨利潤" value="112893.00" prefix="￥" groupSeparator>
						<sc-trend v-model="trendValue1"></sc-trend>
					</sc-statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="留言" value="112893" suffix="條" groupSeparator>
						<sc-trend v-model="trendValue2"></sc-trend>
					</sc-statistic>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import scStatistic from '@/components/scStatistic';

	export default {
		name: 'statistic',
		components: {
			scStatistic
		},
		data() {
			return {
				trendValue1: 7.7,
				trendValue2: -18.9
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.el-card {margin-bottom: 15px;}
	.up {color: #F56C6C;margin-left: 5px;}
	.down {color: #67C23A;margin-left: 5px;}
</style>
