// Remove ads
document.querySelectorAll('[id*=div-gpt-ad] , [id*=oa-360-]').forEach(ad => ad.style.display = 'none');

// Full width articles
document.querySelectorAll('.article-headline-fixed + div > div').forEach(dv => dv.classList.remove('col-lg-10', 'col-lg-5'));
