<template>
	<el-main>
		<el-card shadow="never" header="打開">
			<el-button type="primary" plain @click="open1">打開個人資訊</el-button>
			<el-button type="primary" plain @click="open2">打開後執行</el-button>
			<el-alert title="打開後執行原理: 路由push時,在目前路由對像中插入一個特殊標識, 在目標視圖中beforeRouteEnter獲取判斷是否需要執行特殊方法" style="margin-top: 20px;"></el-alert>
		</el-card>
		<el-card shadow="never" header="重新整理" style="margin-top: 15px;">
			<el-button type="primary" plain @click="refresh1">重新整理</el-button>
		</el-card>
		<el-card shadow="never" header="關閉" style="margin-top: 15px;">
			<el-button type="primary" plain @click="close1">關閉目前</el-button>
			<el-button type="primary" plain @click="close2">關閉其他</el-button>
			<el-button type="primary" plain @click="close3">關閉後執行</el-button>
		</el-card>
		<el-card shadow="never" header="設置" style="margin-top: 15px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="input" placeholder="請輸入內容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" plain @click="set1">設置標題</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" header="整頁路由" style="margin-top: 15px;">
			<el-button type="primary" plain @click="fullpage">fullpage</el-button>
			<el-alert title="變更路由的層級關係,向上推至頂級達到在layout視圖中顯示. 只需要在路由中設置 meta.fullpage 即可" style="margin-top: 20px;"></el-alert>
		</el-card>
	</el-main>
</template>

<script>
	import useTabs from '@/utils/useTabs'

	export default {
		name: 'viewTags',
		data() {
			return {
				input: "newTabName"
			}
		},
		mounted() {

		},
		methods: {
			open1(){
				this.$router.push('/usercenter')
			},
			open2(){
				this.$router.push('/usercenter')
				this.$route.is = true
			},
			refresh1(){
				useTabs.refresh()
			},
			close1(){
				useTabs.close()
			},
			close2(){
				useTabs.closeOther()
			},
			close3(){
				useTabs.closeNext((tags)=>{
					//回調返回所有標籤的數組，這裡其實是需要判斷是否含有'/usercenter'，含有再操作的，這裡為了演示就直接打開了。
					console.log(tags)
					this.$router.push('/usercenter')
					this.$route.is = true
				})
			},
			set1(){
				useTabs.setTitle(this.input)
			},
			fullpage(){
				this.$router.push('/other/fullpage')
			}
		}
	}
</script>

<style>
</style>
