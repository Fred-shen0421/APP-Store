<!--
 * @Descripttion: scDialog 彈窗擴展演示文件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年8月27日08:56:30
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-alert title="二次封裝el-dialog,加入加載中/最大化." type="success" style="margin:0 0 20px 0;"></el-alert>
		<el-card shadow="never" header="內置">
			<el-button type="primary" @click="open1">默認</el-button>
			<el-button type="primary" @click="open2">加載</el-button>
			<el-button type="primary" @click="open3">禁止拖拽最大化和關閉</el-button>
		</el-card>
		<el-card shadow="never" header="異步" style="margin-top: 15px;">
			<el-button type="primary" @click="asyn1">異步加載1</el-button>
			<el-button type="primary" @click="asyn2">異步加載2</el-button>
			<el-alert title="適用於頁面有很多彈窗操作,利用異步組件按需加載,加快首屏的加載速度和打包體積" style="margin-top: 20px;"></el-alert>
		</el-card>
	</el-main>

	<sc-dialog v-model="dialog1" draggable title="提示">
		內容
		<template #footer>
			<el-button @click="dialog1 = false">取 消</el-button>
			<el-button type="primary" @click="dialog1 = false">確 定</el-button>
		</template>
	</sc-dialog>

	<sc-dialog v-model="dialog2" draggable title="模擬加載" :width="400" :loading="dialog2Loading">
		<el-empty description="NO Data" :image-size="80"></el-empty>
		<template #footer>
			<el-button @click="dialog2 = false">取 消</el-button>
			<el-button type="primary" @click="dialog2 = false" :loading="dialog2Loading">確 定</el-button>
		</template>
	</sc-dialog>

	<sc-dialog v-model="dialog3" title="禁用拖拽" :show-fullscreen="false" :show-close="false">
		內容
		<template #footer>
			<el-button @click="dialog3 = false">取 消</el-button>
			<el-button type="primary" @click="dialog3 = false">確 定</el-button>
		</template>
	</sc-dialog>

	<dialog1 v-if="asynDialog1" draggable @closed="asynDialog1 = false"></dialog1>
	<dialog2 v-if="asynDialog2" draggable @closed="asynDialog2 = false"></dialog2>

</template>

<script>
	import { defineAsyncComponent } from 'vue'

	export default {
		name: 'dialogExtend',
		components: {
			dialog1: defineAsyncComponent(() => import("./dialog1")),
			dialog2: defineAsyncComponent(() => import("./dialog2"))
		},
		data() {
			return {
				dialog1: false,
				dialog2: false,
				dialog3: false,
				dialog2Loading: false,
				asynDialog1: false,
				asynDialog2: false,
			}
		},
		mounted() {

		},
		methods: {
			open1(){
				this.dialog1 = true
			},
			open2(){
				this.dialog2 = true
				this.dialog2Loading = true
				setTimeout(()=>{
					this.dialog2Loading = false
				}, 1000)
			},
			open3(){
				this.dialog3 = true
			},
			asyn1(){
				this.asynDialog1 = true
			},
			asyn2(){
				this.asynDialog2 = true
			}
		}
	}
</script>

<style>
</style>
