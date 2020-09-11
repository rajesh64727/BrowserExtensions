window.onload = function() {
    removeAds();
    setInterval(removeAds(), 5000);    
}

function removeAds(){    
    console.clear();
    document.querySelector('body').style.overflow = "scroll";
    document.querySelectorAll('[id*=dfp-], [class*="google-dfp"] ').forEach(elm => elm.style.display = "none");
    if(document.querySelector('metering-modal')){
        document.querySelector('metering-modal').style.display = "none";
    }
}