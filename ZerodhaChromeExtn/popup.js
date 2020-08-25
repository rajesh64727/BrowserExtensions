var scripList;
var HoldingScripList;
//Prepare list of URLs to be inserted into ScripsInfo
// 1. Screener
var screenerBaseURL = 'https://www.screener.in/company/';
// 2. Chartink
var chartInkBaseURL = 'http://chartink.com/stocks/__SCRIPCODE__.html';
// 3. NSE Guide
var NSEGuideBaseURL = 'http://nseguide.com/charts.php?';

$(document).ready(function () {
	chrome.tabs.executeScript(null, { file: "content.js" });
	loadContent();
});

$('#btnRefresh').click(function () {
	loadContent();
});

$('#btnFullscreen').click(function () {
	goFullScreen();
});


const loadMarketwatch = function(){
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { greeting: "scrips" }, function (msg) {
			scripList = $.parseJSON('[' + msg.ZResponse + ']')[0];

			if (msg.ZResponse && scripList.length > 0) {
				$('#marketwatch').empty();
				var listHolder = $('<ul />');
				$("#marketwatch").append(listHolder);

				for (i = 0; i < scripList.length; i++) {
					var scrLink = $('<a href="' + screenerBaseURL + scripList[i] + '" id="' + scripList[i] + '_ScreenerLink"> Screener </a>');

					var ciURL = chartInkBaseURL.replace('__SCRIPCODE__', scripList[i]);
					var ciLink = $('<a href="' + ciURL + '" id="' + scripList[i] + '_ChartInkLink"> ChartInk </a>');

					var NSEGuideLink = $('<a href="' + NSEGuideBaseURL + scripList[i] + '" id="' + scripList[i] + '_optionLink"> NSEGuide </a>');

					var dvScrip = $('<div class="Scrip" />').append(scripList[i]);
					var dvNSEGuide = $('<div class="Details" />').append(NSEGuideLink);
					var dvCi = $('<div class="Details" />').append(ciLink);
					var dvScr = $('<div class="Details" />').append(scrLink);
					var newListItem = $('<li />').append(dvScrip);
					newListItem.append(dvScr);
					newListItem.append(dvCi);
					newListItem.append(dvNSEGuide);
					listHolder.append(newListItem);
				};
			}
		});
	});
};

const loadHoldings = function(){
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { greeting: "holdingScrips" }, function (msg) {						
			HoldingScripList = $.parseJSON('[' + msg.ZResponse + ']')[0];
			if (msg.ZResponse && HoldingScripList.length > 0) {				
				$('#holdings').empty();
				var listHolder = $('<ul />');
				$("#holdings").append(listHolder);

				for (i = 0; i < HoldingScripList.length; i++) {
					var scrLink = $('<a href="' + screenerBaseURL + HoldingScripList[i] + '" id="' + HoldingScripList[i] + '_ScreenerLink"> Screener </a>');

					var ciURL = chartInkBaseURL.replace('__SCRIPCODE__', HoldingScripList[i]);
					var ciLink = $('<a href="' + ciURL + '" id="' + HoldingScripList[i] + '_ChartInkLink"> ChartInk </a>');

					var NSEGuideLink = $('<a href="' + NSEGuideBaseURL + HoldingScripList[i] + '" id="' + HoldingScripList[i] + '_optionLink"> NSEGuide </a>');

					var dvScrip = $('<div class="Scrip" />').append(HoldingScripList[i]);
					var dvNSEGuide = $('<div class="Details" />').append(NSEGuideLink);
					var dvCi = $('<div class="Details" />').append(ciLink);
					var dvScr = $('<div class="Details" />').append(scrLink);
					var newListItem = $('<li />').append(dvScrip);
					newListItem.append(dvScr);
					newListItem.append(dvCi);
					newListItem.append(dvNSEGuide);
					listHolder.append(newListItem);
				};
			}		
		});
	});
};

const loadContent = function() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { greeting: "is_zerodha" }, function (msg) {
			if(msg && $.parseJSON(msg.ZResponse)){
				loadMarketwatch();
				loadHoldings();
			}else{
				$('.container').html('Please visit <a href="https://kite.zerodha.com">Zerodha Kite </a>');
			}	
		});
	});
}

const goFullScreen =function(){
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { greeting: "goFullScreen" }, function (msg) {
			
		});
	});
}