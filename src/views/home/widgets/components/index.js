import {markRaw} from 'vue';
const resultComps = {}
let requireComponent = require.context(
	'./', // 在目前目錄下查找
	false, // 不遍歷子文件夾
	/\.vue$/ // 正則匹配 以 .vue結尾的文件
)
requireComponent.keys().forEach(fileName => {
	let comp = requireComponent(fileName)
	resultComps[fileName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
})
export default markRaw(resultComps)
