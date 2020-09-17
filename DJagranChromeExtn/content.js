window.onload = function () {
  document.cookie = "abc=rajesh64727";
  let loginPrompt = document.getElementsByClassName("login-col")[0];
  if (loginPrompt != null) loginPrompt.parentNode.removeChild(loginPrompt);
  document
    .querySelectorAll('.ads, .gutter-banner, [id*="389882"]')
    .forEach(function (item) {
      item.remove();
    });
  console.clear();
};
