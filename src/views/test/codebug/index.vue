<!--
 * @Descripttion: 模擬觸發錯誤
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月25日08:53:13
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-alert title="通過VUE開放的errorHandler可以很方便的捕捉到處理異常, CSIAdmin收集後可上報日誌收集系統, 相關代碼:@/utils/errorHandler.js" type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never" header="ReferenceError">
					<el-button type="danger" @click="ReferenceError">模擬觸發</el-button>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="TypeError">
					<el-button type="danger" @click="TypeError">模擬觸發</el-button>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="RangeError">
					<el-button type="danger" @click="RangeError">模擬觸發</el-button>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="API 401">
					<el-button type="danger" @click="api401">模擬觸發</el-button>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="API 404">
					<el-button type="danger" @click="api404">模擬觸發</el-button>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="API 500">
					<el-button type="danger" @click="api500">模擬觸發</el-button>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="Router 404">
					<el-button type="danger" @click="router404">模擬觸發</el-button>
				</el-card>
			</el-col>
		</el-row>
		<el-alert title=":) 嘗試模擬SyntaxError語法錯誤時,發現VUE編譯失敗,所以這不作模擬了" type="info" style="margin-top:20px;"></el-alert>
	</el-main>
</template>

<script>
	/* eslint-disable */
	//為了演示異常，跳過eslint
	export default {
		name: 'codebug',
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			ReferenceError(){
				console.log(obj);
			},
			TypeError(){
				const obj = null
				console.log(obj.a);
			},
			RangeError(){
				const n = 1
				n.toFixed(101)
			},
			async api401(){
				var data = await this.$API.demo.status.get(401)
			},
			async api404(){
				var data = await this.$API.demo.status.get(404)
			},
			async api500(){
				var data = await this.$API.demo.status.get(500)
			},
			router404(){
				this.$router.push('/page/404')
			}
		}
	}
</script>

<style>
</style>
