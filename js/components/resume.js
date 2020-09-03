$(function() {

  var currentPane = 1;

  $('.resume button').click(function () {
    currentPane++;
    $('.pane:nth-child(' + currentPane + ')').slideToggle(function () {
      var scrollDistance = $(this).offset().top;
      $('html, body').animate({
        scrollTop: scrollDistance
      });
    });
  });

});
