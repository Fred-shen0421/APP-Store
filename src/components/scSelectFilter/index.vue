<!--
 * @Descripttion: 分類篩選器
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2022年5月26日15:59:52
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<div class="sc-select-filter">
		<div v-if="data.length<=0" class="sc-select-filter__no-data">
			暫無資料
		</div>
		<div v-for="item in data" :key="item.key" class="sc-select-filter__item">
			<div class="sc-select-filter__item-title" :style="{'width':labelWidth+'px'}"><label>{{item.title}}：</label></div>
			<div class="sc-select-filter__item-options">
				<ul>
					<li :class="{'active':selected[item.key]&&selected[item.key].includes(option.value)}" v-for="option in item.options" :key="option.value" @click="select(option, item)">
						<el-icon v-if="option.icon"><component :is="option.icon" /></el-icon>
						<span>{{option.label}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			data: { type: Array, default: () => [] },
			selectedValues: { type: Object, default: () => { return {} } },
			labelWidth: {type: Number, default: 80},
			outputValueTypeToArray: { type: Boolean, default: false }
		},
		data() {
			return {
				selected: {}
			}
		},
		watch:{
			data(val) {
				val.forEach(item => {
					this.selected[item.key] = this.selectedValues[item.key] || [item.options[0].value]
				})
			}
		},
		computed: {
			selectedString() {
				var outputData = JSON.parse(JSON.stringify(this.selected))
				for (var key in outputData) {
					outputData[key] = outputData[key].join(",")
				}
				return outputData
			}
		},
		mounted() {
			//默認賦值
			this.data.forEach(item => {
				this.selected[item.key] = this.selectedValues[item.key] || [item.options[0].value]
			})
		},
		methods: {
			select(option, item){
				//判斷單選多選
				if(item.multiple){
					//如果多選選擇的第一個
					if(option.value === item.options[0].value){
						//就賦值第一個的值
						this.selected[item.key] = [option.value]
					}else{
						//如果選擇的值已有
						if(this.selected[item.key].includes(option.value)){
							//刪除選擇的值
							this.selected[item.key].splice(this.selected[item.key].findIndex(s => s === option.value), 1)
							//當全刪光時，把第一個選中
							if(this.selected[item.key].length == 0){
								this.selected[item.key] = [item.options[0].value]
							}
						}else{
							//未有值的時候，追加選中值
							this.selected[item.key].push(option.value)
							//當含有第一個的值的時候，把第一個刪除
							if(this.selected[item.key].includes(item.options[0].value)){
								this.selected[item.key].splice(this.selected[item.key].findIndex(s => s === item.options[0].value), 1)
							}
						}
					}
				}else{
					//單選時，如果點擊了已有值就賦值
					if(!this.selected[item.key].includes(option.value)){
						this.selected[item.key] = [option.value]
					}else{
						return false
					}
				}
				this.change()
			},
			change(){
				if(this.outputValueTypeToArray){
					this.$emit('onChange', this.selected)
				}else{
					this.$emit('onChange', this.selectedString)
				}
			}
		}
	}
</script>

<style scoped>
	.sc-select-filter {width: 100%;}
	.sc-select-filter__item {display: flex;}
	.sc-select-filter__item-title {width: 80px;}
	.sc-select-filter__item-title label {font-size: 14px;padding-top:13px;display: inline-block;color: #999;}
	.sc-select-filter__item-options {flex: 1;border-bottom: 1px dashed var(--el-border-color-light);}
	.sc-select-filter__item-options ul {display: flex;flex-wrap: wrap;padding-top: 10px;}
	.sc-select-filter__item-options li {list-style: none;cursor: pointer;height:28px;padding:0 15px;border-radius:32px;margin: 0 10px 10px 0;display: flex;align-items: center;background: var(--el-color-primary-light-9);}
	.sc-select-filter__item-options li .el-icon {margin-right: 3px;font-size: 16px;}
	.sc-select-filter__item-options li:hover {color: var(--el-color-primary);}
	.sc-select-filter__item-options li.active {background: var(--el-color-primary);color: #fff;font-weight: bold;}
	.sc-select-filter__item:last-of-type .sc-select-filter__item-options {border: 0;}

	.sc-select-filter__no-data {color: #999;}
</style>
