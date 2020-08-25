chrome.browserAction.onClicked.addListener(function(tab) {
  let message = {
    action: 'show_coolors'
  };

  chrome.tabs.sendMessage(tab.id, message);
});

