    const worksheetsURLs = [
      { "kids-pages.com": "https://www.kids-pages.com/worksheets.htm" },
      { "greatschools.org": "https://www.greatschools.org/gk/worksheets/" },
      { "edubuzzkids.com": "https://www.edubuzzkids.com/worksheets" },     
      { "jumpstart.com": "https://www.jumpstart.com/worksheets/" },
      { "dltk-kids.com": "https://www.dltk-kids.com/top10.htm" },      
      { "123homeschool4me.com": "https://www.123homeschool4me.com/home-school-free-printables/" },      
      { "anglomaniacy.pl": "https://www.anglomaniacy.pl/printables-worksheets.htm" }
    ];

    function updateIFrameURL(i)
	{
		const newURL = Object.values(worksheetsURLs[i])[0];
		document.querySelector('#iframe-content').src = newURL;
	}

    function populateList(){
		document.querySelector('#wsLinks').innerHTML = "";
		worksheetsURLs.forEach((el, i) => {			
			let list = document.createElement('li');
			list.addEventListener("click", () => updateIFrameURL(i));
			list.innerText = Object.keys(el)[0];
			document.querySelector('#wsLinks').append(list);
		})
	};

	populateList();

	let randomWebsiteIndex = parseInt( Math.random() * 100 % worksheetsURLs.length );
	updateIFrameURL(randomWebsiteIndex);