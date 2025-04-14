let newOver

document.addEventListener('mouseover', (e) => {
  const anchor = e.target.closest("a")
  if (!anchor) return                      
  console.log(anchor.href)
  newOver = setTimeout(() => {
    console.log('sending message')
    chrome.runtime.sendMessage({url: anchor.href})
  }, 1000)
  anchor.addEventListener('mouseout', (e) => { 
    console.log('clearing timeout')
    clearTimeout(newOver)
  }) 
})
