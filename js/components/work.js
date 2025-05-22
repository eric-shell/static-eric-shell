(function ($) {
  $('.work__footer').on('click', '.button', function() {
    $('.work__items').removeClass('work__items--preview');
    $('.work__footer').css('display', 'none');
  });
}(jQuery));
