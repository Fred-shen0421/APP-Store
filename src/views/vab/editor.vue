<template>
	<el-main>
		<el-card shadow="never">
			<sc-editor v-model="html" placeholder="請輸入" :templates="templates" :height="400"></sc-editor>
		</el-card>
		<el-card shadow="never" header="配置" style="margin-top: 20px;">
			<el-descriptions border :column="1">
				<el-descriptions-item label="v-model">綁定的內容</el-descriptions-item>
				<el-descriptions-item label="placeholder">佔位符</el-descriptions-item>
				<el-descriptions-item label="height">編輯器高度，默認300</el-descriptions-item>
				<el-descriptions-item label="disabled">禁用編輯器 Boolean</el-descriptions-item>
				<el-descriptions-item label="templates">插入自定義模板 Array</el-descriptions-item>
				<el-descriptions-item label="toolbar">自定義工具欄，使用"|"豎槓分割，使用"\"斜槓分組，默認：'undo redo |  forecolor backcolor bold italic underline strikethrough link | blocks fontfamily fontsize | \
					alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | pagebreak | \
					image media table template preview | code selectall'</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</el-main>
</template>

<script>
	import { defineAsyncComponent } from 'vue';
	const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));

	export default {
		name: "editor",
		components: {
			scEditor
		},
		data(){
			return {
				html: '',
				templates: [
					{
						title: '自定義HTML模板',
						description: '',
						content: '<strong>演示模板</strong>'
					},
					{
						title: '列表',
						description: '',
						content: '<ol><li>演示列表1</li><li>演示列表2</li></ol>'
					}
				]
			}
		}
	}
</script>

<style>
</style>
