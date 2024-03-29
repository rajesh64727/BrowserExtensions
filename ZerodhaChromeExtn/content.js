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
      symbol : trade.querySelector('.instrument .tradingsymbol')?.innerText,
			tranType : trade.querySelector('.transaction-type span')?.innerText,
			product : trade.querySelector('.product')?.innerText,
			exchange : trade.querySelector('.instrument .exchange')?.innerText,
			quantity : trade.querySelector('.quantity')?.innerText.split('/')[0],
			price : trade.querySelector('.average-price span')?.innerText.split('/')[0],
			status : trade.querySelector('.order-status span')?.innerText
			}
      );
		});

		let totalBrokerage = 0.0;
		let govtCharges = 0.0;
    let totalSTT = 0.0;
    let totalSEBI = 0.0;
    let totalGST = 0.0;
    let totalStamp = 0.0;
    let totalTransactionCharges = 0.0;

		tradeData.forEach( trade => {

			if(trade.status == 'COMPLETE' && ( trade.product == 'MIS' || trade.product == 'CO' || trade.product == 'NRML') ){
				const price = parseFloat(trade.price.replace(/\,/g,''));
				const turnover = parseFloat(trade.quantity) * price;
				let brokerage = 0;
        let transactionCharges = 0;
        let STT = 0;
        let isOptions = trade.symbol.endsWith('CE') || trade.symbol.endsWith('PE');

				switch(trade.exchange){
					case 'NFO' : 
                brokerage = 20; 
                transactionCharges = isOptions ? parseFloat( turnover * 0.00053 ): parseFloat( turnover * 0.00002);
                STT = isOptions ? parseFloat( turnover * 0.0005 ) : parseFloat( turnover * 0.0001 );
                break;
					case 'NSE' :
					case 'BSE': brokerage = turnover * 0.0003; 
								brokerage = brokerage > 20 ? 20 : brokerage; 							                
                transactionCharges = parseFloat( turnover * 0.0000345 );
                STT = parseFloat(turnover * 0.00025);
                STT = STT > 1 ? STT : 1;
								break;
					default : 0; break;
				}

        if(trade.tranType == "BUY"){ STT = 0; }
				
				const GST = parseFloat(( brokerage + transactionCharges ) * 0.18);
				const SEBICharges = parseFloat( turnover / 1000000 );
				const stampDuty = trade.tranType == 'BUY' ? parseFloat(turnover * 0.00003) : 0.0;

        totalTransactionCharges += transactionCharges;
        totalGST += GST;
        totalSEBI += SEBICharges;
        totalStamp += stampDuty;
        totalSTT += STT;

				let taxes = STT + transactionCharges + GST + SEBICharges + stampDuty;
				totalBrokerage += brokerage;
				govtCharges += taxes;
		  }
		});


		// Check for the placeholder and update the brokerage amount
		let brokerageContainer = document.getElementById( "scripplus-brokerage-container");
		if (brokerageContainer == null || brokerageContainer == undefined) {
			brokerageContainer = document.createElement("div");
			brokerageContainer.id = "scripplus-brokerage-container";
			brokerageContainer.classList.add("broker-container");
			document.querySelector(".completed-orders").insertBefore( brokerageContainer, document.querySelector(".completed-orders").childNodes[0] );
    }
    
    brokerageContainer.innerHTML = "Intraday ( MIS ) charges : <b>Rs. " 
      + (totalBrokerage + govtCharges).toFixed(2) 
      + "</b> <button class='refreshBrokerage' id='btnRefreshBrokerage' >Refresh</button>  <br><span class='small'> Brokerage : "
      +totalBrokerage.toFixed(2)
      +" , Taxes : "
      + govtCharges.toFixed(2) 
      + "<br> [ STT : "+totalSTT.toFixed(2) 
      + ", SEBI : "+totalSEBI.toFixed(2) 
      + ", Transacation Charges : "+totalTransactionCharges.toFixed(2) 
      + ", GST : "+totalGST.toFixed(2) 
      + ", StampDuty : "+totalStamp.toFixed(2) 
      +" ]</span>";
	}
}

// This will load the brokerage UI after the document load


window.onload = function(){

  document.querySelector('.orders-nav-item').addEventListener('click', function(){
    setTimeout(() => {
      if(document.querySelector(".completed-orders") != null){
        calculateBrokerage();
        document.querySelector('#btnRefreshBrokerage').addEventListener("click", calculateBrokerage);
      }      
    }, 1000);    

  });

}
