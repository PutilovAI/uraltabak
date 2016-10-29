;$(document).ready(function(){
    var $sidebar = $('.js-sidebar'),
        $button = $('.js-sidebar-button');

    $button.on('click', function(e){
        var $this = $(this);

        if ( $this.hasClass('show') ){
            hideList();
        } else {
            showList()
        }

        function hideList(){
            $this.removeClass('show');
            $sidebar.removeClass('show');
            $(document).off('click.sidebar');
        }
        function showList(){
            $this.addClass('show');
            $sidebar.addClass('show');
            $(document).on('click.sidebar', function(e){
                if ( $(e.target).closest($this).length || $(e.target).closest($sidebar).length) return;
                hideList();
            })
        }
    })

});
