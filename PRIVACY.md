# Privacy Policy for Save Tabs

**Last updated:** February 28, 2026

## Overview

Save Tabs ("we", "our", or "the extension") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.

## Information We Collect

### Data You Provide

The extension collects only the following information that you explicitly choose to save:

- **Tab URLs**: The web addresses of tabs you save
- **Tab Titles**: The page titles of tabs you save
- **Timestamps**: When you saved each tab (used for organizing your saved list)

### Data We Do NOT Collect

We do NOT collect:

- Personally identifiable information (name, email, address, etc.)
- Health information
- Financial or payment information
- Authentication information (passwords, credentials)
- Personal communications
- Location data
- Browsing history (only tabs you explicitly save)
- User activity tracking
- Website content

## How We Use Your Information

The collected data is used solely for:

1. **Displaying saved tabs**: Showing your saved tabs in the extension popup
2. **Reopening tabs**: Restoring saved tabs when you click on them
3. **Organizing**: Sorting your saved tabs by save time
4. **Search**: Enabling you to search through your saved tabs

## Data Storage

### Local Storage

All data is stored **locally** on your device using Chrome's built-in `storage.sync` API:

- Data is stored in your Chrome browser's local storage
- Data syncs across your signed-in Chrome devices (if you use Chrome Sync)
- No data is transmitted to external servers
- No data is shared with third parties

### Data Retention

- Saved tabs remain stored until you delete them or uninstall the extension
- You can delete individual saved tabs at any time through the popup interface
- Uninstalling the extension removes all stored data

## Permissions

The extension requests the following permissions:

- **tabs**: To query active tabs, close tabs after saving, and create new tabs when reopening saved ones
- **storage**: To persist your saved tabs locally
- **Host permission (`<all_urls>`)**: To enable the Fast Save feature (Ctrl+click) on any website

## Keyboard Event Handling

The extension listens for the **Ctrl key** to enable "Fast Save" mode:

- This allows you to Ctrl+click the extension icon to save instantly
- The extension only detects whether the Ctrl key is pressed or released
- We do NOT log, record, or transmit any keystrokes or keyboard input
- This is used solely as a toggle mechanism for the fast-save feature

## Third-Party Services

This extension:

- Does not use analytics or tracking services
- Does not integrate with third-party APIs
- Does not display advertisements
- Does not sell or share any data with third parties

## Your Rights

You have full control over your data:

1. **View**: All saved tabs are visible in the extension popup
2. **Delete**: You can delete any saved tab at any time
3. **Export**: You can manually copy URLs from the saved list
4. **Clear all**: Uninstalling the extension removes all data

## Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be posted in the extension's listing and/or repository with an updated "Last updated" date.

## Contact

If you have any questions or concerns about this Privacy Policy or the extension's data practices, please:

- Open an issue on our GitHub repository: https://github.com/greatghoul/save-tabs/issues
- Contact the developer: greatghoul@gmail.com

## Summary

Save Tabs is a simple, privacy-focused tool that stores only what you explicitly save (tab URLs and titles) locally on your device. We don't track you, don't collect personal information, and don't share your data with anyone.
