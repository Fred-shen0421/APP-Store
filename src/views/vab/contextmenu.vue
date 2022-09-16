<!--
 * @Descripttion: 右鍵簡單組件演示文件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年7月22日16:31:14
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never">
					<el-alert title="試試右鍵表格行看看. 支持多級選單, 動態選單等等等..." type="success" style="margin-bottom:20px;"></el-alert>
					<el-table ref="table" :data="tableData" highlight-current-row @row-contextmenu="rowContextmenu">
						<el-table-column type="expand">
							<template #default="props">
								<el-empty :description="props.row.id + ' 自定義擴展行'" :image-size="60"></el-empty>
							</template>
						</el-table-column>
						<el-table-column prop="id" label="ID" width="50"></el-table-column>
						<el-table-column prop="name" label="NAME" width="220"></el-table-column>
						<el-table-column prop="date" label="DATE"></el-table-column>
						<el-table-column prop="state" label="STATE"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" @contextmenu.prevent="openMenu">
					<div style="height:500px;display: flex;flex-direction: column;align-items: center;justify-content: center;color: #999;">
						試試看在上下左右四個角落右鍵，看看邊緣位置修正效果
					</div>
				</el-card>
			</el-col>
		</el-row>
	</el-main>

	<sc-contextmenu ref="contextmenu" @command="handleCommand" @visible-change="visibleChange">
		<sc-contextmenu-item command="a" title="返回(B)" suffix="Alt+←"></sc-contextmenu-item>
		<sc-contextmenu-item command="b" title="重新加載(R)" suffix="Ctrl+R" icon="el-icon-refresh"></sc-contextmenu-item>
		<sc-contextmenu-item title="切換兼容性模式" divided>
			<sc-contextmenu-item command="c1" title="二級選單1"></sc-contextmenu-item>
			<sc-contextmenu-item title="二級選單2">
				<sc-contextmenu-item command="c2-1" title="三級選單1"></sc-contextmenu-item>
				<sc-contextmenu-item command="c2-2" title="三級選單2"></sc-contextmenu-item>
				<sc-contextmenu-item command="c2-3" title="三級選單3"></sc-contextmenu-item>
			</sc-contextmenu-item>
			<sc-contextmenu-item command="c3" title="二級選單3"></sc-contextmenu-item>
		</sc-contextmenu-item>
		<sc-contextmenu-item  command="d" title="屬性(P)" divided :disabled="row&&row.state==0"></sc-contextmenu-item>
		<sc-contextmenu-item  command="e" title="設置state=1" v-if="row&&row.state==0"></sc-contextmenu-item>
	</sc-contextmenu>

</template>

<script>
	import scContextmenu from '@/components/scContextmenu'
	import scContextmenuItem from '@/components/scContextmenu/item'
	export default {
		name: 'contextmenu',
		components: {
			scContextmenu,
			scContextmenuItem
		},
		data() {
			return {
				row: null,
				tableData: [
					{
						id: '1',
						name: 'Sakuya',
						date: '2021-10-10',
						state: 1
					},
					{
						id: '2',
						name: 'Lolowan(此行右鍵屬性禁用)',
						date: '2021-10-09',
						state: 0
					},
					{
						id: '3',
						name: 'Ali',
						date: '2021-10-08',
						state: 1
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			rowContextmenu(row, column, event){
				this.row = row
				this.$refs.table.setCurrentRow(row);
				this.$refs.contextmenu.openMenu(event)
			},
			openMenu(e){
				this.row = null
				this.$refs.contextmenu.openMenu(e)
			},
			handleCommand(command){
				this.$message('click on item ' + command)
				if(command == 'e'){
					this.row.state = 1
				}
			},
			visibleChange(visible){
				if(!visible){
					this.$refs.table.setCurrentRow();
				}
			}
		}
	}
</script>

<style scoped>
</style>
