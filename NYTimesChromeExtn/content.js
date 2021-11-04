chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		switch (request.action) {
			case 'readAll': 
				ReadArticles();
				break;
			case 'removeAds': 
				removeAds();
				break;
			default: break;
		}
		console.clear();
	}
);

function ReadArticles(){
	if(document.querySelector('#gateway-content')){
		document.querySelector('#gateway-content').style.display = "none"; 
	}
		 
	if(document.querySelector('#app div div')){
		document.querySelector('#app div div').style.overflowY = "scroll";
	}
	if(document.querySelector('#app div div')){
		document.querySelector('#app div div').lastElementChild.style.display = "none";
	}

	if(document.querySelector('.css-mcm29f')){
		document.querySelector('.css-mcm29f').style.overflowY = "scroll";
		document.querySelector('.css-mcm29f').lastElementChild.style.display="none";
	}
	if(document.querySelector('#site-content')){
		document.querySelector('#site-content').style.position = "relative";
	}
}


function removeAds(){
	document.querySelectorAll('[id*="wrapper"]').forEach(function(item){item.style.display = "none";});

	document.querySelectorAll('[data-testid="StandardAd"]').forEach(function(item){
		item.parentNode.parentElement.remove();
	});
}

window.onload = function () {
	ReadArticles();
	setInterval(ReadArticles(), 10000);    
	console.clear();
  };
  