import { h, html, render, useCallback, useEffect, useRef, useState } from './libs/preact.js'
import { glob, setup, styled } from './libs/goober.js'
import { ActiveTab } from './components/ActiveTab.js'
import { SavedTabItem } from './components/SavedTabItem.js'
import { Header } from './components/Header.js'
import { Footer } from './components/Footer.js'
import { SettingsModal } from './components/SettingsModal.js'

setup(h)
glob`
  body {
    margin: 0;
    padding: 0;
    background: #f8f9ff;
    color: #1d1f2a;
    font-family: "Trebuchet MS", "Segoe UI", Arial, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`

const PopupRoot = styled('div')`
  width: 360px;
  height: 420px;
  margin: 0;
  padding: 12px;
  box-sizing: border-box;
  background: #f8f9ff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TabsList = styled('div')`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const DEFAULT_SETTINGS = {
  saveMode: 'saveAndClose',
  restoreMode: 'restoreAndRemove',
  activateAfterRestore: false
}

function PopupApp () {
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [highlightedTabKey, setHighlightedTabKey] = useState(null)

  const fetchTabs = useCallback(() => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(null, items => {
        const nextTabs = Object.keys(items)
          .filter(key => key.startsWith('tab-'))
          .map(key => items[key])
          .sort((a, b) => b.key.localeCompare(a.key))

        setTabs(nextTabs)
        resolve(nextTabs)
      })
    })
  }, [])

  const fetchActiveTab = useCallback(() => {
    return new Promise((resolve) => {
      chrome.tabs.query({ currentWindow: true, active: true }, result => {
        const tab = result[0] || null
        setActiveTab(tab)
        resolve(tab)
      })
    })
  }, [])

  const checkExistingTab = useCallback((savedTabs, currentTab) => {
    if (!currentTab || !currentTab.url) return false
    const existingTab = savedTabs.find(tab => tab.url === currentTab.url)
    if (existingTab) {
      setHighlightedTabKey(existingTab.key)
      return true
    }
    return false
  }, [])

  const fetchSettings = useCallback(() => {
    chrome.storage.sync.get(['settings'], result => {
      if (result.settings) {
        setSettings({ ...DEFAULT_SETTINGS, ...result.settings })
      }
    })
  }, [])

  const saveSettings = useCallback((newSettings) => {
    chrome.storage.sync.set({ settings: newSettings }, () => {
      setSettings(newSettings)
      setShowSettings(false)
    })
  }, [])

  const saveNewTab = useCallback(
    event => {
      if (event) event.preventDefault()
      if (!activeTab) return

      const key = `tab-${Date.now()}`
      const tab = {
        key: key,
        title: activeTab.title,
        url: activeTab.url
      }

      chrome.storage.sync.set({ [key]: tab }, () => {
        if (chrome.runtime.lastError) return
        fetchTabs()
        if (settings.saveMode === 'saveAndClose') {
          chrome.tabs.remove(activeTab.id)
        }
      })
    },
    [activeTab, settings.saveMode, fetchTabs]
  )

  const openTab = useCallback(tab => {
    chrome.tabs.create({ active: settings.activateAfterRestore, url: tab.url }, () => {
      if (settings.restoreMode === 'restoreAndRemove') {
        chrome.storage.sync.remove(tab.key, () => {
          setTabs(prevTabs => prevTabs.filter(item => item.key !== tab.key))
        })
      }
    })
  }, [settings.restoreMode, settings.activateAfterRestore])

  useEffect(() => {
    const init = async () => {
      const savedTabs = await fetchTabs()
      const currentTab = await fetchActiveTab()
      fetchSettings()
      checkExistingTab(savedTabs, currentTab)
    }
    init()
  }, [fetchTabs, fetchActiveTab, fetchSettings, checkExistingTab])

  useEffect(() => {
    if (highlightedTabKey) {
      const element = document.querySelector(`[data-tab-key="${highlightedTabKey}"]`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [highlightedTabKey])

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredTabs = normalizedQuery
    ? tabs.filter(tab => {
        const titleMatch = tab.title && tab.title.toLowerCase().includes(normalizedQuery)
        const urlMatch = tab.url && tab.url.toLowerCase().includes(normalizedQuery)
        return titleMatch || urlMatch
      })
    : tabs

  const shouldShowActiveTab = activeTab && highlightedTabKey === null

  return html`
    <${PopupRoot}>
      <${Header}
        count=${filteredTabs.length}
        searchQuery=${searchQuery}
        onSearchChange=${setSearchQuery}
        onSettingsClick=${() => setShowSettings(true)}
      />
      ${shouldShowActiveTab && html`
        <${ActiveTab} tab=${activeTab} onSave=${saveNewTab} />
      `}
      <${TabsList}>
        ${filteredTabs.map(
          tab => html`
            <${SavedTabItem} 
              key=${tab.key}
              tab=${tab} 
              onOpen=${openTab}
              isHighlighted=${tab.key === highlightedTabKey}
            />
          `
        )}
      <//>
      <${Footer} />

      ${showSettings && html`
        <${SettingsModal}
          settings=${settings}
          onSave=${saveSettings}
          onClose=${() => setShowSettings(false)}
        />
      `}
    <//>
  `
}

render(html`<${PopupApp} />`, document.getElementById('app'))
