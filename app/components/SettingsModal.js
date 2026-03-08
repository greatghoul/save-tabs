import { html } from '../libs/preact.js'
import { styled } from '../libs/goober.js'

const ModalOverlay = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(29, 31, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled('div')`
  background: #f8f9ff;
  border-radius: 12px;
  width: 320px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`

const ModalTitle = styled('h2')`
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 700;
  color: #1d1f2a;
`

const SettingGroup = styled('div')`
  margin-bottom: 20px;
`

const SettingLabel = styled('label')`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #1d1f2a;
  margin-bottom: 8px;
`

const RadioGroup = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const RadioLabel = styled('label')`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #4a4d5c;
  cursor: pointer;

  input[type="radio"] {
    width: 16px;
    height: 16px;
    accent-color: #2f7cff;
    cursor: pointer;
  }
`

const CheckboxLabel = styled('label')`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #4a4d5c;
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #2f7cff;
    cursor: pointer;
  }
`

const SaveButton = styled('button')`
  width: 100%;
  padding: 10px 16px;
  background: #2f7cff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background: #1a6bef;
  }
`

export function SettingsModal ({ settings, onSave, onClose }) {
  const handleSave = () => {
    onSave(settings)
  }

  const updateSetting = (key, value) => {
    settings[key] = value
  }

  return html`
    <${ModalOverlay} onClick=${onClose}>
      <${ModalContent} onClick=${e => e.stopPropagation()}>
        <${ModalTitle}>${chrome.i18n.getMessage('settingsTitle') || 'Settings'}<//>
        
        <${SettingGroup}>
          <${SettingLabel}>${chrome.i18n.getMessage('saveModeLabel') || 'Save Mode'}<//>
          <${RadioGroup}>
            <${RadioLabel}>
              <input
                type="radio"
                name="saveMode"
                value="saveOnly"
                checked=${settings.saveMode === 'saveOnly'}
                onChange=${() => updateSetting('saveMode', 'saveOnly')}
              />
              ${chrome.i18n.getMessage('saveModeSaveOnly') || 'Save only'}
            <//>
            <${RadioLabel}>
              <input
                type="radio"
                name="saveMode"
                value="saveAndClose"
                checked=${settings.saveMode === 'saveAndClose'}
                onChange=${() => updateSetting('saveMode', 'saveAndClose')}
              />
              ${chrome.i18n.getMessage('saveModeSaveAndClose') || 'Save and close'}
            <//>
          <//>
        <//>

        <${SettingGroup}>
          <${SettingLabel}>${chrome.i18n.getMessage('restoreModeLabel') || 'Restore Mode'}<//>
          <${RadioGroup}>
            <${RadioLabel}>
              <input
                type="radio"
                name="restoreMode"
                value="restoreOnly"
                checked=${settings.restoreMode === 'restoreOnly'}
                onChange=${() => updateSetting('restoreMode', 'restoreOnly')}
              />
              ${chrome.i18n.getMessage('restoreModeRestoreOnly') || 'Restore only'}
            <//>
            <${RadioLabel}>
              <input
                type="radio"
                name="restoreMode"
                value="restoreAndRemove"
                checked=${settings.restoreMode === 'restoreAndRemove'}
                onChange=${() => updateSetting('restoreMode', 'restoreAndRemove')}
              />
              ${chrome.i18n.getMessage('restoreModeRestoreAndRemove') || 'Restore and remove'}
            <//>
          <//>
        <//>

        <${SettingGroup}>
          <${CheckboxLabel}>
            <input
              type="checkbox"
              checked=${settings.activateAfterRestore}
              onChange=${e => updateSetting('activateAfterRestore', e.target.checked)}
            />
            ${chrome.i18n.getMessage('activateAfterRestoreLabel') || 'Activate tab after restore'}
          <//>
        <//>

        <${SaveButton} onClick=${handleSave}>
          ${chrome.i18n.getMessage('saveButton') || 'Save'}
        <//>
      <//>
    <//>
  `
}
