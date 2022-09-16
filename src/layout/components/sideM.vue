<template>
	<!-- <div ref="" class="mobile-nav-button" @click="showMobileNav($event)" v-drag draggable="false">
		<el-icon><el-icon-menu /></el-icon>
		<el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item class="el-menu-item" index="1">所有</el-menu-item>
        <el-menu-item class="el-menu-item" index="2">手機</el-menu-item>
        <el-menu-item class="el-menu-item" index="3">平板</el-menu-item>
      </el-menu>
	</div> -->

	<el-drawer ref="mobileNavBox" title="移動端選單" :size="240" v-model="nav" direction="ltr" :with-header="false" destroy-on-close>
		<el-container class="mobile-nav">
			<el-header>
				<div class="logo-bar"><img class="logo" src="img/csi_logo.jpg"><span>{{ $CONFIG.APP_NAME }}{{ $CONFIG.APP_NAME_SUB }}</span></div>
			</el-header>
			<el-main>
				<el-scrollbar>
					<el-menu :default-active="$route.meta.active || $route.fullPath" @select="select" router background-color="#212d3d" text-color="#fff" active-text-color="#409EFF">
						<NavMenu :navMenus="menu"></NavMenu>
					</el-menu>
				</el-scrollbar>
			</el-main>
		</el-container>
	</el-drawer>

</template>

<script>
	import NavMenu from './NavMenu.vue';

	export default {
		components: {
			NavMenu
		},
		data() {
			return {
				nav: false,
				menu: []
			}
		},
		computed:{

		},
		created() {
			var menu = this.$router.sc_getMenu()
			this.menu = this.filterUrl(menu)
		},

		watch: {

		},
		methods: {
			// showMobileNav(e){
			// 	var isdrag = e.currentTarget.getAttribute('drag-flag')
			// 	if (isdrag == 'true') {
			// 		return false;
			// 	}else{
			// 		this.nav = true;
			// 	}

			// },
			select(){
				this.$refs.mobileNavBox.handleClose()
			},
			//轉換外部鏈接的路由
			filterUrl(map){
				var newMap = []
				map && map.forEach(item => {
					item.meta = item.meta?item.meta:{};
					//處理隱藏
					if(item.meta.hidden || item.meta.type=="button"){
						return false
					}
					//處理http
					if(item.meta.type=='iframe'){
						item.path = `/i/${item.name}`;
					}
					//遞歸循環
					if(item.children&&item.children.length > 0){
						item.children = this.filterUrl(item.children);
					}
					newMap.push(item)
				})
				return newMap;
			}
		},
		directives: {
			drag(el){
				let oDiv = el; //目前元素
				let firstTime='',lastTime='';
				//禁止選擇網頁上的文字
				// document.onselectstart = function() {
				// 	return false;
				// };
				oDiv.onmousedown = function(e){
					//鼠標按下，計算目前元素距離可視區的距離
					let disX = e.clientX - oDiv.offsetLeft;
					let disY = e.clientY - oDiv.offsetTop;
					document.onmousemove = function(e){
						oDiv.setAttribute('drag-flag', true);
						firstTime = new Date().getTime();
						//通過事件委託，計算移動的距離
						let l = e.clientX - disX;
						let t = e.clientY - disY;

						//移動目前元素

						if(t > 0 && t < document.body.clientHeight - 50){
							oDiv.style.top = t + "px";
						}
						if(l > 0 && l < document.body.clientWidth - 50){
							oDiv.style.left = l + "px";
						}


					}
					document.onmouseup = function(){
						lastTime = new Date().getTime();
						if( (lastTime - firstTime)>200 ){
							oDiv.setAttribute('drag-flag', false);
						}
						document.onmousemove = null;
						document.onmouseup = null;
					};
					//return false不加的話可能導致黏連，就是拖到一個地方時div粘在鼠標上不下來，相當於onmouseup失效
					return false;
				};
			}
		}
	}
</script>

<style scoped>
	/* .mobile-nav-button {border: 1px solid #f20; position: fixed;bottom:0px;width: 100%;} */

	/* .el-menu-demo {display: flex; justify-content: ;} */
	/* .el-menu-item {width: 34%;} */

	.mobile-nav {background: #212d3d;}
	.mobile-nav .el-header {background: transparent;border: 0;}
	.mobile-nav .el-main {padding:0;}
	.mobile-nav .logo-bar {display: flex;align-items: center;font-weight: bold;font-size: 20px;color: #fff;}
	.mobile-nav .logo-bar img {width: 30px;margin-right: 10px;}
	.mobile-nav .el-submenu__title:hover {background: #fff!important;}
</style>
