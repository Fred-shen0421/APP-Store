<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never" header="導入(使用mock,有50%幾率導入失敗)">
					<sc-file-import :apiObj="$API.common.importFile" templateUrl="/file.xlsx" @success="success"></sc-file-import>
					<sc-file-import :apiObj="$API.common.importFile" :data="{otherData:'demo'}" templateUrl="/file.xlsx" accept=".xls, .xlsx" :maxSize="30" tip="請上傳小於或等於 30M 的 .xls, .xlsx 格式文件(自定義TIP)" @success="success">
						<template #default="{open}">
							<el-button type="primary" icon="sc-icon-upload" @click="open">導入(全配置)</el-button>
						</template>
						<template #uploader>
							<el-icon class="el-icon--upload"><sc-icon-file-excel /></el-icon>
							<div class="el-upload__text">
								將文件拖到此處或 <em>點擊選擇文件上傳</em>
							</div>
						</template>
						<template #form="{formData}">
							<el-form-item label="覆蓋已有資料">
								<el-switch v-model="formData.coverage" />
							</el-form-item>
							<el-form-item label="跳過錯誤資料">
								<el-switch v-model="formData.skipError" />
							</el-form-item>
						</template>
					</sc-file-import>
					<el-descriptions :column="1" border size="small" style="margin-top: 15px;">
						<el-descriptions-item label="apiObj" :width="200">Object 文件上傳接口對像</el-descriptions-item>
						<el-descriptions-item label="data">Object 上傳時附帶的額外參數</el-descriptions-item>
						<el-descriptions-item label="accept">String 可選擇文件類型，默認為".xls, .xlsx"</el-descriptions-item>
						<el-descriptions-item label="maxSize">Number 可選擇文件大小，單位為M，默認為10</el-descriptions-item>
						<el-descriptions-item label="tip">String 上傳框底下的提示語句，默認為"請上傳小於或等於 {maxSize}M 的 {accept} 格式文件"</el-descriptions-item>
						<el-descriptions-item label="templateUrl">String 模板的下載URL</el-descriptions-item>
						<el-descriptions-item label="@success">事件 上傳接口返回的事件，返回function(res, close)，執行close()將關閉窗口</el-descriptions-item>
						<el-descriptions-item label='#default="{open}"'>插糟 默認觸發按鈕插糟，返回open()打開窗口函數，可以綁定元素@click事件</el-descriptions-item>
						<el-descriptions-item label='#uploader'>插糟 自定義上傳框插槽</el-descriptions-item>
						<el-descriptions-item label='#form="{formData}"'>插糟 自定義表單組件，插槽formData都將作為上傳時附帶的額外參數</el-descriptions-item>
					</el-descriptions>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="導出">
					<sc-file-export :apiObj="$API.common.exportFile"></sc-file-export>
					<sc-file-export :apiObj="$API.common.exportFile" fileName="人員列表(異步)" async>
						<template #default="{open}">
							<el-button type="primary" icon="sc-icon-download" @click="open">導出(異步)</el-button>
						</template>
					</sc-file-export>
					<sc-file-export :apiObj="$API.common.exportFile" blob fileName="人員列表" :data="{otherData:'demo'}" showData :column="column" :fileTypes="['xlsx','docx','pdf']">
						<template #default="{open}">
							<el-button type="primary" icon="sc-icon-download" @click="open">導出(blob文件流)</el-button>
						</template>
						<template #form="{formData}">
							<el-form-item label="導出條數">
								<el-select v-model="formData.limit" placeholder="Select">
									<el-option label="100條" value="100" />
									<el-option label="500條" value="500" />
									<el-option label="1000條" value="1000" />
									<el-option label="5000條" value="5000" />
									<el-option label="10000條" value="10000" />
								</el-select>
							</el-form-item>
						</template>
					</sc-file-export>
					<el-descriptions :column="1" border size="small" style="margin-top: 15px;">
						<el-descriptions-item label="apiObj" :width="200">Object 文件導出接口對象，通過apiObj.url請求文件</el-descriptions-item>
						<el-descriptions-item label="data">Object 上傳時附帶的額外參數(可為資料表格的過濾項)</el-descriptions-item>
						<el-descriptions-item label="showData">Boolean 是否顯示附帶的額外參數</el-descriptions-item>
						<el-descriptions-item label="async">Boolean 是否異步導出文件</el-descriptions-item>
						<el-descriptions-item label="fileName">String 下載文件名稱，默認為當前時間戳</el-descriptions-item>
						<el-descriptions-item label="fileTypes">Array 可選擇文件類型，默認為['xlsx']，組件將數組第一項當做已選項</el-descriptions-item>
						<el-descriptions-item label="column">Array 列配置，請求文件時將添加column為key的參數，值為prop逗號","分割的字符串</el-descriptions-item>
						<el-descriptions-item label="blob">Boolean 是否由遊覽器請求文件返回blob後提供下載</el-descriptions-item>
						<el-descriptions-item label="progress">Boolean blob開啟後是否顯示下載文件進度條，當服務器啟用Gzip時，建議關閉，因為獲取到的文件總數和下載總數不匹配。</el-descriptions-item>

						<el-descriptions-item label='#default="{open}"'>插糟 默認觸發按鈕插糟，返回open()打開窗口函數，可以綁定元素@click事件</el-descriptions-item>
						<el-descriptions-item label='#form="{formData}"'>插糟 自定義表單組件，插槽formData都將作為請求時附帶的額外參數</el-descriptions-item>
					</el-descriptions>
				</el-card>
			</el-col>
		</el-row>
	</el-main>

	<el-dialog v-model="importErrDialogVisible" title="導入失敗" :width="680" destroy-on-close @closed="()=>{importErrData={}}">
		<el-alert :title="`總條目數 ${importErrData.ok} ,其中有 ${importErrData.fail} 條格式不滿足導入要求，請修改後再次操作。`" type="error" show-icon :closable="false"/>
		<div style="margin-top: 15px;">
			<el-table :data="importErrData.failList" border stripe max-height="270" style="width: 100%">
				<el-table-column prop="keyName" label="主鍵名" width="180" />
				<el-table-column prop="" label="狀態" width="100" >
					<el-tag type="danger"><el-icon><el-icon-circle-close-filled/></el-icon> 失敗</el-tag>
				</el-table-column>
				<el-table-column prop="reason" label="原因" />
			</el-table>
		</div>
		<template #footer>
			<el-button type="primary" @click="importErrDialogVisible=false">我知道了</el-button>
		</template>
	</el-dialog>

</template>

<script>
	import scFileImport from '@/components/scFileImport'
	import scFileExport from '@/components/scFileExport'

	export default {
		name: 'importexport',
		components: {
			scFileImport,
			scFileExport
		},
		data() {
			return {
				importErrDialogVisible: false,
				importErrData: {},
				column: [
					{
						label: "姓名",
						prop: "name"
					},
					{
						label: "性別",
						prop: "sex"
					},
					{
						label: "評分",
						prop: "num"
					},
					{
						label: "郵箱",
						prop: "email",
						hide: true
					},
					{
						label: "進度",
						prop: "progress"
					},
					{
						label: "註冊時間",
						prop: "datetime"
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			success(res, close){
				if(res.code==200){
					this.$alert("導入返回成功後，可後續操作，比如刷新表格等。執行回調函數close()可關閉上傳窗口。", "導入成功", {
						type: "success",
						showClose: false,
						center: true
					})
					close()
				}else{
					//返回失敗後的自定義操作，這裡演示顯示錯誤的條目
					this.importErrDialogVisible = true
					this.importErrData = res.data
				}

			}
		}
	}
</script>

<style>

</style>
