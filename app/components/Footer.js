import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const FooterRoot = styled('div')`
  font-size: 11px;
  color: #6b7a99;
  padding: 4px 0 0;
`

const FooterKey = styled('kbd')`
  background: #e8f0ff;
  border: 1px solid #c8dcff;
  border-radius: 4px;
  padding: 1px 4px;
  font-family: inherit;
  font-size: 10px;
`

export function Footer () {
  return html`
    <${FooterRoot}>
      <${FooterKey}>Ctrl<//> + Click icon to save current tab without opening popup
    <//>
  `
}