## CSIAdmin 後台管理系統 Template

## 介紹
基於VUE3和elementPlus開發的後台前端Template

## 特點
- **權限** 完整的鑒權體系和高精度權限控制
- **佈局** 提供多套佈局模式，滿足各種視覺需求
- **API** 完善的API管理，使用axios-mock-adapter模擬真實API
- **配置** 統一的全局配置和組件配置，支持build後配置熱更新
- **性能** 在減少帶寬請求和前端算力上多次優化，並且持續著
- **其他** 多功能視圖標籤、動態權限選單、控制台模組化、統一異常處理等等

## 目錄結構
┌── public				# 靜態資源(不會被Webpack打包)  
├── src					# 源代碼  
│	├── api				# 接口  
│	├── assets			# 靜態資源(會被打包)  
│	├── components		# 組件庫  
│	├── config			# 配置  
│	├── directives		# 自定義指令  
│	├── layout			# 框架佈局視圖  
│	├── locales			# 國際化文本  
│	├── mock			# axios-mock-adapter測試用資料  
│	├── router			# 路由表  
│	├── store			# VUEX狀態管理  
│	├── style			# 全局樣式  
│	├── utils			# 全局公用方法  
│	├── views			# 所有視圖  
│	├── App.vue			# 入口視圖  
│	└── main.js			# 入口文件  
├── .editorconfig		# 統一編輯器樣式  
├── babel.config.js		# postcss 配置  
├── package.json		# 包管理  
└── vue.config.js		# vue-cli 配置  

## 基礎的開發步驟
1. 建立路由表
2. 建立API
3. 建立視圖

## 注意事項
- 若控制台不需要模組化建議移除自訂模組功能改爲單一固定頁面
- layout 框架視圖，核心，盡量不要去改動
- router 路由相關，核心，盡量不要去改動
- csi.js 加載csiadmin主入口

## 安裝
需安裝nodejs 16以上版本，建議使用nvm安裝並切換nodejs版本

``` sh
# clone項目
https://github.com/CSI-Frontend/CSI-Admin.git

# 安裝依賴
npm i

# 啟動項目(開發模式)
npm run serve
```
啟動完成後瀏覽器瀏覽URL http://localhost:3600
