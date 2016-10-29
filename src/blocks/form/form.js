(function( $ ){
    var namePlugin = 'validForm',
        __item     = '.js-valid-form__item',
        __button   = '.js-valid-form__button',
        __error    = '.js-valid-form__error';

    var methods = {
        init : function( options ) {

            return this.each(function(){

                var $this = $(this),
                    data = $this.data(namePlugin),
                    $items = $this.find(__item),
                    $inputs = $items.find('input'),
                    $buttons = $items.find(__button),
                    idTimer = null;

                 // Если плагин ещё не проинициализирован
                 if ( ! data ) {
                   //Тут выполняем инициализацию
                   $(this).data(namePlugin, {
                       target : $this
                   });
                }

                $inputs.on('validation.' + namePlugin, function(){
                    _inputValidation($(this));
                })

                $this.on('submit', function(e){
                    $inputs.trigger('validation.' + namePlugin);
                    var isValidForm = _validationForm($(this));

                    if (!isValidForm){
                        return false;
                    }

                })

                $inputs.on('keydown focusout', function(){
                    var $input = $(this);
                    clearTimeout(idTimer);

                    idTimer = setTimeout(function(){
                        _inputValidation($input);
                    }, 50)
                });

            });
        },
        destroy : function( ) {

            return this.each(function(){

             var $this = $(this),
                 data = $this.data(namePlugin);

             // пространства имён рулят!!11
             $(window).unbind('.' + namePlugin);
             $this.removeData(namePlugin);

            })

        },
        vilidation : function( ) {
            return this.each(function(){
                var $this = $(this);
                _validationForm($this);
            })
        }
    };

    function _validationForm($form){
        var $items = $form.find(__item),
            countitems = $items.length,
            countValiditems = 0,
            isValidForm = false;

        $items.each(function(){
            var $item = $(this),
                isValid = $item.data('isvalid');
                console.log('item valid = ' + isValid);
            if (isValid){
                countValiditems ++
            }
        })

        //Форма валидна, если все элементы формы прошли валидацию или элементов вовсе нет
        if ( countitems === countValiditems || countitems === 0){
            _formSucces($form)
            isValidForm = true;
        } else {
            _formFailure($form);
            isValidForm = false;
        }
        return isValidForm;
    }

    function _formSucces($form) {
        $form.data('isvalid', true);
        console.log('форма валид')
    }
    function _formFailure($form) {
        $form.data('isvalid', false);
        console.log('форма инвалид')
    }

    function _inputValidation($input){
        var $item = $input.closest(__item),
            $error = $item.find(__error),
            type = $input[0].type,
            isvalid = false,
            value = $input.val();

        if ( type == 'text'){
            if ( $input.hasClass('js-mask-phone') ){
                value = value.replace(/\+7/, '').replace(/\D/g, '');

            }
            if ( value !== '' ){
                _inputSucces($input);
                isvalid = true;
            } else {
                _inputFailure($input);
                isvalid = false;
            }
        }

        return isvalid;
    }

    function _inputSucces($input){
        var $item = $input.closest(__item),
            $error = $item.find(__error);

        $item
            .data('isvalid', true)
            .removeClass('error')
            .addClass('succes');
        $input.data('isvalid', true);
        $error.fadeOut();
    }
    function _inputFailure($input){
        var $item = $input.closest(__item),
            $error = $item.find(__error);

        $item
            .data('isvalid', false)
            .addClass('error')
            .removeClass('succes');
        $input.data('isvalid', false);
        $error.fadeIn();
    }

  $.fn[namePlugin] = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    }

  };

})( jQuery );

$(document).ready(function(){
    $('.js-valid-form').validForm();
});
