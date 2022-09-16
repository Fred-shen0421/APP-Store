
//驗證手機號
export function verifyPhone(rule, value, callback) {
	let reg = /^[1][3, 4, 5, 6, 7, 8, 9][0-9]{9}$/
	if(!reg.test(value)){
		return callback(new Error('請輸入正確的手機號碼'))
	}
	callback()
}

//車牌號碼
export function verifyCars(rule, value, callback) {
	let reg = /^[京津滬渝冀豫雲遼黑湘皖魯新蘇浙贛鄂桂甘晉蒙陝吉閩貴粵青藏川寧瓊使領][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9掛學警港澳]$/
	if(!reg.test(value)){
		return callback(new Error('請輸入正確的車牌號碼'))
	}
	callback()
}
