<template>
	<el-dialog title="角色權限設置" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-tabs tab-position="top">
			<el-tab-pane label="選單權限">
				<div class="treeMain">
					<el-tree ref="menu" node-key="name" :data="menu.list" :props="menu.props" show-checkbox></el-tree>
				</div>
			</el-tab-pane>
			<el-tab-pane label="資料權限">
				<el-form label-width="100px" label-position="left">
					<el-form-item label="規則類型">
						<el-select v-model="data.dataType" placeholder="請選擇">
							<el-option label="全部可見" value="1"></el-option>
							<el-option label="本人可見" value="2"></el-option>
							<el-option label="所在部門可見" value="3"></el-option>
							<el-option label="所在部門及子級可見" value="4"></el-option>
							<el-option label="選擇的部門可見" value="5"></el-option>
							<el-option label="自定義" value="6"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="選擇部門" v-show="data.dataType=='5'">
						<div class="treeMain" style="width: 100%;">
							<el-tree ref="dept" node-key="id" :data="data.list" :props="data.props" show-checkbox></el-tree>
						</div>
					</el-form-item>
					<el-form-item label="規則值" v-show="data.dataType=='6'">
						<el-input v-model="data.rule" clearable type="textarea" :rows="6" placeholder="請輸入自定義規則代碼"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="控制台">
				<el-form label-width="100px" label-position="left">
					<el-form-item label="控制台視圖">
						<el-select v-model="dashboard" placeholder="請選擇">
							<el-option v-for="item in dashboardOptions" :key="item.value" :label="item.label" :value="item.value">
								<span style="float: left">{{ item.label }}</span>
								<span style="float: right; color: #8492a6; font-size: 12px">{{ item.views }}</span>
							</el-option>
						</el-select>
						<div class="el-form-item-msg">用於控制角色登錄後控制台的視圖</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				visible: false,
				isSaveing: false,
				menu: {
					list: [],
					checked: [],
					props: {
						label: (data)=>{
							return data.meta.title
						}
					}
				},
				data: {
					dataType :"1",
					list: [],
					checked: [],
					props: {},
					rule: ""
				},
				dashboard: "0",
				dashboardOptions: [
					{
						value: '0',
						label: '資料統計',
						views: 'stats'

					},
					{
						value: '1',
						label: '工作台',
						views: 'work'
					},
				]
			}
		},
		mounted() {
			this.getMenu()
			this.getDept()
		},
		methods: {
			open(){
				this.visible = true;
			},
			submit(){
				this.isSaveing = true;

				//選中的和半選的合併後傳值接口
				var checkedKeys = this.$refs.menu.getCheckedKeys().concat(this.$refs.menu.getHalfCheckedKeys())
				console.log(checkedKeys)

				var checkedKeys_dept = this.$refs.dept.getCheckedKeys().concat(this.$refs.dept.getHalfCheckedKeys())
				console.log(checkedKeys_dept)

				setTimeout(()=>{
					this.isSaveing = false;
					this.visible = false;
					this.$message.success("操作成功")
					this.$emit('success')
				},1000)
			},
			async getMenu(){
				var res = await this.$API.system.menu.list.get()
				this.menu.list = res.data

				//獲取接口返回的之前選中的和半選的合併，處理過濾掉有葉子節點的key
				this.menu.checked = ["system", "user", "user.add", "user.edit", "user.del", "directive.edit", "other", "directive"]
				this.$nextTick(() => {
					let filterKeys = this.menu.checked.filter(key => this.$refs.menu.getNode(key).isLeaf)
					this.$refs.menu.setCheckedKeys(filterKeys, true)
				})
			},
			async getDept(){
				var res = await this.$API.system.dept.list.get();
				this.data.list = res.data
				this.data.checked = ["12", "2", "21", "22", "1"]
				this.$nextTick(() => {
					let filterKeys = this.data.checked.filter(key => this.$refs.dept.getNode(key).isLeaf)
					this.$refs.dept.setCheckedKeys(filterKeys, true)
				})
			}
		}
	}
</script>

<style scoped>
	.treeMain {height:280px;overflow: auto;border: 1px solid #dcdfe6;margin-bottom: 10px;}
</style>
