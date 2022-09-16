<template>
	<el-main>
		<el-card shadow="never">
			<el-tabs tab-position="top">
				<el-tab-pane label="普通打印">
					<el-alert title="打印當前頁面已存在的元素,如包含.no-print樣式就忽略,分頁打印就需要{page-break-after: always}控制" type="success" style="margin-bottom:20px;"></el-alert>
					<el-button type="primary" @click="print">普通打印</el-button>
					<div style="height:20px"></div>
					<div class="printMain" ref="printMain">
						<div class="item">打印內容1 <el-icon><el-icon-eleme-filled /></el-icon> <p class="no-print">忽略打印</p></div>
						<div style="page-break-after: always;"></div>
						<div class="item">打印內容2</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="動態打印">
					<el-alert title="打印創建的DOM結構,適用於遠程獲取模板後打印" type="success" style="margin-bottom:20px;"></el-alert>
					<el-button type="primary" @click="print2">動態打印</el-button>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</el-main>
</template>

<script>
	import print from '@/utils/print'

	export default {
		name: 'print',
		data() {
			return {}
		},
		methods: {
			print(){
				//直接傳入REF或者querySelector
				print(this.$refs.printMain)
			},
			print2(){
				//創建虛擬DOM結構後再傳入
				var dom = "<h2>TITLE</h2><p>後創建的DOM結構</p>"
				print(dom)
			}
		}
	}
</script>

<style scoped>
	.printMain .item{padding:20px;border: 1px solid #409eff;margin-bottom: 20px;background: #ecf5ff;border-radius: 4px;}
	.printMain p {margin-top: 20px;color: #999;}
</style>
