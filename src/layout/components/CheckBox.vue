<template>
	<div class="adminui-checkbox">
    <el-checkbox label="全部" />
    <el-checkbox label="已發布" />
    <el-checkbox label="未發布" />
    <el-checkbox label="IOS" />
    <el-checkbox label="ANDROID" />
    <el-checkbox label="MS" />
  </div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
		}
	}
</script>

<style>
  .adminui-checkbox {
    width: 100%;
    height: 3rem;
    border: 1px solid red;
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: blue; */
  }

  /* @media (min-width: 390px) {
    .adminui-checkbox {
      max-width: 100%;
    }
  } */
  
  /* .el-checkbox__label {
    color: white;
  } */
</style>
