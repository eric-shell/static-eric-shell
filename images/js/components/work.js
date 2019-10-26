(function ($) {

  $('.work button').click(function () {
    $('.work__list').slideToggle(function () {
      $('html, body').animate({
        scrollTop: $(this).offset().top
      });
    });
  });

})(jQuery);
