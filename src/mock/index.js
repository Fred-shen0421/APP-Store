/**
 * @description 自動import導入所有 jaon 模塊
 */

const files = require.context('./json', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
