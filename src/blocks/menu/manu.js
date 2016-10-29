;$(document).ready(function(){
    var $items = $('.js-menu-items'),
        $button = $('.js-menu-button');

    $button.on('click', function(e){
        var $this = $(this);

        if ( $this.hasClass('active') ){
            hideList();
        } else {
            showList()
        }

        function hideList(){
            $this.removeClass('active');
            $items.removeClass('active');
            $(document).off('click.menu');
        }
        function showList(){
            $this.addClass('active');
            $items.addClass('active');
            $(document).on('click.menu', function(e){
                if ( $(e.target).closest($this).length ) return;
                hideList();
            })
        }
    })

});
