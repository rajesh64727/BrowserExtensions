chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		let filterVal = "none";
		switch (request.filter) {
			case 'blur':
				filterVal = request.filter +"("+request.intensity+"px)";
				break;
			case 'grayscale': 	
			case 'brightness': 	
			case 'contrast':
				filterVal = request.filter+"("+request.intensity+"%)";
				break;
			case 'reset':
			default: 
				filterVal = "none";
				break;
		}
		document.querySelector('body').style.filter = filterVal;
		console.clear();
	}
);