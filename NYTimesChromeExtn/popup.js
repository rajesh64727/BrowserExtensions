let navClick = function(command){
	chrome.tabs.executeScript(null, {file: "content.js"});
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: command}, function(msg) {
		});
	});
};

document.getElementById("btnAccess").addEventListener("click", function(){ navClick('readAll') });
document.getElementById("btnRemoveAds").addEventListener("click", function(){ navClick('removeAds') });