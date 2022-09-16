<template>
	<el-card shadow="hover" header="版本資訊">
		<div style="height: 210px;text-align: center;">
			<img src="img/ver.svg" style="height:140px"/>
			<h2 style="margin-top: 15px;">CSIAdmin {{$CONFIG.APP_VER}}</h2>
			<p style="margin-top: 5px;">最新版本 {{ver}}</p>
		</div>
	</el-card>
</template>

<script>
	export default {
		title: "版本資訊",
		icon: "el-icon-monitor",
		description: "目前項目版本資訊",
		data() {
			return {
				ver: 'loading...'
			}
		},
		mounted() {
			this.getVer()
		},
		methods: {
			async getVer(){
				const ver = await this.$API.demo.ver.get()
				this.ver = ver.data
			},
		}
	}
</script>
