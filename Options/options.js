//Set texts in local language
const objects = document.getElementsByTagName('*')
for(let i = 0; i < objects.length; i++) {
  if (objects[i].hasAttribute('data-text')) {
    const textKey = objects[i].getAttribute('data-text')
    objects[i].innerText = chrome.i18n.getMessage(textKey)
  }
}  

//Set wait time
const waitTime = document.getElementById('wait_time')
chrome.storage.local.get('waitTime', (result) => {
  waitTime.value = result.waitTime / 1000
})

waitTime.addEventListener('change', (e) => {
  const waitTimeValue = waitTime.value * 1000
  chrome.storage.local.set({'waitTime': waitTimeValue})  
})

//Set open link in new tab
const openLinkInNewTabSetter = document.getElementById('open_link_in_new_tab_setter')
const openLinkInNewTabSwitch = document.getElementById('open_link_in_new_tab_switch')
const openLinkInNewTabOffIndicator = document.getElementById('on_off_label_open_link_in_new_tab')

chrome.storage.local.get('openLinkInNewTab', (result) => {  
  if (result.openLinkInNewTab) {
    openLinkInNewTabSetter.classList.remove('inactive')
    openLinkInNewTabSwitch.checked = true
    openLinkInNewTabOffIndicator.innerHTML = 'on'
  }
})

openLinkInNewTabSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'openLinkInNewTab': true})    
    openLinkInNewTabSetter.classList.remove('inactive')
    openLinkInNewTabOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'openLinkInNewTab': false})    
    openLinkInNewTabSetter.classList.add('inactive')
    openLinkInNewTabOffIndicator.innerHTML = 'off'
  }
})

//Go to new tab
const goToNewTabSetter = document.getElementById('go_to_new_tab_setter')
const goToNewTabSwitch = document.getElementById('go_to_new_tab_switch')
const goToNewTabOffIndicator = document.getElementById('on_off_label_go_to_new_tab')

chrome.storage.local.get('goToNewTab', (result) => {  
  if (result.goToNewTab) {
    goToNewTabSetter.classList.remove('inactive')
    goToNewTabSwitch.checked = true
    goToNewTabOffIndicator.innerHTML = 'on'
  }
})

goToNewTabSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'goToNewTab': true})    
    goToNewTabSetter.classList.remove('inactive')
    goToNewTabOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'goToNewTab': false})    
    goToNewTabSetter.classList.add('inactive')
    goToNewTabOffIndicator.innerHTML = 'off'
  }
})

//Close page button
document.getElementById('close').addEventListener('click', () => { window.close() })