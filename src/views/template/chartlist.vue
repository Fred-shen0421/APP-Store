<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-radio-group v-model="dateType" style="margin-right: 15px;">
					<el-radio-button label="今天"></el-radio-button>
					<el-radio-button label="昨天"></el-radio-button>
					<el-radio-button label="最近7天"></el-radio-button>
					<el-radio-button label="最近30天"></el-radio-button>
				</el-radio-group>
				<el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="開始日期" end-placeholder="結束日期"></el-date-picker>
			</div>
		</el-header>
		<el-main>
			<el-card shadow="never">
				<div class="number-data">
					<div class="item">
						<h2>瀏覽量(PV)
							<el-tooltip effect="light">
								<template #content>
									<div style="width: 200px;line-height: 2;">
										即通常說的Page View(PV)，用戶每打開一個網站頁面就被記錄1次。用戶多次打開同一頁面，瀏覽量值累計。
									</div>
								</template>
								<el-icon><el-icon-question-filled /></el-icon>
							</el-tooltip>
						</h2>
						<p>65,715</p>
					</div>
					<div class="item">
						<h2>訪客數(UV)
							<el-tooltip effect="light">
								<template #content>
									<div style="width: 200px;line-height: 2;">
										一天之內您網站的獨立訪客數(以Cookie為依據)，一天內同一訪客多次訪問您網站只計算1個訪客。
									</div>
								</template>
								<el-icon><el-icon-question-filled /></el-icon>
							</el-tooltip>
						</h2>
						<p>8,936</p>
					</div>
					<div class="item">
						<h2>IP數
							<el-tooltip effect="light">
								<template #content>
									<div style="width: 200px;line-height: 2;">
										一天之內您網站的獨立訪問ip數。
									</div>
								</template>
								<el-icon><el-icon-question-filled /></el-icon>
							</el-tooltip>
						</h2>
						<p>10,279</p>
					</div>
					<div class="item">
						<h2>跳出率
							<el-tooltip effect="light">
								<template #content>
									<div style="width: 200px;line-height: 2;">
										只瀏覽了一個頁面便離開了網站的訪問次數占總的訪問次數的百分比。
									</div>
								</template>
								<el-icon><el-icon-question-filled /></el-icon>
							</el-tooltip>
						</h2>
						<p>27.92%</p>
					</div>
					<div class="item">
						<h2>平均訪問時長
							<el-tooltip effect="light">
								<template #content>
									<div style="width: 200px;line-height: 2;">
										訪客在一次訪問中，平均打開網站的時長。即每次訪問中，打開第一個頁面到關閉最後一個頁面的平均值，打開一個頁面時計算打開關閉的時間差。
									</div>
								</template>
								<el-icon><el-icon-question-filled /></el-icon>
							</el-tooltip>
						</h2>
						<p>00:19:05</p>
					</div>
				</div>
				<div class="chart">
					<el-row>
						<el-col :span="8">
							<scEcharts height="250px" :option="pie"></scEcharts>
						</el-col>
						<el-col :span="16">
							<scEcharts height="250px" :option="option"></scEcharts>
						</el-col>
					</el-row>
				</div>
			</el-card>
			<el-card shadow="never">
				<scTable ref="table" :data="data" show-summary height="auto">
					<el-table-column label="來源類型" prop="type"></el-table-column>
					<el-table-column label="網站基礎指標" align="center">
						<el-table-column label="訪客數(UV)" prop="uv" width="150"></el-table-column>
						<el-table-column label="IP數" prop="ip" width="150"></el-table-column>
					</el-table-column>
					<el-table-column label="流量質量指標" align="center">
						<el-table-column label="跳出率" prop="out" width="150"></el-table-column>
						<el-table-column label="平均訪問時長" prop="time" width="150"></el-table-column>
					</el-table-column>
				</scTable>
			</el-card>
		</el-main>
	</el-container>
</template>

<script>
	import scEcharts from '@/components/scEcharts';

	export default {
		name: 'chartlist',
		components: {
			scEcharts
		},
		data(){
			return {
				dateType: "今天",
				date: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
				data: [
					{
						type: "直接訪問",
						pv: "57,847",
						uv: "7,129",
						ip: "8,330",
						out: "26.38%",
						time: "00:20:35"
					},
					{
						type: "搜索引擎",
						pv: "5,942",
						uv: "1,338",
						ip: "1,449",
						out: "33.49%",
						time: "00:11:31"
					},
					{
						type: "外部鏈接",
						pv: "1,926",
						uv: "469",
						ip: "500",
						out: "44.53%",
						time: "00:08:49"
					}
				],
				pie: {
					tooltip: {
						trigger: 'item'
					},
					series: [
						{
							name: '訪問來源',
							type: 'pie',
							radius: ['55%', '70%'],
							itemStyle: {
								borderRadius: 5,
								borderColor: '#fff',
								borderWidth: 1
							},
							data: [
								{value: 1048, name: '搜索引擎'},
								{value: 235, name: '直接訪問'},
								{value: 180, name: '外部鏈接'}
							]
						}
					]
				},
				option: {
					legend: {
						data: ['直接訪問', '搜索引擎', '外部鏈接']
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
						boundaryGap: false,
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name: '直接訪問',
						data: [120, 210, 150, 80, 70, 110, 130],
						type: 'line',
					},
					{
						name: '搜索引擎',
						data: [110, 180, 120, 120, 60, 90, 110],
						type: 'line',
					},
					{
						name: '外部鏈接',
						data: [50, 90, 60, 60, 30, 40, 50],
						type: 'line',
					}]
				}
			}
		}
	}
</script>

<style scoped>
	.el-card {margin-bottom: 15px;}

	.number-data {display: flex;}
	.number-data .item {flex:1;border-right: 1px solid #f0f0f0;padding:0 20px;}
	.number-data .item:last-child {border: 0;}
	.number-data .item h2 {font-size: 12px;color: #787a7d;font-weight: normal;display: flex;align-items: center;}
	.number-data .item h2 i {margin-left: 5px;color: #8cc5ff;cursor: pointer;}
	.number-data .item p {font-size: 20px;color: #121315;margin-top: 10px;}

	.chart {border-top: 1px solid #f0f0f0;margin-top: 20px;padding-top: 20px;}

	[data-theme='dark'] .number-data .item {border-color: var(--el-border-color-base);}
	[data-theme='dark'] .number-data .item p {color: #d0d0d0;}
	[data-theme='dark'] .chart {border-color: var(--el-border-color-base);}
</style>
