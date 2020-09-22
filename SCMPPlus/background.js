chrome.browserAction.onClicked.addListener(function(tab) {
    let message = {
      action: 'load_SCMP'
    };  
    chrome.tabs.sendMessage(tab.id, message);
  });