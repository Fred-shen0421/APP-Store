<template>
	<el-main>
		<el-card shadow="never" header="分類篩選器">
			<sc-select-filter :data="data" :selected-values="selectedValues" :label-width="80" @on-change="change"></sc-select-filter>
		</el-card>
		<el-card shadow="never" header="返回值" style="margin-top: 15px;">
			<pre>{{ filterData }}</pre>
		</el-card>
	</el-main>
</template>

<script>
	import scSelectFilter from '@/components/scSelectFilter'

	export default {
		name: 'selectFilter',
		components: {
			scSelectFilter
		},
		data() {
			return {
				data: [
					{
						title: "狀態(單)",
						key: "state",
						options: [
							{
								label: "全部",
								value: ""
							},
							{
								label: "待審核",
								value: "1",
								icon: "el-icon-flag"
							},
							{
								label: "已退回",
								value: "2",
								icon: "el-icon-bottom-left"
							},
							{
								label: "已關閉",
								value: "3",
								icon: "el-icon-circle-close"
							},
							{
								label: "已完成",
								value: "4",
								icon: "el-icon-checked"
							}
						]
					},
					{
						title: "類型(多)",
						key: "type",
						multiple: true,
						options: [
							{
								label: "全部",
								value: ""
							},
							{
								label: "請假申請",
								value: "1"
							},
							{
								label: "加班申請",
								value: "2"
							}
						]
					}
				],
				selectedValues: {
					state: [""],
					type: [""]
				},
				filterData: {}
			}
		},
		mounted() {

		},
		methods: {
			change(selected){
				this.filterData = selected
			}
		}
	}
</script>

<style>
</style>
