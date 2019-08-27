new Vue({
  el: '#app',
  data: {
    tabs: [],
    activeTab: null,
    btnSaveText: chrome.i18n.getMessage('btnSave')
  },
  created () {
    this.fetchTabs()
    this.fetchActiveTab()
  },
  methods: {
    fetchTabs () {
      const tabs = []
      for (const key in localStorage) {
        if (key.startsWith('tab-')) {
          tabs.push(JSON.parse(localStorage[key]))
        }
      }
      this.tabs = tabs.sort((a, b) => b.key.localeCompare(a.key))
    },
    fetchActiveTab () {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        this.activeTab = tabs[0]
      })
    },
    saveNewTab () {
      const key = `tab-${Date.now()}`
      const tab = {
        key: key,
        title: this.activeTab.title,
        url: this.activeTab.url
      }

      localStorage[key] = JSON.stringify(tab)
      chrome.tabs.remove(this.activeTab.id)
    },
    openTab (tab) {
      chrome.tabs.create({ active: false, url: tab.url }, () => {
        localStorage.removeItem(tab.key)

        const index = this.tabs.findIndex(x => x.key === tab.key)
        this.$delete(this.tabs, index)
      })
    }
  }
})
