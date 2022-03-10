let navClick = function(command){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: command}, function(msg) {
		});
	});
};

document.getElementById("btnShowTable").addEventListener("click", function(){ navClick('showTable') });
document.getElementById("btnRemoveAds").addEventListener("click", function(){ navClick('removeAds') });
document.getElementById("btnResetAll").addEventListener("click", function(){ navClick('resetAll') });