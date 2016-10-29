$(document).ready(function(){
    $('.js-select').selectize();

    $('.js-mask-phone').mask("+7 (999) 999-99-99",
        { completed:function(){
            this.trigger('validation.validForm');
            this.closest('.js-valid-form').trigger('validation.vilidForm');
            console.log('finish');
        } },
        { autoclear: false },
        { placeholder:"+7 (___) ___-__-__" });

});
