<template>
	<el-main>
		<el-card shadow="never" header="v-auth 高精度權限控制">
			<el-button v-auth="'user.add'" type="primary">v-auth="'user.add'"</el-button>
			<el-button v-auth="['user.no','user.add']" type="primary">v-auth="['user.no','user.add']"</el-button>
			<el-alert title="v-auth指令 是$AUTH的語法糖, 原先需要使用v-if來判斷是否有權限, 使用指令將減少代碼冗余. 並且支持傳入數組,有一項滿足就判斷有權限" style="margin-top: 20px;"></el-alert>
		</el-card>
		<el-card shadow="never" header="v-role 角色權限控制" style="margin-top: 15px;">
			<el-button v-role="'BusinessAdmin'" type="primary">v-role="'BusinessAdmin'"</el-button>
			<el-button v-role="['SystemAdmin','Auditor']" type="primary">v-role="['SystemAdmin','Auditor']"</el-button>
			<el-alert title="v-role指令 是$ROLE的語法糖, 原理是判斷是否含有用戶所在的角色別名" style="margin-top: 20px;"></el-alert>
		</el-card>
		<el-card shadow="never" header="v-time 時間轉換" style="margin-top: 15px;">
			<p>
				<el-tag v-time="1630117968295" format="yyyy-MM-dd hh:mm:ss"></el-tag>
			</p>
			<p style="margin-top: 15px;">
				<el-tag v-time.tip="time1"></el-tag>
			</p>
			<p style="margin-top: 15px;">
				<el-tag v-time.tip="time2"></el-tag>
			</p>
			<p style="margin-top: 15px;">
				<el-tag v-time.tip="time3"></el-tag>
			</p>
			<el-alert title="指令方式日期時間轉換,如設置'tip'修飾符將會轉換成相對時間,並且每60秒自動更新" style="margin-top: 20px;"></el-alert>
		</el-card>
		<el-card shadow="never" header="v-copy 一鍵複製" style="margin-top: 15px;">
			<el-input type="textarea" :rows="2" placeholder="請輸入內容" v-model="copyText"></el-input>
			<el-button v-copy="copyText" type="primary" style="margin-top: 15px;">複製</el-button>
			<el-alert title="點擊複製按鈕會將文本框綁定的值複製到剪切板, 試著粘貼到其他地方看看效果" style="margin-top: 20px;"></el-alert>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'directive',
		data() {
			return {
				time1: new Date(),
				time2: new Date().setMinutes(new Date().getMinutes()-1),
				time3: new Date().setMinutes(new Date().getMinutes()-120),
				copyText: '測試複製內容'
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
