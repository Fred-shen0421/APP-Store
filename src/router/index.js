import {createRouter, createWebHashHistory} from 'vue-router';
import { ElNotification } from 'element-plus';
import config from "@/config"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import tool from '@/utils/tool';
import systemRouter from './systemRouter';
import userRoutes from '@/config/route';
import {beforeEach, afterEach} from './scrollBehavior';

//系統路由
const routes = systemRouter

//系統特殊路由
const routes_404 = {
	path: "/:pathMatch(.*)*",
	hidden: true,
	component: () => import(/* webpackChunkName: "404" */ '@/layout/other/404'),
}
let routes_404_r = ()=>{}

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

//設置標題
document.title = config.APP_NAME + ' ' + config.APP_NAME_SUB

//判斷是否已加載過動態/靜態路由
var isGetRouter = false;

router.beforeEach(async (to, from, next) => {

	NProgress.start()
	//動態標題
	document.title = to.meta.title ? `${to.meta.title} - ${config.APP_NAME} ${config.APP_NAME_SUB}` : `${config.APP_NAME} ${config.APP_NAME_SUB}`

	let token = tool.cookie.get("TOKEN");

	if(to.path === "/login"){
		//刪除路由(替換目前layout路由)
		router.addRoute(routes[0])
		//刪除路由(404)
		routes_404_r()
		isGetRouter = false;
		next();
		return false;
	}

	if(routes.findIndex(r => r.path === to.path) >= 0){
		next();
		return false;
	}

	if(!token){
		next({
			path: '/login'
		});
		return false;
	}

	//整頁路由處理
	if(to.meta.fullpage){
		to.matched = [to.matched[to.matched.length-1]]
	}
	//加載動態/靜態路由
	if(!isGetRouter){
		let apiMenu = tool.data.get("MENU") || []
		let userInfo = tool.data.get("USER_INFO")
		let userMenu = treeFilter(userRoutes, node => {
			return node.meta.role ? node.meta.role.filter(item=>userInfo.role.indexOf(item)>-1).length > 0 : true
		})
		let menu = [...userMenu, ...apiMenu]
		var menuRouter = filterAsyncRouter(menu)
		menuRouter = flatAsyncRoutes(menuRouter)
		menuRouter.forEach(item => {
			router.addRoute("layout", item)
		})
		routes_404_r = router.addRoute(routes_404)
		if (to.matched.length == 0) {
			router.push(to.fullPath);
		}
		isGetRouter = true;
	}
	beforeEach(to, from)
	next();
});

router.afterEach((to, from) => {
	afterEach(to, from)
	NProgress.done()
});

router.onError((error) => {
	NProgress.done();
	ElNotification.error({
		title: '路由錯誤',
		message: error.message
	});
});

//入侵追加自定義方法、對像
router.sc_getMenu = () => {
	var apiMenu = tool.data.get("MENU") || []
	let userInfo = tool.data.get("USER_INFO")
	let userMenu = treeFilter(userRoutes, node => {
		return node.meta.role ? node.meta.role.filter(item=>userInfo.role.indexOf(item)>-1).length > 0 : true
	})
	var menu = [...userMenu, ...apiMenu]
	return menu
}

//轉換
function filterAsyncRouter(routerMap) {
	const accessedRouters = []
	routerMap.forEach(item => {
		item.meta = item.meta?item.meta:{};
		//處理外部鏈接特殊路由
		if(item.meta.type=='iframe'){
			item.meta.url = item.path;
			item.path = `/i/${item.name}`;
		}
		//MAP轉路由對像
		var route = {
			path: item.path,
			name: item.name,
			meta: item.meta,
			redirect: item.redirect,
			children: item.children ? filterAsyncRouter(item.children) : null,
			component: loadComponent(item.component)
		}
		accessedRouters.push(route)
	})
	return accessedRouters
}
function loadComponent(component){
	if(component){
		return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}`)
	}else{
		return () => import(`@/layout/other/empty`)
	}

}

//路由扁平化
function flatAsyncRoutes(routes, breadcrumb=[]) {
	let res = []
	routes.forEach(route => {
		const tmp = {...route}
        if (tmp.children) {
            let childrenBreadcrumb = [...breadcrumb]
            childrenBreadcrumb.push(route)
            let tmpRoute = { ...route }
            tmpRoute.meta.breadcrumb = childrenBreadcrumb
            delete tmpRoute.children
            res.push(tmpRoute)
            let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb)
            childrenRoutes.map(item => {
                res.push(item)
            })
        } else {
            let tmpBreadcrumb = [...breadcrumb]
            tmpBreadcrumb.push(tmp)
            tmp.meta.breadcrumb = tmpBreadcrumb
            res.push(tmp)
        }
    })
    return res
}

//過濾樹
function treeFilter(tree, func) {
	return tree.map(node => ({ ...node })).filter(node => {
		node.children = node.children && treeFilter(node.children, func)
		return func(node) || (node.children && node.children.length)
	})
}

export default router
