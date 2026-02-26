function saveActiveTab (activeTab) {
	const key = `tab-${Date.now()}`
	const tab = {
	  key: key,
	  title: activeTab.title,
	  url: activeTab.url
	}

	chrome.storage.local.set({ [key]: tab }, () => {
		if (chrome.runtime.lastError) return
		chrome.tabs.remove(activeTab.id)
	})
}

function toggleFastSave (flag) {
	chrome.action.setPopup({ popup: flag ? '' : 'popup.html' })
	chrome.action.setTitle({ title: chrome.i18n.getMessage('appTooltip') })
	chrome.action.setBadgeText({ text: flag ? 'F' : '' })
}

chrome.runtime.onMessage.addListener(message => {
	if (message.action === 'fast-save-on') {
		toggleFastSave(true)
	} else {
		toggleFastSave(false)
	}
})

chrome.action.onClicked.addListener(tab => {
	saveActiveTab(tab)
	toggleFastSave(false)
})
