<template>
	<div class="user-bar">
		<!-- <div v-if="layout.screen" class="screen panel-item hidden-sm-and-down" @click="screen">
			<el-icon><el-icon-full-screen /></el-icon>
		</div> -->
		<!-- <div v-if="layout.tasks" class="tasks panel-item" @click="tasks">
			<el-icon><el-icon-sort /></el-icon>
		</div> -->
		<!-- <div v-if="layout.msg" class="msg panel-item" @click="showMsg">
			<el-badge :hidden="msgList.length==0" :value="msgList.length" class="badge" type="danger">
				<el-icon><el-icon-chat-dot-round /></el-icon>
			</el-badge>
			<el-drawer title="新消息" v-model="msg" :size="400" append-to-body destroy-on-close>
				<el-container>
					<el-main class="nopadding">
						<el-scrollbar>
							<ul class="msg-list">
								<li v-for="item in msgList" v-bind:key="item.id">
									<a :href="item.link" target="_blank">
										<div class="msg-list__icon">
											<el-badge is-dot type="danger">
												<el-avatar :size="40" :src="item.avatar"></el-avatar>
											</el-badge>
										</div>
										<div class="msg-list__main">
											<h2>{{item.title}}</h2>
											<p>{{item.describe}}</p>
										</div>
										<div class="msg-list__time">
											<p>{{item.time}}</p>
										</div>
									</a>
								</li>
								<el-empty v-if="msgList.length==0" description="暫無新消息" :image-size="100"></el-empty>
							</ul>
						</el-scrollbar>
					</el-main>
					<el-footer>
						<el-button type="primary">訊息中心</el-button>
						<el-button @click="markRead">全部設為已讀</el-button>
					</el-footer>
				</el-container>
			</el-drawer>
		</div> -->
		<el-input
      v-model="input2"
      class="w-50 m-2"
      placeholder="Please Input"
      :suffix-icon="Search"
    />

		<div class="test">
			<p>HI , 中華系統整合</p>
		</div>

		<el-dropdown class="user panel-item" trigger="click" @command="handleUser">
			<div class="user-avatar">
				<el-avatar :size="30">{{ userNameF }}</el-avatar>
				<label v-if="layout.name">{{ userName }}</label>
				<el-icon class="el-icon--right"><el-icon-arrow-down /></el-icon>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="uc">帳號資訊</el-dropdown-item>
					<el-dropdown-item command="clearCache">清除快取</el-dropdown-item>
					<el-dropdown-item divided command="outLogin">登出</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>

	<!-- <el-drawer v-model="tasksVisible" :size="450"  title="任務中心" custom-class="drawerBG" destroy-on-close>
		<tasks></tasks>
	</el-drawer> -->

</template>

<script>
	import tasks from './tasks.vue'
	import {Search} from '@element-plus/icons-vue'

	export default {
		components: {
			tasks,
			Search
		},
		data(){
			return {
				userName: "",
				userNameF: "",
				tasksVisible: false,
				msg: false,
				layout: {},
				msgList: [
					{
						id: 1,
						type: 'system',
						avatar: "img/csi_logo.jpg",
						title: "感謝登入CSI Admin",
						describe: "Vue 3.0 + Vue-Router 4.0 + ElementPlus + Axios 後台管理系統。",
						time: "2022年7月1日"
					}
				]
			}
		},
		created() {
			var userInfo = this.$TOOL.data.get("USER_INFO");
			this.userName = userInfo.name;
			this.userNameF = this.userName.substring(0,1);
			this.layout = this.$CONFIG.LAYOUT_USERBAR
		},
		methods: {
			//個人資訊
			handleUser(command) {
				if(command == "uc"){
					this.$router.push({path: '/usercenter'});
				}
				if(command == "cmd"){
					this.$router.push({path: '/cmd'});
				}
				if(command == "clearCache"){
					this.$confirm('清除快取會將系統初始化，包括登入狀態，是否繼續？','提示', {
						type: 'info',
					}).then(() => {
						const loading = this.$loading()
						this.$TOOL.data.clear()
						this.$router.replace({path: '/login'})
						setTimeout(()=>{
							loading.close()
							location.reload()
						},1000)
					}).catch(() => {
						//取消
					})
				}
				if(command == "outLogin"){
					this.$confirm('確認登出帳號？','提示', {
						type: 'warning',
						confirmButtonText: '登出',
						confirmButtonClass: 'el-button--danger'
					}).then(() => {
						this.$router.replace({path: '/login'});
					}).catch(() => {
						//取消退出
					})
				}
			},
			//全屏
			// screen(){
			// 	var element = document.documentElement;
			// 	this.$TOOL.screen(element)
			// },
			//顯示短消息
			// showMsg(){
			// 	this.msg = true
			// },
			//標記已讀
			// markRead(){
			// 	this.msgList = []
			// },
			tasks(){
				this.tasksVisible = true
			}
		}
	}
</script>

<style scoped>
	.user-bar {display: flex;align-items: center;height: 100%;}
	.user-bar .panel-item {padding: 0 10px;cursor: pointer;height: 100%;display: flex;align-items: center;}
	.user-bar .panel-item i {font-size: 16px;}
	.user-bar .panel-item:hover {background: rgba(0, 0, 0, 0.1);}
	.user-bar .user-avatar {height:49px;display: flex;align-items: center;}
	.user-bar .user-avatar label {display: inline-block;margin-left:5px;font-size: 12px;cursor:pointer;}

	.msg-list li {border-top:1px solid #eee;}
	.msg-list li a {display: flex;padding:20px;}
	.msg-list li a:hover {background: #ecf5ff;}
	.msg-list__icon {width: 40px;margin-right: 15px;}
	.msg-list__main {flex: 1;}
	.msg-list__main h2 {font-size: 15px;font-weight: normal;color: #333;}
	.msg-list__main p {font-size: 12px;color: #999;line-height: 1.8;margin-top: 5px;}
	.msg-list__time {width: 100px;text-align: right;color: #999;}

	.dark .msg-list__main h2 {color: #d0d0d0;}
	.dark .msg-list li {border-top:1px solid #363636;}
	.dark .msg-list li a:hover {background: #383838;}

	.test {
		/* border: 1px solid red; */
		padding: 10px;
		width: 200px;
	}
</style>
