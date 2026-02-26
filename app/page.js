let fastSave = false

const enableFastSave = event => {
  if (event.ctrlKey && !fastSave) {
    chrome.runtime.sendMessage({ action: 'fast-save-on' })
    fastSave = true
  }
}

const disableFastSave = event => {
  if (fastSave) {
    chrome.runtime.sendMessage({ action: 'fast-save-off' })
    fastSave = false    
  }
}

window.addEventListener('keydown', enableFastSave, false)
window.addEventListener('keyup', disableFastSave, false)
window.addEventListener('blur', disableFastSave, false)
window.addEventListener('beforeunload', disableFastSave, false)
