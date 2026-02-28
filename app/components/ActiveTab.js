import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const saveLabel = chrome.i18n.getMessage('btnSave')

const ActiveTabRow = styled('div')`
  background: #e8f0ff;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  border: 1px solid #c8dcff;
  border-radius: 10px;
  gap: 8px;
`

const ActiveTabTitle = styled('strong')`
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 700;
`

const SaveLink = styled('a')`
  text-decoration: none;
  background: #2f7cff;
  color: #ffffff;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;

  &:hover {
    background: #2667d6;
  }
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
