const DEFAULT_SETTINGS = {
	saveMode: 'saveAndClose'
}

function saveActiveTab (activeTab) {
	const key = `tab-${Date.now()}`
	const tab = {
	  key: key,
	  title: activeTab.title,
	  url: activeTab.url
	}

	chrome.storage.sync.set({ [key]: tab }, () => {
		if (chrome.runtime.lastError) return

		chrome.storage.sync.get(['settings'], result => {
			const settings = { ...DEFAULT_SETTINGS, ...(result.settings || {}) }
			if (settings.saveMode === 'saveAndClose') {
				chrome.tabs.remove(activeTab.id)
			}
		})
	})
}

function toggleFastSave (flag) {
	chrome.action.setPopup({ popup: flag ? '' : 'popup.html' })
	chrome.action.setTitle({ title: chrome.i18n.getMessage('appTooltip') })
	chrome.action.setBadgeText({ text: flag ? 'F' : '' })
}

function checkAndShowSavedIcon (tabId) {
	chrome.tabs.get(tabId, tab => {
		if (chrome.runtime.lastError || !tab.url) return

		chrome.storage.sync.get(null, items => {
			const savedTabs = Object.keys(items)
				.filter(key => key.startsWith('tab-'))
				.map(key => items[key])

			const isSaved = savedTabs.some(savedTab => savedTab.url === tab.url)

			if (isSaved) {
				chrome.action.setIcon({ path: 'icon-saved.png', tabId: tabId })
			} else {
				chrome.action.setIcon({ path: 'icon.png', tabId: tabId })
			}
		})
	})
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'fast-save-on') {
		toggleFastSave(true)
	} else if (message.action === 'fast-save-off') {
		toggleFastSave(false)
	}
	return true
})

chrome.action.onClicked.addListener(tab => {
	saveActiveTab(tab)
	toggleFastSave(false)
})

chrome.tabs.onActivated.addListener(activeInfo => {
	checkAndShowSavedIcon(activeInfo.tabId)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.url) {
		checkAndShowSavedIcon(tabId)
	}
})

chrome.storage.onChanged.addListener((changes, namespace) => {
	if (namespace === 'sync') {
		const changedKeys = Object.keys(changes)
		const hasTabChanges = changedKeys.some(key => key.startsWith('tab-'))
		if (hasTabChanges) {
			chrome.tabs.query({ active: true, currentWindow: true }, result => {
				if (result[0]) {
					checkAndShowSavedIcon(result[0].id)
				}
			})
		}
	}
})
