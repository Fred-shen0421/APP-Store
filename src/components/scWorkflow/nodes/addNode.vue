<template>
	 <div class="add-node-btn-box">
	 	<div class="add-node-btn">
			<el-popover placement="right-start" :width="270" trigger="click" :hide-after="0" :show-after="0">
				<template #reference>
					<el-button type="primary" icon="el-icon-plus" circle></el-button>
				</template>
				<div class="add-node-popover-body">
					<ul>
						<li>
							<el-icon style="color: #ff943e;" @click="addType(1)"><el-icon-user-filled /></el-icon>
							<p>審批節點</p>
						</li>
						<li>
							<el-icon style="color: #3296fa;" @click="addType(2)"><el-icon-promotion /></el-icon>
							<p>抄送節點</p>
						</li>
						<li>
							<el-icon style="color: #15BC83;" @click="addType(4)"><el-icon-share /></el-icon>
							<p>條件分支</p>
						</li>
					</ul>
				</div>
			</el-popover>
	 	</div>
	 </div>
</template>

<script>
	export default {
		props: {
			modelValue: { type: Object, default: () => {} }
		},
		data() {
			return {
				
			}
		},
		mounted() {

		},
		methods: {
			addType(type){
				var node = {}
				if (type == 1) {
					node = {
						nodeName: "審核人",
						type: 1,			//節點類型
						setType: 1,			//審核人類型
						nodeUserList: [],	//審核人成員
						nodeRoleList: [],	//審核角色
						examineLevel: 1,	//指定主管層級
						directorLevel: 1,	//自定義連續主管審批層級
						selectMode: 1,		//發起人自選類型
						termAuto: false,	//審批期限超時自動審批
						term: 0,			//審批期限
						termMode: 1,		//審批期限超時後執行類型
						examineMode: 1,		//多人審批時審批方式
						directorMode: 0,	//連續主管審批方式
						childNode: this.modelValue
					}
				}else if(type == 2){
					node = {
						nodeName: "抄送人",
						type: 2,
						userSelectFlag: true,
						nodeUserList: [],
						childNode: this.modelValue
					}

				}else if(type == 4){
					node = {
						nodeName: "條件路由",
						type: 4,
						conditionNodes: [
							{
								nodeName: "條件1",
								type: 3,
								priorityLevel: 1,
								conditionMode: 1,
								conditionList: []
							},
							{
								nodeName: "條件2",
								type: 3,
								priorityLevel: 2,
								conditionMode: 1,
								conditionList: []
							}
						],
						childNode: this.modelValue
					}

				}
				this.$emit("update:modelValue", node)
			}
		}
	}
</script>

<style>
</style>
