chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let result = null,
    returnVal = null,
    scripListRaw = null;
  switch (request.greeting) {
    case "is_zerodha":
      result = location.href.indexOf("kite.zerodha.com") != -1;
      returnVal = JSON.stringify(result);
      sendResponse({ ZResponse: returnVal });
      break;

    case "scrips":
      scripListRaw = document.getElementsByClassName("symbol");
      result = [];
      for (i = 0; i < scripListRaw.length; i++) {
        var mixList = scripListRaw[i].outerText.split(" ");

        if (
          mixList.length < 4 &&
          scripListRaw[i].outerHTML.indexOf("exchange") == -1
        ) {
          result.push(scripListRaw[i].outerText.split(" ")[0]);
        }
      }
      returnVal = JSON.stringify(result);
      sendResponse({ ZResponse: returnVal });
      break;

    case "holdingScrips":
      scripListRaw = document.querySelectorAll(".instrument.right-border");
      result = [];
      for (i = 1; i < scripListRaw.length; i++) {
        result.push(scripListRaw[i].outerText.split(" ")[0]);
      }
      returnVal = JSON.stringify(result);
      sendResponse({ ZResponse: returnVal });
      break;

    case "refresh":
      location.reload();
      break;

    case "goFullScreen":
      /* Thanks to sanam.patel.1 */
      document
        .querySelectorAll(".app .wrapper, .container")
        .forEach(function (item) {
          item.style.maxWidth = "100%";
        });
      document
        .querySelectorAll(".app .wrapper .container-right")
        .forEach(function (item) {
          item.style.maxWidth = "70.70%";
        });
      document
        .querySelectorAll(".app .container .container-left")
        .forEach(function (item) {
          item.style.flex = "0 0 29.30%";
        });
      document
        .querySelectorAll(
          ".app .container .container-left .marketwatch-wrap, .marketwatch-sidebar .marketwatch-selector"
        )
        .forEach(function (item) {
          item.style.width = "29.30%";
        });
      document
        .querySelectorAll(".marketwatch-sidebar .marketwatch-selector li.item")
        .forEach(function (item) {
          item.style.padding = "10px 25px";
        });
      document.documentElement.webkitRequestFullscreen();
      break;

    default:
      sendResponse({ ZResponse: "Something bad happened" });
      break;
  }
  calculateBrokerage();
});

// Brokerage and Tax calculations

function calculateBrokerage(){
	if (location.href.indexOf("kite.zerodha.com/orders") != -1) 
	{
		let successTrades = [...document.querySelectorAll(".completed-orders table tbody tr")];

		let tradeData = successTrades.map( trade => {
			return(  {
			tranType : trade.querySelector('.transaction-type span').innerText,
			product : trade.querySelector('.product').innerText,
			exchange : trade.querySelector('.instrument .exchange').innerText,
			quantity : trade.querySelector('.quantity').innerText.split('/')[0],
			price : trade.querySelector('.average-price span').innerText.split('/')[0],
			status : trade.querySelector('.order-status span').innerText
			}
			);
		});

		let totalCharges = 0.0;
		let totalBrokerage = 0.0;
		let govtCharges = 0.0;

		tradeData.forEach( trade => {

			if(trade.status == 'COMPLETE' && trade.product == 'MIS'){
				const price = parseFloat(trade.price);
				const turnover = parseFloat(trade.quantity) * price;
				let brokerage = 0;
				switch(trade.exchange){
					case 'NFO' : brokerage = 20; break;
					case 'NSE' :
					case 'BSE': brokerage = turnover * 0.0003; 
								brokerage = brokerage > 20 ? 20 : brokerage; 							
								break;
					default : 0; break;
				}
				
				const STT = trade.tranType == 'SELL'? parseFloat(turnover * 0.00025): 0.0 ;
				const transactionCharges = parseFloat(turnover * 0.0000345);
				const GST = parseFloat(( brokerage + transactionCharges ) * 0.18);
				const SEBICharges = parseFloat( turnover / 1000000 );
				const stampDuty = trade.tranType == 'BUY' ? parseFloat(turnover * 0.00003) : 0.0;

				let taxes = STT + transactionCharges + GST + SEBICharges + stampDuty;
				totalBrokerage += brokerage;
				govtCharges += taxes;

				totalCharges += brokerage + taxes;
		}
		});

		// Check for the placeholder and update the brokerage amount
		const brokerContainer = document.getElementById( "scripplus-brokerage-container");
		if (brokerContainer == null || brokerContainer == undefined) {
			let brokerContainer = document.createElement("div");
			brokerContainer.id = "scripplus-brokerage-container";
			brokerContainer.classList.add("broker-container");
			document.querySelector(".completed-orders").insertBefore( brokerContainer, document.querySelector(".completed-orders").childNodes[0] );
			brokerContainer.innerHTML = "Intraday ( MIS ) charges : <b>" + totalCharges.toFixed(2) + "</b> <br><span class='small'> Brokerage : "+totalBrokerage.toFixed(2)+" , Government Taxes : "+ govtCharges.toFixed(2) + "</span>";
		}  
	}
}

// This will load the brokerage UI after the document load

let fnBrokerageUpdater = setInterval( function(){
  if(document.querySelector(".completed-orders") != null){
    calculateBrokerage();
    clearInterval(fnBrokerageUpdater);
  } console.log('Test');
}, 3000);

window.onload = fnBrokerageUpdater;