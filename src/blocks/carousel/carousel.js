
$(document).ready(function(){
    var $next = $('.js-carousel__control-next');
    var $prev = $('.js-carousel__control-prev');
    var $owlWork = $('.js-carousel');

    $owlWork.owlCarousel({
        loop: true,
        merge:true,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items: 1,
                margin: 0
            },
            // breakpoint from 480 up
            480 : {
                items: 2,
                margin: 20
            },
            // breakpoint from 768 up
            1024 : {
                items: 3,
                margin: 30
            }
        }

    });



    $next.on('click', function(){
        var $carousel = $(this).parent().find('.js-carousel')
        $carousel.trigger('next.owl.carousel');
    })
    $prev.on('click', function(){
        var $carousel = $(this).parent().find('.js-carousel')
        $carousel.trigger('prev.owl.carousel');
    })

});
