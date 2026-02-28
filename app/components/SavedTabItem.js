import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const TabLink = styled('a')`
  padding: 8px 10px;
  display: block;
  text-decoration: none;
  background-color: #ffffff;
  border: 1px solid #e1e6f5;
  border-radius: 8px;
  color: #1d1f2a;
  word-break: break-word;
  font-size: 12px;
  line-height: 1.25;

  &:hover {
    background-color: #f3f6ff;
    border-color: #c8dcff;
  }
`

export function SavedTabItem ({ tab, onOpen }) {
  const handleClick = event => {
    event.preventDefault()
    onOpen(tab)
  }

  return html`
    <${TabLink} href="#" onClick=${handleClick}>${tab.title}<//>
  `
}
