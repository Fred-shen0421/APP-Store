<template>
	<el-main class="sc-page">
		<el-page-header content="定寬頁面" />
		<el-alert class="page-msg" description="<el-main>添加定寬樣式 .sc-page  即可定寬, 固定1200px寬度, 適用於一些無法自適應的頁面, 類似報表等需要固定寬度的頁面. 其實定寬頁面更受C端用戶接受和習慣" type="warning" show-icon :closable="false" />
		<el-card shadow="never" header="所有主機">
			<div class="page-buttons">
				<el-button type="primary" style="width: 180px;">創建雲端主機</el-button>
				<el-button type="primary" text>管理密鑰</el-button>
				<el-button type="primary" text>黑名單</el-button>
			</div>
			<scTable ref="table" :data="data" height="auto" paginationLayout="total, prev, pager, next" hideDo>
				<el-table-column label="主機名稱" prop="name" min-width="240"></el-table-column>
				<el-table-column label="外網ip" prop="ip" width="200"></el-table-column>
				<el-table-column label="系統碟" prop="c" width="150"></el-table-column>
				<el-table-column label="資料碟" prop="d" width="150"></el-table-column>
				<el-table-column label="業務狀態" prop="zt" width="150">
					<el-tag type="success">運行中</el-tag>
				</el-table-column>
				<el-table-column label="操作" width="70">
					<el-dropdown>
						<el-button icon="el-icon-more" size="small"></el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>配額</el-dropdown-item>
								<el-dropdown-item divided>重啟</el-dropdown-item>
								<el-dropdown-item >停機</el-dropdown-item>
								<el-dropdown-item divided>釋放主機</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</el-table-column>
			</scTable>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'widthlist',
		data(){
			return {
				data: [
					{
						name: "WIN-server-202256324",
						ip: "211.187.11.18",
						c: "80G",
						d: "2048G",
						out: "1"
					},
					{
						name: "WIN-server-20210312081254",
						ip: "211.187.41.56",
						c: "80G",
						d: "2048G",
						out: "1"
					}
				]
			}
		}
	}
</script>

<style scoped>
	.page-msg {margin: 15px 0;}
	.page-buttons {margin-bottom: 20px;}
</style>
