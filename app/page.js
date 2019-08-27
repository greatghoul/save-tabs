let fastSave = false

document.addEventListener('keydown', event => {
	if (event.altKey) {
		chrome.runtime.sendMessage({ action: 'fast-save-on' })
		fastSave = true
	}
})


document.addEventListener('keyup', event => {
	if (fastSave) {
		chrome.runtime.sendMessage({ action: 'fast-save-off' })
		fastSave = false
	}
})
