import config from "@/config"
import httpReq from "@/utils/request"

export default {
	token: {
		url: `${config.API_URL}/auth/token`,
		name: "登入獲取TOKEN",
		post: async function(data={}){
			return await httpReq.post(this.url, data);
		}
	}
}
