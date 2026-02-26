const state = {
  tabs: [],
  activeTab: null
}

const activeTabContainer = document.getElementById('active-tab')
const activeTabTitle = document.getElementById('active-tab-title')
const saveActiveTabButton = document.getElementById('save-active-tab')
const savedTabsContainer = document.getElementById('saved-tabs')

saveActiveTabButton.textContent = chrome.i18n.getMessage('btnSave')
saveActiveTabButton.addEventListener('click', event => {
  event.preventDefault()
  saveNewTab()
})

document.addEventListener('DOMContentLoaded', () => {
  fetchTabs()
  fetchActiveTab()
})

function fetchTabs () {
  chrome.storage.local.get(null, items => {
    const tabs = Object.keys(items)
      .filter(key => key.startsWith('tab-'))
      .map(key => items[key])

    state.tabs = tabs.sort((a, b) => b.key.localeCompare(a.key))
    renderTabs()
  })
}

function fetchActiveTab () {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    state.activeTab = tabs[0] || null
    renderActiveTab()
  })
}

function saveNewTab () {
  if (!state.activeTab) return

  const key = `tab-${Date.now()}`
  const tab = {
    key: key,
    title: state.activeTab.title,
    url: state.activeTab.url
  }

  chrome.storage.local.set({ [key]: tab }, () => {
    if (chrome.runtime.lastError) return
    chrome.tabs.remove(state.activeTab.id)
  })
}

function openTab (tab) {
  chrome.tabs.create({ active: false, url: tab.url }, () => {
    chrome.storage.local.remove(tab.key, () => {
      state.tabs = state.tabs.filter(item => item.key !== tab.key)
      renderTabs()
    })
  })
}

function renderActiveTab () {
  if (!state.activeTab) {
    activeTabContainer.style.display = 'none'
    return
  }

  activeTabTitle.textContent = state.activeTab.title
  activeTabContainer.style.display = 'flex'
}

function renderTabs () {
  savedTabsContainer.innerHTML = ''

  state.tabs.forEach(tab => {
    const tabLink = document.createElement('a')
    tabLink.href = '#'
    tabLink.textContent = tab.title
    tabLink.addEventListener('click', event => {
      event.preventDefault()
      openTab(tab)
    })

    savedTabsContainer.appendChild(tabLink)
  })
}
