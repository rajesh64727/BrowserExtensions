let loadContent = function(){
	let loginPrompt = document.getElementsByClassName('login-col')[0];
	if(loginPrompt != null) loginPrompt.parentNode.removeChild(loginPrompt);
}

let navClick = function(direction){
	chrome.tabs.executeScript(null, {file: "content.js"});
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: direction}, function(msg) {
		});
	});
};

document.getElementById("btnClear").addEventListener("click", function(){ navClick('clear') });