(function ($) {

  $('.resume button').click(function () {

    $(this).closest('.pane').removeClass('current').next('.pane').addClass('visible').addClass('current');

    $('html,body').animate({
      scrollTop: $(this).closest('.pane').next('.pane').offset().top + 100
    }, 350);
  });

})(jQuery);
