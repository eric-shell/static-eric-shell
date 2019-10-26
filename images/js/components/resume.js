(function ($) {

  var currentPane = 1;

  $('.resume button').click(function () {
    currentPane++;
    $('.pane:nth-child(' + currentPane + ')').slideToggle(function () {
      $('html, body').animate({
        scrollTop: $(this).offset().top
      });
    });
  });

})(jQuery);
