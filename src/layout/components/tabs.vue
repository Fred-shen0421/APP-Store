<template>
	<div class="adminui-tabs">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="1">所有</el-menu-item>
        <el-menu-item index="2">手機</el-menu-item>
        <el-menu-item index="3">平板</el-menu-item>
        <el-menu-item index="4">穿戴裝置</el-menu-item>
        <!-- <el-button type="primary" icon="el-icon-search"></el-button> -->
      </el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style scoped>
  .el-menu-demo{
    width: 100%;
    height: 3rem;
    /* background-color: rgb(65, 65, 243); */
  }
</style>
