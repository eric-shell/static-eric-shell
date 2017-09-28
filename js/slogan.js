(function ($) {

  $('.slogan a').mouseover(function () {
    $('.slogan').addClass('spread');
  });

  $('.slogan a').mouseout(function () {
    $('.slogan').removeClass('spread');
  });

})(jQuery);
