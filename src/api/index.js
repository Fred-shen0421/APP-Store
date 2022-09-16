/**
 * @description 自動import導入所有 api 模塊
 */

const files = require.context('./model', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
