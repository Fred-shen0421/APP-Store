<template>
	<el-container>
		<el-aside width="40%">
			<el-container>
				<el-header>
					<div class="left-panel">
						<el-button type="primary" icon="el-icon-plus"></el-button>
						<el-button type="danger" plain icon="el-icon-delete"></el-button>
					</div>
				</el-header>
				<el-main class="nopadding">
					<scTable ref="table" :apiObj="list.apiObj" row-key="id" stripe highlightCurrentRow @row-click="rowClick">
						<el-table-column type="selection" width="50"></el-table-column>
						<el-table-column label="ID" prop="id" width="200"></el-table-column>
						<el-table-column label="評分" prop="num" width="80"></el-table-column>
						<el-table-column label="進度" prop="progress" width="250" sortable>
							<template #default="scope">
								<el-progress :percentage="scope.row.progress" />
							</template>
						</el-table-column>
						<el-table-column label="創建日期" prop="datetime" width="150" sortable></el-table-column>
					</scTable>
				</el-main>
			</el-container>
		</el-aside>
		<el-container>
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-plus"></el-button>
					<el-button type="danger" plain icon="el-icon-delete"></el-button>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="sontable" :apiObj="list.apiObj" row-key="id" stripe>
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column label="姓名" prop="name" width="180"></el-table-column>
					<el-table-column label="狀態" prop="type" width="60">
						<template #default="scope">
							<sc-status-indicator v-if="scope.row.type==0" type="success"></sc-status-indicator>
							<sc-status-indicator v-if="scope.row.type==1" pulse type="danger"></sc-status-indicator>
						</template>
					</el-table-column>
					<el-table-column label="郵箱" prop="email" width="250"></el-table-column>
					<el-table-column label="評分" prop="num" width="150"></el-table-column>
					<el-table-column label="註冊時間" prop="datetime" width="150" sortable></el-table-column>
				</scTable>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		name: 'listSon',
		data() {
			return {
				list: {
					apiObj: this.$API.demo.list
				},
			}
		},
		methods: {
			rowClick(row){
				var params = {
					groupId: row.id
				}
				this.$refs.sontable.reload(params)
			}
		}
	}
</script>

<style>
</style>
