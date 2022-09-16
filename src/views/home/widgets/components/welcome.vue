<template>
	<el-card shadow="hover" header="歡迎">
		<div class="welcome">
			<div class="logo">
				<img src="img/csi_logo_s.png">
				<h2>歡迎體驗 CSIAdmin</h2>
			</div>
			<div class="tips">
				<div class="tips-item">
					<div class="tips-item-icon"><el-icon><el-icon-menu/></el-icon></div>
					<div class="tips-item-message">這裡是項目控制台，你可以點擊右上方的「自定義」按鈕來添加移除或者移動部件。</div>
				</div>
				<div class="tips-item">
					<div class="tips-item-icon"><el-icon><el-icon-promotion/></el-icon></div>
					<div class="tips-item-message">在提高前端算力、減少帶寬請求和代碼執行力上多次優化，並且持續著。</div>
				</div>
				<div class="tips-item">
					<div class="tips-item-icon"><el-icon><el-icon-milk-tea/></el-icon></div>
					<div class="tips-item-message">項目目的：讓前端工作更快樂</div>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script>
	export default {
		title: "歡迎",
		icon: "el-icon-present",
		description: "項目特色",
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.welcome {}
	.welcome .logo {text-align: center;}
	.welcome .logo img {vertical-align: bottom;width: 250px;margin-bottom: 20px;}
	.welcome .logo h2 {font-size: 30px;font-weight: normal;display: flex;align-items: center;justify-content: center;}

	.tips {margin-top: 20px;padding:0 40px;}
	.tips-item {display: flex;align-items: center;justify-content: center;padding:7.5px 0;}
	.tips-item-icon {width: 40px;height:40px;display: flex;align-items: center;justify-content: center;border-radius: 50%;font-size: 18px;margin-right: 20px;color: var(--el-color-primary);background: rgba(180,180,180,0.1);}
	.tips-item-message {flex: 1;font-size: 14px;}

	.actions {text-align: center;margin: 40px 0 20px 0;}
</style>
