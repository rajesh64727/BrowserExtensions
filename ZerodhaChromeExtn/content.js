chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		let result = null, returnVal = null, scripListRaw = null;
		switch(request.greeting){
			case "is_zerodha": 
				result = location.href.indexOf('kite.zerodha.com') != -1;
				returnVal = JSON.stringify(result);
				sendResponse({ ZResponse: returnVal });
				break;

			case "scrips": 
				scripListRaw = document.getElementsByClassName('symbol');
				result = [];
				for (i = 0; i < scripListRaw.length; i++) {
					var mixList = scripListRaw[i].outerText.split(' ');

					if (mixList.length < 4 && scripListRaw[i].outerHTML.indexOf('exchange') == -1) {
						result.push(scripListRaw[i].outerText.split(' ')[0]);
					}
				}
				returnVal = JSON.stringify(result);
				sendResponse({ ZResponse: returnVal });
				break;

			case "holdingScrips": 
				scripListRaw = document.querySelectorAll('.instrument.right-border');
				result = [];
				for (i = 1; i < scripListRaw.length; i++) {
					result.push(scripListRaw[i].outerText.split(' ')[0]);
				}
				returnVal = JSON.stringify(result);
				sendResponse({ ZResponse: returnVal });
				break;

			case "refresh": 
				location.reload();
				break;

			case "goFullScreen":
				/* Thanks to sanam.patel.1 */
				document.querySelectorAll('.app .wrapper, .container').forEach(
					function(item){
						item.style.maxWidth = "100%";
				}); 
				document.querySelectorAll('.app .wrapper .container-right').forEach(
					function(item){
						item.style.maxWidth = "70.70%";
				});
				document.querySelectorAll('.app .container .container-left').forEach(
					function(item){
						item.style.flex = "0 0 29.30%";
					});
				document.querySelectorAll('.app .container .container-left .marketwatch-wrap, .marketwatch-sidebar .marketwatch-selector').forEach(
					function(item){
						item.style.width = "29.30%";
					}); 
				document.querySelectorAll('.marketwatch-sidebar .marketwatch-selector li.item').forEach(
					function(item){
						item.style.padding = "10px 25px";
				});
				document.documentElement.webkitRequestFullscreen();
				break;

			default: 
				sendResponse({ ZResponse: "Something bad happened" });	
				break;
		}
	}
);