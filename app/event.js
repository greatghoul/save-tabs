function saveActiveTab (activeTab) {
	const key = `tab-${Date.now()}`
	const tab = {
	  key: key,
	  title: activeTab.title,
	  url: activeTab.url
	}

	localStorage[key] = JSON.stringify(tab)
	chrome.tabs.remove(activeTab.id)
}

function toggleFastSave (flag) {
	chrome.browserAction.setPopup({ popup: flag ? '' : 'popup.html' })
	chrome.browserAction.setTitle({ title: chrome.i18n.getMessage('appTooltip') })
	chrome.browserAction.setBadgeText({ text: flag ? 'F' : '' })
}

chrome.runtime.onMessage.addListener(message => {
	if (message.action === 'fast-save-on') {
		toggleFastSave(true)
	} else {
		toggleFastSave(false)
	}
})

chrome.browserAction.onClicked.addListener(tab => {
	saveActiveTab(tab)
	toggleFastSave(false)
})
