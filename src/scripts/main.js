function tocNavigation(){
    var toc = document.getElementById('toc');
    var hx = $('h2, h3, h4, h5', 'section');
    var hx_len = hx.length;
    var toc_contents = '';
    var anchor, tag, the_text;
    var firstBlock = false;

    var firstWord = /\w+/;
    var currentMatch = '';
    var inner;

    for (var i = 0, j = hx_len; i < j; i++) {
        tag = hx[i].tagName.toLowerCase();
        inner = '';

        if (tag === 'h2') {
            currentMatch = firstWord.exec(hx[i].innerHTML);
            currentMatch = currentMatch[0].toLowerCase();
        }

        the_text = $.trim(hx[i].innerHTML);
        anchor = currentMatch + '_' + the_text.replace(/\s+|\-/g, '_').replace(/[^A-Z0-9_]/gi, '').replace(/_+/g, '_').toLowerCase();
        inner += '<a href="#' + anchor + '" class="anchor_link js-here" title="Permalink"></a>';

        if (tag === 'h2' || tag === 'h3') {
            toc_contents += '<li class="' + tag + '"><a href="#' + anchor + '">' + the_text + '</a></li>';
        }
        if (tag === 'h2' && firstBlock === true) {
            inner += '<a href="#" class="back-anchor" title="Top">Back to Top</a>';
        }
        if (inner !== '') {
            hx[i].id = anchor;
            hx[i].innerHTML += inner;
        }
        if (tag === 'h2') {
            firstBlock = true;
        }
    }
    toc.innerHTML = toc_contents;
    toc.style.display = 'block';
}

function smoothScroll(){
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}


$(document).ready(function(){

    tocNavigation();
    smoothScroll();
    $('.nav-toc').fixedsticky();
});

