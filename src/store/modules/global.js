import config from "@/config";

export default {
	state: {
		//移動端佈局
		ismobile: false,
		//佈局
		layout: config.LAYOUT,
		//選單是否折疊 toggle
		menuIsCollapse: config.MENU_IS_COLLAPSE,
		//多標籤欄
		layoutTags: config.LAYOUT_TAGS,
		//主題
		theme: config.THEME,
	},
	mutations: {
		SET_ismobile(state, key){
			state.ismobile = key
		},
		SET_layout(state, key){
			state.layout = key
		},
		SET_theme(state, key){
			state.theme = key
		},
		TOGGLE_menuIsCollapse(state){
			state.menuIsCollapse = !state.menuIsCollapse
		},
		TOGGLE_layoutTags(state){
			state.layoutTags = !state.layoutTags
		}
	}
}
