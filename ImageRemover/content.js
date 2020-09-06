chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
        switch(request.type){
            case 'page': document.designMode = 'on';
                break;
            case 'image':
                document.querySelectorAll('img').forEach( im => 
                    { 
                        if(im.src === request.imgURL){
                            if(request.mode == 'remove'){
                                im.remove();
                            }else if(request.mode == 'hide'){
                                im.style.visibility = 'hidden';
                            }
                        }
                    }
                );
                break;
            default : break;
        }
    }
);