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
        }, () => {
          setUpContextMenus()
        })
        break;
     case 'update':
      chrome.storage.local.get('active', (result) => {
        let active = typeof result.active == 'boolean' ? result.active : true
        chrome.storage.local.set({
          "active": active
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
      chrome.storage.local.get('active', (result) => {
      if (result.active) {
          //See https://developer.chrome.com/docs/extensions/reference/api/tabs#method-create for a full list of createProperties
          chrome.tabs.create({active: false, url: request.url})

      }
    })  
    }
  }
)
