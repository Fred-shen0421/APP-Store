import axios from 'axios';
import { ElNotification, ElMessageBox } from 'element-plus';
import sysConfig from "@/config";
import tool from '@/utils/tool';
import router from '@/router';

if(process.env.NODE_ENV === 'development'){
	import(/* webpackChunkName: "mock" */'./mock')
}

axios.defaults.baseURL = ''

axios.defaults.timeout = sysConfig.TIMEOUT

// HTTP request 攔截器
axios.interceptors.request.use(
	(config) => {
		let token = tool.cookie.get("TOKEN");
		if(token){
			config.headers[sysConfig.TOKEN_NAME] = sysConfig.TOKEN_PREFIX + token
		}
		if(!sysConfig.REQUEST_CACHE && config.method == 'get'){
			config.params = config.params || {};
			config.params['_'] = new Date().getTime();
		}
		Object.assign(config.headers, sysConfig.HEADERS)
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// HTTP response 攔截器
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (error.response.status == 404) {
				ElNotification.error({
					title: '請求錯誤',
					message: "Status:404，正在請求不存在的伺服器記錄！"
				});
			} else if (error.response.status == 500) {
				ElNotification.error({
					title: '請求錯誤',
					message: error.response.data.message || "Status:500，伺服器發生錯誤！"
				});
			} else if (error.response.status == 401) {
				ElMessageBox.confirm('目前用戶已被登出或無權限訪問此資源，請嘗試重新登入後再操作。', '無權限訪問', {
					type: 'error',
					closeOnClickModal: false,
					center: true,
					confirmButtonText: '重新登錄'
				}).then(() => {
					router.replace({path: '/login'});
				}).catch(() => {})
			} else {
				ElNotification.error({
					title: '請求錯誤',
					message: error.message || `Status:${error.response.status}，未知錯誤！`
				});
			}
		} else {
			ElNotification.error({
				title: '請求錯誤',
				message: "請求伺服器無回應！"
			});
		}

		return Promise.reject(error.response);
	}
);

var httpReq = {

	/** get 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} params
	 * @param  {參數} config
	 */
	get: function(url, params={}, config={}) {
		console.log('get:', url)
		console.table('params:', params)		
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: url,
				params: params,
				...config
			}).then((response) => {
				console.table('response:', response)				
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** post 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} data
	 * @param  {參數} config
	 */
	post: function(url, data={}, config={}) {
		console.log('post:', url)
		console.table('data:', data)
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: url,
				data: data,
				...config
			}).then((response) => {
				console.table('response:', response)
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** put 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} data
	 * @param  {參數} config
	 */
	put: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'put',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** patch 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} data
	 * @param  {參數} config
	 */
	patch: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'patch',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** delete 請求
	 * @param  {接口地址} url
	 * @param  {請求參數} data
	 * @param  {參數} config
	 */
	delete: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'delete',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},
}

export default httpReq;
