import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const saveLabel = chrome.i18n.getMessage('btnSave')

const ActiveTabRow = styled('div')`
  background: #dddddd;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  border: 1px solid #cacaca;
`

const ActiveTabTitle = styled('strong')`
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const SaveLink = styled('a')`
  margin-left: 3px;
`

export function ActiveTab ({ tab, onSave }) {
  const handleClick = event => {
    event.preventDefault()
    onSave(event)
  }

  return html`
    <${ActiveTabRow}>
      <${ActiveTabTitle}>${tab.title}<//>
      <${SaveLink} href="#" onClick=${handleClick}>${saveLabel}<//>
    <//>
  `
}
