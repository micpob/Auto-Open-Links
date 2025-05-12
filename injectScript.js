let autoOpenLinksNewHover

document.addEventListener('mouseover', (e) => {
  const anchor = e.target.closest("a")
  if (!anchor) return                      
  chrome.storage.local.get(['active', 'waitTime', 'openLinkInNewTab'], (result) => {
    if (result.active) {
      autoOpenLinksNewHover = setTimeout(() => {
        if (result.openLinkInNewTab) {
          chrome.runtime.sendMessage({url: anchor.href})
        } else {
          window.open(anchor.href, '_self')
        }
      }, result.waitTime)
      anchor.addEventListener('mouseout', (e) => { 
        clearTimeout(autoOpenLinksNewHover)
      }) 
    }
  })  
})