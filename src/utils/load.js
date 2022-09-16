/**
 * loadJS 異步加載遠程JS
 * @constructor
 * @param {string} src - 必填，需要加載的URL路徑
 * @param {string} keyName - 必填，唯一key和JS返回的全局的對象名
 * @param {string} callbackName - 非必填，如果遠程JS有callback，則可更有效的判斷是否完成加載
 */
export function loadJS (src, keyName, callbackName) {
	return new Promise((resolve, reject) => {
		let has = document.head.querySelector("script[loadKey="+keyName+"]")
		if(has){
			return resolve(window[keyName])
		}
		let script = document.createElement("script")
		script.type = "text/javascript"
		script.src = src
		script.setAttribute("loadKey", keyName)
		document.head.appendChild(script)
		script.onload = () => {
			if(callbackName){
				window[callbackName] = () => {
					return resolve(window[keyName])
				}
			}else{
				setTimeout(()=>{
					return resolve(window[keyName])
				},50)
			}
		}
		script.onerror = (err) => {
			return reject(err)
		}
	})
}

/**
 * loadCSS 異步加載遠程css
 * @constructor
 * @param {string} src - 必填，需要加載的URL路徑
 * @param {string} keyName - 必填，唯一key
 */
export function loadCSS (src, keyName) {
	return new Promise((resolve, reject) => {
		let has = document.head.querySelector("link[loadKey="+keyName+"]")
		if(has){
			return resolve()
		}
		let link = document.createElement('link')
		link.rel = "stylesheet"
		link.href = src
		link.setAttribute("loadKey", keyName)
		document.head.appendChild(link)
		link.onload = () => {
			return resolve()
		}
		link.onerror = (err) => {
			return reject(err)
		}
	})
}
