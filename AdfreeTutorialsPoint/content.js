chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		switch (request.action) {
			case 'showTable': 
				showTable();
				break;
			case 'removeAds': 
				removeAds();
				break;
			case 'resetAll':
				resetAll();
				break;
			default: break;
		}
		console.clear();
	}
);

function showTable(){
	document.querySelector(".tutorial-toc").style.display = "block";
	document.querySelector(".tutorial-content").classList.add('mui-col-md-8');
}

function removeAds(){
	document.querySelectorAll('#header, #ebooks_grid, [id^=google], .tutorial-toc').forEach(el => el.style.display = 'none');
	document.querySelector('.tutorial-content').classList.remove('mui-col-md-6', 'mui-col-md-8');
	document.body.style.zoom = "110%";
}


function resetAll(){
	document.querySelectorAll('#header, #ebooks_grid, [id^=google], .tutorial-toc').forEach(el => el.style.display = 'block');
	document.querySelector('.tutorial-content').classList.add('mui-col-md-6');
	document.querySelector('.tutorial-content').classList.remove('mui-col-md-8');
	document.body.style.zoom = "100%";
}


window.onload = function () {
	removeAds();
	showTable();	
	console.clear();
  };
  