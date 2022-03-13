function displayFullContent(){
	document.querySelectorAll('.nytc---modal-window---isShown, .ad-container').forEach(el => el.style.display = 'none');
	document.querySelectorAll('.nytc---modal-window---noScroll').forEach(el => el.classList.remove('nytc---modal-window---noScroll'));
}


window.onload = function () {
	setTimeout(() => displayFullContent(), 500);
	console.clear();
  };
  