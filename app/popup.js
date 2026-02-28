import { html, render, useCallback, useEffect, useState } from './libs/preact.js'

function PopupApp () {
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [saveLabel, setSaveLabel] = useState('')

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
    setSaveLabel(chrome.i18n.getMessage('btnSave'))
    fetchTabs()
    fetchActiveTab()
  }, [fetchTabs, fetchActiveTab])

  return html`
    <div>
      ${activeTab && html`
        <div class="tab-new">
          <strong>${activeTab.title}</strong>
          <a href="#" class="pull-right" onClick=${saveNewTab}>${saveLabel}</a>
        </div>
      `}
      <div class="tabs">
        ${tabs.map(
          tab => html`
            <a
              href="#"
              onClick=${event => {
                event.preventDefault()
                openTab(tab)
              }}
            >${tab.title}</a>
          `
        )}
      </div>
    </div>
  `
}

render(html`<${PopupApp} />`, document.getElementById('app'))
