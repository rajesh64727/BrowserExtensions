
let imgInfoArray = [];

const displayImageInfoTable = function(imageList=imgInfoArray){
	let imgTable = imageList.map((image)=>{
		let timeBarWidth = image.time;
		let timeBarColor = "red";
		if(timeBarWidth < 150){
			timeBarColor = "green"
		}else if(timeBarWidth < 400){
			timeBarColor = "orange";
		}
		return `
		<div class="imgRow">
			<div class="imgThumb">
				<a href=${image.src} target="_blank">
					<img src=${image.src} class="thumbnail" />
				</a>
			</div>
			<div class="downloadImage">            	
				<span>${image.width} x ${image.height}</span>
				<div style="background-color:${timeBarColor}" > ${image.time} ms</div>
				<a href=${image.src} download>Download</a>
			</div>		
		</div>
		`;		
	});

	document.querySelector("#btnGetImages").style.display = "none";

	document.querySelector("#displayOptions").style.display = "block";

	document.querySelector("#imagesInfo").style.display = "block";
	document.querySelector("#imagesInfo").innerHTML = imgTable.join('');
	
	let imgURLs = imageList.map((image)=>{return `<span class="imgSource">${image.src}</span>`});
	document.querySelector(".imageList").innerHTML = imgURLs.join('');
}

const selectDisplayTab = function(){
	Object.values(document.getElementsByName("imgOption")).forEach(
		(item)=>{
			if(item.checked == true){
				if(item.value == "thumbnail"){
					document.querySelector("#imagesInfo").style.display = "block";
					document.querySelector("#utility").style.display = "none";
				}else{
					document.querySelector("#utility").style.display = "block";
					document.querySelector("#imagesInfo").style.display = "none";				
				}
			}
		}
	);
}


imgInfoArray.sort(function(a, b) {
	if (a.time < b.time) return -1;
	if (a.time > b.time) return 1;
	return 0;
	});


const getImageListFromWebpage = function() {
	chrome.tabs.executeScript(null, { file: "content.js" });
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: "getImages" }, function (msg) {
			if(msg.response){	
				imgInfoArray = Object.values(msg.response);
				imgInfoArray.sort(function(a, b) {
					if (a.time < b.time) return -1;
					if (a.time > b.time) return 1;
					return 0;
					});
				displayImageInfoTable();
			}
		});
	});
}

const downloadAllImages = function(){
	document.querySelectorAll(".downloadImage a").forEach(
		function(image){			
			image.click();
		}
	);
}

document.querySelector("#btnGetImages").addEventListener('click', getImageListFromWebpage);
document.querySelector("#downloadAll").addEventListener('click', downloadAllImages);
Object.values(document.getElementsByName("imgOption")).forEach(
	function(item){ item.addEventListener("change", selectDisplayTab)}
);