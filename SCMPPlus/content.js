chrome.runtime.onMessage.addListener(processMessage);

const cookieList = ["xbc", "kw.pv_session", "kw.session_ts", "scmp_edition", "scmp_subscriber"];

window.onload = function() {
    removeAds();
    setInterval(removeAds(), 5000);    
}

function processMessage(request, sender, sendResponse) {
    if(request.action == "load_SCMP"){
        removeAds();
        location.reload();
    }    
}

function removeAds(){    
    console.clear();
    document.querySelectorAll('[class*="-ad-"]').forEach(elm => elm.remove());     
    
    cookieList.forEach( ck => {        
        document.cookie = ck +"=''; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.scmp.com";        
    });
    console.log("Values updated");
    localStorage.clear();
}