import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const titleText = chrome.i18n.getMessage('headerTitle')
const searchPlaceholder = chrome.i18n.getMessage('searchPlaceholder')

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

const SettingsButton = styled('button')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid #c8dcff;
  background: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    background: #e8f0ff;
    border-color: #2f7cff;
  }

  svg {
    width: 14px;
    height: 14px;
    color: #2f7cff;
  }
`

const SearchWrapper = styled('div')`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
`

const CogIcon = () => html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
`

export function Header ({ count, searchQuery, onSearchChange, onSettingsClick }) {
  return html`
    <${HeaderRow}>
      <${HeaderLeft}>
        <${HeaderTitle}>${titleText}<//>
        <${HeaderCount}>${count}<//>
      <//>
      <${SearchWrapper}>
        <${SearchInput}
          type="search"
          placeholder=${searchPlaceholder}
          value=${searchQuery}
          onInput=${event => onSearchChange(event.target.value)}
        />
        <${SettingsButton} onClick=${onSettingsClick} title="Settings">
          <${CogIcon} />
        <//>
      <//>
    <//>
  `
}