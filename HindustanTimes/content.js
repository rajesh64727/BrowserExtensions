// To enable scroll behaviour even if the popup is visible
document.querySelector('body').style.overflowY = "scroll";

// To give enough news articles before the popup code kicks in
if(typeof setCookie != 'undefined' ){
    setCookie("articleCount", -9999 , 30);
}

// Remove ads
document.querySelectorAll('.mb10, .mb20, .mb30, .centerAd, .ad-min, .rightSec').forEach( ad => ad.style.display = "none")

// Full width articles
document.querySelectorAll("[id*=article_] > div").forEach( cl => cl.classList.remove("col9"));
