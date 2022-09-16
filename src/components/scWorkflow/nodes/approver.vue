<template>
	<div class="node-wrap">
		<div class="node-wrap-box" @click="show">
			<div class="title" style="background: #ff943e;">
				<el-icon class="icon"><el-icon-user-filled /></el-icon>
				<span>{{ nodeConfig.nodeName }}</span>
				<el-icon class="close" @click.stop="delNode()"><el-icon-close /></el-icon>
			</div>
			<div class="content">
				<span v-if="toText(nodeConfig)">{{ toText(nodeConfig) }}</span>
				<span v-else class="placeholder">請選擇</span>
			</div>
		</div>
		<add-node v-model="nodeConfig.childNode"></add-node>
		<el-drawer title="審批人設置" v-model="drawer" destroy-on-close append-to-body :size="500">
			<template #header>
				<div class="node-wrap-drawer__title">
					<label @click="editTitle" v-if="!isEditTitle">{{form.nodeName}}<el-icon class="node-wrap-drawer__title-edit"><el-icon-edit /></el-icon></label>
					<el-input v-if="isEditTitle" ref="nodeTitle" v-model="form.nodeName" clearable @blur="saveTitle" @keyup.enter="saveTitle"></el-input>
				</div>
			</template>
			<el-container>
				<el-main style="padding:0 20px 20px 20px">
					<el-form label-position="top">

						<el-form-item label="審批人員類型">
							<el-select v-model="form.setType">
								<el-option :value="1" label="指定成員"></el-option>
								<el-option :value="2" label="主管"></el-option>
								<el-option :value="3" label="角色"></el-option>
								<el-option :value="4" label="發起人自選"></el-option>
								<el-option :value="5" label="發起人自己"></el-option>
								<el-option :value="7" label="連續多級主管"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item v-if="form.setType==1" label="選擇成員">
							<el-button type="primary" icon="el-icon-plus" round @click="selectHandle(1, form.nodeUserList)">選擇人員</el-button>
							<div class="tags-list">
								<el-tag v-for="(user, index) in form.nodeUserList" :key="user.id" closable @close="delUser(index)">{{user.name}}</el-tag>
							</div>
						</el-form-item>

						<el-form-item v-if="form.setType==2" label="指定主管">
							發起人的第  <el-input-number v-model="form.examineLevel" :min="1"/>  級主管
						</el-form-item>

						<el-form-item v-if="form.setType==3" label="選擇角色">
							<el-button type="primary" icon="el-icon-plus" round @click="selectHandle(2, form.nodeRoleList)">選擇角色</el-button>
							<div class="tags-list">
								<el-tag v-for="(role, index) in form.nodeRoleList" :key="role.id" type="info" closable @close="delRole(index)">{{role.name}}</el-tag>
							</div>
						</el-form-item>

						<el-form-item v-if="form.setType==4" label="發起人自選">
							<el-radio-group v-model="form.selectMode">
								<el-radio :label="1">自選一個人</el-radio>
								<el-radio :label="2">自選多個人</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item v-if="form.setType==7" label="連續主管審批終點">
							<el-radio-group v-model="form.directorMode">
								<el-radio :label="0">直到最上層主管</el-radio>
								<el-radio :label="1">自定義審批終點</el-radio>
							</el-radio-group>
							<p v-if="form.directorMode==1">直到發起人的第  <el-input-number v-model="form.directorLevel" :min="1"/> 級主管</p>
						</el-form-item>

						<el-divider></el-divider>
						<el-form-item label="">
							<el-checkbox v-model="form.termAuto" label="超時自動審批"></el-checkbox>
						</el-form-item>
						<template v-if="form.termAuto">
							<el-form-item label="審批期限（為 0 則不生效）">
								<el-input-number v-model="form.term" :min="0"/> 小時
							</el-form-item>
							<el-form-item label="審批期限超時後執行">
								<el-radio-group v-model="form.termMode">
									<el-radio :label="0">自動通過</el-radio>
									<el-radio :label="1">自動拒絕</el-radio>
								</el-radio-group>
							</el-form-item>
						</template>
						<el-divider></el-divider>
						<el-form-item label="多人審批時審批方式">
							<el-radio-group v-model="form.examineMode">
								<p style="width: 100%;"><el-radio :label="1">按順序依次審批</el-radio></p>
								<p style="width: 100%;"><el-radio :label="2">會簽 (可同時審批，每個人必須審批通過)</el-radio></p>
								<p style="width: 100%;"><el-radio :label="3">或簽 (有一人審批通過即可)</el-radio></p>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</el-main>
				<el-footer>
					<el-button type="primary" @click="save">保存</el-button>
					<el-button @click="drawer=false">取消</el-button>
				</el-footer>
			</el-container>
		</el-drawer>
	</div>
</template>

<script>
	import addNode from './addNode'

	export default {
		inject: ['select'],
		props: {
			modelValue: { type: Object, default: () => {} }
		},
		components: {
			addNode
		},
		data() {
			return {
				nodeConfig: {},
				drawer: false,
				isEditTitle: false,
				form: {}
			}
		},
		watch:{
			modelValue(){
				this.nodeConfig = this.modelValue
			}
		},
		mounted() {
			this.nodeConfig = this.modelValue
		},
		methods: {
			show(){
				this.form = {}
				this.form = JSON.parse(JSON.stringify(this.nodeConfig))
				this.drawer = true
			},
			editTitle(){
				this.isEditTitle = true
				this.$nextTick(()=>{
					this.$refs.nodeTitle.focus()
				})
			},
			saveTitle(){
				this.isEditTitle = false
			},
			save(){
				this.$emit("update:modelValue", this.form)
				this.drawer = false
			},
			delNode(){
				this.$emit("update:modelValue", this.nodeConfig.childNode)
			},
			delUser(index){
				this.form.nodeUserList.splice(index, 1)
			},
			delRole(index){
				this.form.nodeRoleList.splice(index, 1)
			},
			selectHandle(type, data){
				this.select(type, data)
			},
			toText(nodeConfig){
				if(nodeConfig.setType == 1){
					if (nodeConfig.nodeUserList && nodeConfig.nodeUserList.length>0) {
						const users = nodeConfig.nodeUserList.map(item=>item.name).join("、")
						return users
					}else{
						return false
					}
				}else if (nodeConfig.setType == 2) {
					return nodeConfig.examineLevel == 1 ? '直接主管' : `發起人的第${nodeConfig.examineLevel}級主管`
				}else if (nodeConfig.setType == 3) {
					if (nodeConfig.nodeRoleList && nodeConfig.nodeRoleList.length>0) {
						const roles = nodeConfig.nodeRoleList.map(item=>item.name).join("、")
						return '角色-' + roles
					}else{
						return false
					}
				}else if (nodeConfig.setType == 4) {
					return "發起人自選"
				}else if (nodeConfig.setType == 5) {
					return "發起人自己"
				}else if (nodeConfig.setType == 7) {
					return "連續多級主管"
				}
			}
		}
	}
</script>

<style>

</style>
