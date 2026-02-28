import { h, html, render, useCallback, useEffect, useState } from './libs/preact.js'
import { glob, setup, styled } from './libs/goober.js'
import { ActiveTab } from './components/ActiveTab.js'
import { SavedTabItem } from './components/SavedTabItem.js'

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

const HeaderRow = styled('div')`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 2px 2px 0;
`

const HeaderTitle = styled('div')`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3px;
`

const HeaderCount = styled('div')`
  font-size: 12px;
  font-weight: 700;
  color: #2f7cff;
  background: #e8f0ff;
  padding: 2px 8px;
  border-radius: 999px;
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

function PopupApp () {
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState(null)

  const fetchTabs = useCallback(() => {
    chrome.storage.local.get(null, items => {
      const nextTabs = Object.keys(items)
        .filter(key => key.startsWith('tab-'))
        .map(key => items[key])
        .sort((a, b) => b.key.localeCompare(a.key))

      setTabs(nextTabs)
    })
  }, [])

  const fetchActiveTab = useCallback(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, result => {
      setActiveTab(result[0] || null)
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

      chrome.storage.local.set({ [key]: tab }, () => {
        if (chrome.runtime.lastError) return
        chrome.tabs.remove(activeTab.id)
      })
    },
    [activeTab]
  )

  const openTab = useCallback(tab => {
    chrome.tabs.create({ active: false, url: tab.url }, () => {
      chrome.storage.local.remove(tab.key, () => {
        setTabs(prevTabs => prevTabs.filter(item => item.key !== tab.key))
      })
    })
  }, [])

  useEffect(() => {
    fetchTabs()
    fetchActiveTab()
  }, [fetchTabs, fetchActiveTab])

  return html`
    <${PopupRoot}>
      <${HeaderRow}>
        <${HeaderTitle}>Saved Tabs<//>
        <${HeaderCount}>${tabs.length}<//>
      <//>
      ${activeTab && html`
        <${ActiveTab} tab=${activeTab} onSave=${saveNewTab} />
      `}
      <${TabsList}>
        ${tabs.map(
          tab => html`
            <${SavedTabItem} tab=${tab} onOpen=${openTab} />
          `
        )}
      <//>
    <//>
  `
}

render(html`<${PopupApp} />`, document.getElementById('app'))
