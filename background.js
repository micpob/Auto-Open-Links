chrome.runtime.onStartup.addListener( () => {
  chrome.storage.local.get('active', (result) => {
    if (result.active) {
      chrome.action.setIcon({path: 'Res/Icons/icon64.png'})
    } else {
      chrome.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } 
  })
})

chrome.runtime.onInstalled.addListener((details) => {
  const reason = details.reason

  switch (reason) {
     case 'install':
        chrome.storage.local.set({
          'active': true,
          'waitTime': 1000,
          'openLinkInNewTab': true,
          'goToNewTab': false
        }, () => {
          setUpContextMenus()
        })
        break;
     case 'update':
      chrome.storage.local.get(['active', 'waitTime', 'openLinkInNewTab', 'goToNewTab'], (result) => {
        let active = typeof result.active == 'boolean' ? result.active : true
        let waitTime = result.waitTime ? result.waitTime : 1000
        let openLinkInNewTab = typeof result.openLinkInNewTab == 'boolean' ? result.openLinkInNewTab : true
        let goToNewTab = result.goToNewTab ? result.goToNewTab : false
        chrome.storage.local.set({
          'active': active,
          'waitTime': waitTime,
          'openLinkInNewTab': openLinkInNewTab,
          'goToNewTab': goToNewTab
        }, () => {
          chrome.contextMenus.removeAll(() => {
            setUpContextMenus()
          })
        })
      })
        break;
     default:
        break;
  }
})

chrome.action.onClicked.addListener( () => {
  chrome.storage.local.get('active', (result) => {
    if (result.active) {
      chrome.storage.local.set({ 'active': false })
      chrome.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } else {
      chrome.storage.local.set({ 'active': true })
      chrome.action.setIcon({path: 'Res/Icons/icon64.png'})
    }
  })  
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.url) {
      chrome.storage.local.get('goToNewTab', (result) => {
        //See https://developer.chrome.com/docs/extensions/reference/api/tabs#method-create for a full list of createProperties
        chrome.tabs.create({active: result.goToNewTab, url: request.url})
      })   
    }
  }    
)
