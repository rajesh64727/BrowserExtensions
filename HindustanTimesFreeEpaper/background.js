// Useless - Start //
chrome.browserAction.onClicked.addListener(function(tab) {
    let message = {
      action: 'load_HTEP'
    };  
    chrome.tabs.sendMessage(tab.id, message);
  });
// Useless - End //