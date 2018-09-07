(function ($) {

  $('.contributions button').click(function () {
    $('.work').slideToggle(function () {
      $('html, body').animate({
        scrollTop: $(this).offset().top
      });
    });
  });

})(jQuery);
