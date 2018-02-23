(function ($) {

  $('.freelance a').mouseover(function () {
    $(this).parent().parent().addClass('hover');
  });

  $('.freelance a').mouseout(function () {
    $(this).parent().parent().removeClass('hover');
  });

})(jQuery);
