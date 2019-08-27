chrome.browserAction.setBadgeBackgroundColor({ color: 'transparent' })

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
	chrome.browserAction.setBadgeText({ text: flag ? 'F' : '' })
}

chrome.runtime.onMessage.addListener(message => {
	switch (message.action) {
		case 'fast-save-on':
			toggleFastSave(true)
			break
		default:
			toggleFastSave(false)
	}
})

chrome.browserAction.onClicked.addListener(tab => {
	saveActiveTab(tab)
	toggleFastSave(false)
})
