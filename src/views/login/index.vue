<template>
   <!-- ======= Top Bar ======= -->
    <section id="topbar">
        <div class="top-container">
            <div class="contact-info">
				<el-icon><sc-icon-envelope-fill /></el-icon>
                <a href="mailto:csi_service@ch-si.com.tw">csi_service@ch-si.com.tw</a>
                <i>&nbsp;&nbsp;&nbsp;</i>
				<el-icon><sc-icon-telephone-fill /></el-icon>
				 0800-001-568
            </div>
            <div class="social-links">
                <a href="https://www.facebook.com/chunghwasystem/" class="facebook"><el-icon><sc-icon-facebook /></el-icon></a>
                <a href="https://www.instagram.com/chunghwa_system/" class="instagram"><el-icon><sc-icon-instagram /></el-icon></a>
                <a href="https://www.linkedin.com/company/%E4%B8%AD%E8%8F%AF%E7%B3%BB%E7%B5%B1%E6%95%B4%E5%90%88-%E8%82%A1-%E5%85%AC%E5%8F%B8" class="linkedin"><el-icon><sc-icon-linkedin /></el-icon></a>
            </div>
        </div>
    </section>

    <!-- ======= Header ======= -->
    <header id="header">
        <div class="top-container">
            <div class="logo">
                <a href="index.html"><img src="img/logo.png" alt="" class="img-fluid"></a>
            </div>
			<section class="breadcrumbs">
				<div class="title" style="padding-right: 0">{{$CONFIG.APP_NAME}}{{$CONFIG.APP_NAME_SUB}}</div>
			</section>
        </div>
    </header><!-- End Header -->

	<section class="breadcrumbs-mobile">
		<div class="top-container">
			<div class="title">{{$CONFIG.APP_NAME}}{{$CONFIG.APP_NAME_SUB}}</div>
		</div>
	</section>

	<div class="login-bg">
		<div class="login-adv" style="background-image: url(img/auth_banner.png);"></div>
		<div class="login-main">
			<div class="login-form">
				<div class="login-header">{{ $t('login.signInTitle') }}</div>
				<el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large">
					<el-form-item prop="user">
						<el-input v-model="form.user" prefix-icon="el-icon-user" clearable :placeholder="$t('login.userPlaceholder')"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="form.password" prefix-icon="el-icon-lock" clearable show-password :placeholder="$t('login.PWPlaceholder')"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login">{{ $t('login.signIn') }}</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					user: "admin",
					password: "admin",
					autologin: false
				},
				rules: {
					user: [
						{required: true, message: this.$t('login.userError'), trigger: 'blur'}
					],
					password: [
						{required: true, message: this.$t('login.PWError'), trigger: 'blur'}
					]
				},
				islogin: false,
			}
		},
		created: function() {
			this.$TOOL.cookie.remove("TOKEN")
			this.$TOOL.data.remove("USER_INFO")
			this.$TOOL.data.remove("MENU")
			this.$TOOL.data.remove("PERMISSIONS")
			this.$TOOL.data.remove("grid")
			this.$store.commit("clearViewTags")
			this.$store.commit("clearKeepLive")
			this.$store.commit("clearIframeList")
		},
		methods: {
			async login(){

				var validate = await this.$refs.loginForm.validate().catch(()=>{})
				if(!validate){ return false }

				this.islogin = true
				var data = {
					username: this.form.user,
					password: this.$TOOL.crypto.MD5(this.form.password)
				}
				//獲取token
				var user = await this.$API.auth.token.post(data)

				if(user.code === 200){
					this.$TOOL.cookie.set("TOKEN", user.data.token, {
						expires: this.form.autologin? 24*60*60 : 0
					})
					this.$TOOL.data.set("USER_INFO", user.data.userInfo)
					this.$TOOL.data.set("SYS_DATE", user.data.sysDate)										
				}else{
					this.islogin = false
					this.$message.warning(user.message)
					return false
				}
				//獲取MENU
				let menu = await this.$API.system.menu.myMenus.get()

				if(menu.code == 200){
					if(menu.data.menu.length==0){
						this.islogin = false
						this.$alert("目前帳號無任何選單權限，請聯繫系統管理員", "無權限訪問", {
							type: 'error',
							center: true
						})
						return false
					}
					this.$TOOL.data.set("MENU", menu.data.menu)
					this.$TOOL.data.set("PERMISSIONS", menu.data.permissions)
				}else{
					this.islogin = false
					this.$message.warning(menu.message)
					return false
				}

				this.$router.replace({
					path: '/'
				})
				this.$message.success("Login Success 登入成功")
				this.islogin = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login-bg {width: 100%;height: 100%;background: #fff;display: flex;}
	.login-adv {width: 45%;background-color: #555;background-size: cover;background-position: center center;background-repeat: no-repeat;position: relative;}
	.login-main {flex: 1;overflow: auto;display:flex;}
	.login-form {width: 400px;margin: auto;padding:20px 0;}
	.login-header {margin-top: 20px; margin-bottom: 40px;font-size: 24px; font-family: "Raleway", sans-serif; font-weight: bold;}
	.login-form .el-divider {margin-top:40px;}

	.login-form:deep(.el-tabs) .el-tabs__header {margin-bottom: 25px;}
	.login-form:deep(.el-tabs) .el-tabs__header .el-tabs__item {font-size: 14px;}

	.login-form:deep(.login-forgot) {text-align: right;}
	.login-form:deep(.login-forgot) a {color: var(--el-color-primary);}
	.login-form:deep(.login-forgot) a:hover {color: var(--el-color-primary-light-3);}
	.login-form:deep(.login-reg) {font-size: 14px;color: var(--el-text-color-primary);}
	.login-form:deep(.login-reg) a {color: var(--el-color-primary);}
	.login-form:deep(.login-reg) a:hover {color: var(--el-color-primary-light-3);}

	.login-form:deep(.login-msg-yzm) {display: flex;width: 100%;}
	.login-form:deep(.login-msg-yzm) .el-button {margin-left: 10px;--el-button-size:42px;}

	@media (max-width: 1200px){
		.login-form {width: 340px;}
	}
	@media (max-width: 1000px){
		.login-main {display: block;}
		.login-form {width:100%;padding:20px 40px;}
		.login-adv {display: none;}
	}

	section { padding: 60px 0; overflow: hidden; }
	#topbar {
		display: flex!important;
		align-items: center!important;
		background: #fff;
		border-bottom: 1px solid #eee;
		font-size: 1.2rem;
		height: 40px;
		padding: 20px 0;
		font-family: "Open Sans", sans-serif;
	}
	.top-container {
		display: flex!important;
		align-items: center!important;		
		width: 100%;
		padding-right: var(--bs-gutter-x,4.6rem);
		padding-left: var(--bs-gutter-x,4.6rem);
		margin-right: auto;
		margin-left: auto;
	}
	#topbar .contact-info {
		display: flex!important;
		align-items: center!important;
		i { line-height: 0; font-size: 20px; color: #428bca; padding-right: 6px;}
		a { line-height: 0; color: #444;	transition: 0.3s; }
	}
	#topbar .social-links a {
		color: #5c768d;
		padding: 4px 12px;
		display: inline-block;
		line-height: 1px;
		transition: 0.3s;
		&:hover { color: #428bca; }
	}	

	#header {
		display: flex!important;
		align-items: center!important;	
		height: 70px;
		background: #fff;
		z-index: 997;
		box-shadow: 0px 5px 15px 0px rgb(0 0 0 / 6%);
		padding: 20px 0;

		.logo {
			margin-right: auto!important;
			img {
				padding: 0;
				margin: 0;
				max-height: 40px;
				max-width: 100%;
				height: auto;
				vertical-align: middle;
			}			
		}
	}
	.breadcrumbs, .breadcrumbs-mobile {
		padding: 15px 0;
		min-height: 60px;
		.title { font-size: 24px; font-family: "Raleway", sans-serif; }
	}
	.breadcrumbs-mobile {
		background-color: #f5f9fc;
		display: none;	
	}



	@media (min-width: 700px){
		.top-container { justify-content: space-between!important; }
		.social-links { display: block!important; }
	}
		
	@media (max-width: 699.99px){	
		.top-container { justify-content: center!important; }
		.social-links { display: none!important; }
	}

	@media (max-width: 1200px){
		.login-form {width: 340px;}
	}
	@media (max-width: 1000px){
		.login-main {display: block;}
		.login-form {width:100%;padding:20px 40px;}
		.login-adv {display: none;}
		.breadcrumbs { display: none; }
		.breadcrumbs-mobile { display: block; }
	}	
	
</style>
