import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const TabLink = styled('a')`
  padding: 8px 10px 6px 10px;
  display: block;
  text-decoration: none;
  background-color: #ffffff;
  border: 1px solid #e1e6f5;
  border-radius: 8px;
  color: #1d1f2a;
  word-break: break-word;
  font-size: 12px;
  line-height: 1.25;
  transition: box-shadow 0.12s;

  &:hover {
    background-color: #f3f6ff;
    border-color: #c8dcff;
    box-shadow: 0 2px 8px 0 #e8f0ff;
  }
`

const TabUrl = styled('div')`
  color: #6b7a99;
  font-size: 11px;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export function SavedTabItem ({ tab, onOpen }) {
  const handleClick = event => {
    event.preventDefault()
    onOpen(tab)
  }

  return html`
    <${TabLink} href="#" onClick=${handleClick} title=${tab.url}>
      <div style="font-weight:600;">${tab.title}</div>
      <${TabUrl}>${tab.url}<//>
    <//>
  `
}
