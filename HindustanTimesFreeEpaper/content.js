chrome.runtime.onMessage.addListener(processMessage);

// Useless - Start //
function processMessage(request, sender, sendResponse) {
    if(request.action == "load_HTEP"){
        console.log(request); 
    }    
}
// Useless - End //

window.onload = function() {
    document.cookie = "_skipSignIn=PKMKB_CKMKB; expires=Sat, 28 Sep 2028 12:00:00 UTC; path=/";
    document.querySelector('header').style.display = 'none';
    console.clear();
}
