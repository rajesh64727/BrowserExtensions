chrome.runtime.onMessage.addListener(processMessage);

function processMessage(request, sender, sendResponse) {
    if (document.getElementById("coolors-co") != null) {
        document.getElementById("coolors-co").classList.toggle('d-none');
        return 0;
     } else {
        let coo_iframe = document.createElement('iframe');
        coo_iframe.id = "coolors-co";
        coo_iframe.src = "https://coolors.co/chrome/index.html";
        document.body.insertBefore(coo_iframe, document.body.childNodes[0]);

        dragElement(coo_iframe);
    }
}


  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
      elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }