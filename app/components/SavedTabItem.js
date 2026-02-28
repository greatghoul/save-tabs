import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const TabLink = styled('a')`
  padding: 5px 10px;
  display: block;
  text-decoration: none;
  margin: 1px;
  background-color: #f5f5f5;
  word-break: break-word;

  &:hover {
    background-color: #eeeeee;
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
