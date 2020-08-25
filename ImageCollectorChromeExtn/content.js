chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		let imageInfo = [];
		switch(request.action){
			case "getImages": 
				Object.values(document.images).forEach(
					function(item){
						let imgSrc = item.src;
						let duration = 9999;
						if(performance && performance.getEntriesByName(imgSrc)[0] && performance.getEntriesByName(imgSrc)[0].duration){
							duration = parseInt(performance.getEntriesByName(imgSrc)[0].duration);
						}
						let imgAlt = item.alt;
						let width = item.width;
						let height = item.height;
						imageInfo.push({src: imgSrc, time: duration, alt:imgAlt, width:width, height:height});
					}
				);
				
				Object.values(document.all).forEach(
					function(item){
						let imgSrc = window.getComputedStyle(item).getPropertyValue('background-image');
						if( imgSrc != 'none' && imgSrc.indexOf('url') != -1){
							imgSrc = imgSrc.replace('url("', '').replace('")', '');
							let duration = 9999;
							if(performance && performance.getEntriesByName(imgSrc)[0] && performance.getEntriesByName(imgSrc)[0].duration){
								duration = parseInt(performance.getEntriesByName(imgSrc)[0].duration);
							}
							let imgAlt = "NA";
							let width = "BG-Image";
							let height = "";
							imageInfo.push({src: imgSrc, time: duration, alt:imgAlt, width:width, height:height});
						}
					}
				);

				imageInfo = imageInfo.filter((v,i,a)=>a.findIndex(t=>(t.src === v.src))===i);
				sendResponse({ response: imageInfo});
				break;
			default: 
				sendResponse({ response: null });	
				break;
		}
	}
);