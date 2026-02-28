import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const HeaderRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 2px 0;
`

const HeaderLeft = styled('div')`
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
`

const HeaderTitle = styled('div')`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3px;
  white-space: nowrap;
`

const HeaderCount = styled('div')`
  font-size: 12px;
  font-weight: 700;
  color: #2f7cff;
  background: #e8f0ff;
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
`

const SearchInput = styled('input')`
  margin-left: auto;
  width: 120px;
  min-width: 0;
  border: 1px solid #c8dcff;
  background: #ffffff;
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 12px;
  color: #1d1f2a;

  &:focus {
    outline: none;
    border-color: #2f7cff;
  }
`

export function Header ({ count, searchQuery, onSearchChange }) {
  return html`
    <${HeaderRow}>
      <${HeaderLeft}>
        <${HeaderTitle}>Saved Tabs<//>
        <${HeaderCount}>${count}<//>
      <//>
      <${SearchInput}
        type="search"
        placeholder="Search"
        value=${searchQuery}
        onInput=${event => onSearchChange(event.target.value)}
      />
    <//>
  `
}