;$(document).ready(function(){
    $('.js-section-scroll').on('click', function(e){
        e.preventDefault();

        var $section = $(this).parents('.section'),
            curPageScroll = $(window).scrollTop();
            sectionTop = $section[0].getBoundingClientRect().top
            newTop = 0;

        newTop = curPageScroll + sectionTop;

         $('body, html').animate({scrollTop: newTop +'px'}, 500);

    });
});
