
const processFilter = function(){
	let selectedFilter = null;
	Object.values(document.getElementsByName("filter")).filter(
		(item)=>{
			if(item.checked == true){
				selectedFilter = item.value;
			}
		}
	);
	let selectedPercent = document.querySelector("#percent");

	console.log(selectedFilter, selectedPercent);

	if(!selectedFilter){
		selectedPercent.value = 50;
		return;
	}

	chrome.tabs.executeScript(null, {file: "content.js"});
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {filter: selectedFilter, intensity: selectedPercent.value}, function(msg) {
		});
	});
}

document.querySelector("#percent").addEventListener("change", processFilter);
Object.values(document.getElementsByName("filter")).forEach(
	function(item){ item.addEventListener("change", processFilter)}
);
