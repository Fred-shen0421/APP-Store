<template>
	<el-row :gutter="40">
		<el-col v-if="!form.id">
			<el-empty description="請選擇左側選單後操作" :image-size="100"></el-empty>
		</el-col>
		<template v-else>
			<el-col :lg="12">
				<h2>{{form.meta.title || "新增選單"}}</h2>
				<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
					<el-form-item label="顯示名稱" prop="meta.title">
						<el-input v-model="form.meta.title" clearable placeholder="選單顯示名字"></el-input>
					</el-form-item>
					<el-form-item label="上級選單" prop="parentId">
						<el-cascader v-model="form.parentId" :options="menuOptions" :props="menuProps" :show-all-levels="false" placeholder="頂級選單" clearable disabled></el-cascader>
					</el-form-item>
					<el-form-item label="類型" prop="meta.type">
						<el-radio-group v-model="form.meta.type">
							<el-radio-button label="menu">選單</el-radio-button>
							<el-radio-button label="iframe">Iframe</el-radio-button>
							<el-radio-button label="link">外鏈</el-radio-button>
							<el-radio-button label="button">按鈕</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="別名" prop="name">
						<el-input v-model="form.name" clearable placeholder="選單別名"></el-input>
						<div class="el-form-item-msg">系統唯一且與內置組件名一致，否則導致緩存失效。如類型為Iframe的選單，別名將代替源地址顯示在地址欄</div>
					</el-form-item>
					<el-form-item label="選單圖標" prop="meta.icon">
						<sc-icon-select v-model="form.meta.icon" clearable></sc-icon-select>
					</el-form-item>
					<el-form-item label="路由地址" prop="path">
						<el-input v-model="form.path" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="重定向" prop="redirect">
						<el-input v-model="form.redirect" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="選單高亮" prop="active">
						<el-input v-model="form.active" clearable placeholder=""></el-input>
						<div class="el-form-item-msg">子節點或詳情頁需要高亮的上級選單路由地址</div>
					</el-form-item>
					<el-form-item label="視圖" prop="component">
						<el-input v-model="form.component" clearable placeholder="">
							<template #prepend>views/</template>
						</el-input>
						<div class="el-form-item-msg">如父節點、鏈接或Iframe等沒有視圖的選單不需要填寫</div>
					</el-form-item>
					<el-form-item label="顏色" prop="color">
						<el-color-picker v-model="form.meta.color" :predefine="predefineColors"></el-color-picker>

					</el-form-item>
					<el-form-item label="是否隱藏" prop="meta.hidden">
						<el-checkbox v-model="form.meta.hidden">隱藏選單</el-checkbox>
						<el-checkbox v-model="form.meta.hiddenBreadcrumb">隱藏麵包屑</el-checkbox>
						<div class="el-form-item-msg">選單不顯示在導航中，但用戶依然可以訪問，例如詳情頁</div>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save" :loading="loading">保 存</el-button>
					</el-form-item>
				</el-form>

			</el-col>
			<el-col :lg="12" class="apilist">
				<h2>接口權限</h2>
				<sc-form-table v-model="form.apiList" :addTemplate="apiListAddTemplate" placeholder="暫無匹配接口權限">
					<el-table-column prop="code" label="標識" width="150">
						<template #default="scope">
							<el-input v-model="scope.row.code" placeholder="請輸入內容"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="url" label="Api url">
						<template #default="scope">
							<el-input v-model="scope.row.url" placeholder="請輸入內容"></el-input>
						</template>
					</el-table-column>
				</sc-form-table>
			</el-col>
		</template>
	</el-row>

</template>

<script>
	import scIconSelect from '@/components/scIconSelect'

	export default {
		components: {
			scIconSelect
		},
		props: {
			menu: { type: Object, default: () => {} },
		},
		data(){
			return {
				form: {
					id: "",
					parentId: "",
					name: "",
					path: "",
					component: "",
					redirect: "",
					meta:{
						title: "",
						icon: "",
						active: "",
						color: "",
						type: "menu"
					},
					apiList: []
				},
				menuOptions: [],
				menuProps: {
					value: 'id',
					label: 'title',
					checkStrictly: true
				},
				predefineColors: [
					'#ff4500',
					'#ff8c00',
					'#ffd700',
					'#67C23A',
					'#00ced1',
					'#409EFF',
					'#c71585'
				],
				rules: [],
				apiListAddTemplate: {
					code: "",
					url: ""
				},
				loading: false
			}
		},
		watch: {
			menu: {
				handler(){
					this.menuOptions = this.treeToMap(this.menu)
				},
				deep: true
			}
		},
		mounted() {

		},
		methods: {
			//簡單化選單
			treeToMap(tree){
				const map = []
				tree.forEach(item => {
					var obj = {
						id: item.id,
						parentId: item.parentId,
						title: item.meta.title,
						children: item.children&&item.children.length>0 ? this.treeToMap(item.children) : null
					}
					map.push(obj)
				})
				return map
			},
			//保存
			async save(){
				this.loading = true
				var res = await this.$API.demo.post.post(this.form)
				this.loading = false
				if(res.code == 200){
					this.$message.success("保存成功")
				}else{
					this.$message.warning(res.message)
				}
			},
			//表單注入資料
			setData(data, pid){
				this.form = data
				this.form.apiList = data.apiList || []
				this.form.parentId = pid
			}
		}
	}
</script>

<style scoped>
	h2 {font-size: 17px;color: #3c4a54;padding:0 0 30px 0;}
	.apilist {border-left: 1px solid #eee;}

	[data-theme="dark"] h2 {color: #fff;}
	[data-theme="dark"] .apilist {border-color: #434343;}
</style>
