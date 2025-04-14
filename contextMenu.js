const setUpContextMenus = () => {
  chrome.contextMenus.removeAll(() => {
    const contextMenuMyOtherExtyensions = {
      id: 'myOtherExtensions',
      title: chrome.i18n.getMessage("context_menu_my_other_extensions"),
      contexts: ['action']
    }
    chrome.contextMenus.create(contextMenuMyOtherExtyensions, () => chrome.runtime.lastError)
  })
}

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == 'myOtherExtensions') {
    chrome.tabs.create({ url: 'https://chromewebstore.google.com/search/micpob' })
  }
})