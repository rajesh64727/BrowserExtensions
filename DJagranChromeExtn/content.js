const cookieList = ["abc=demouser",
"name=demouser",
"jg_l=12345",
"abcuser=a6105c0a611b41b08f1209506350279e", 
"validauser=a6105c0a611b41b08f1209506350279e",
"uloc=india",
"hide=true"];


window.addEventListener('load', () => {
 let loginPrompt = document.getElementsByClassName("login-col")[0];
  if (loginPrompt != null) loginPrompt.parentNode.removeChild(loginPrompt);
  document
    .querySelectorAll('.ads, .gutter-banner, [id*="389882"]')
    .forEach(function (item) {
      item.remove();
    });

    if(getCookie("abc") == ''){
      cookieList.forEach(ck => {        
        document.cookie = ck.split('=')[0] + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
        document.cookie = ck+"; Path=/; Expires=Sat, 01 Jan 2029 00:00:01 GMT; domain=epaper.jagran.com;"
      })
     document.location.reload(true);
    }

    if(location.href.indexOf('all-editions') != -1){
      document.querySelectorAll('.content li > a').forEach( e => {
        if(e.href.indexOf('_new.html') == -1){
        e.href = e.href.replace('.html', '_new.html');
        }
      });
    }

  console.clear();
});


setInterval(function(){
  document.querySelectorAll('.disable').forEach(function (item) {
    item.classList.remove('disable');
  });
}, 1500);


// Helper Funtion //

function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();    
    if (cookie.startsWith(name + '=')) {      
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
