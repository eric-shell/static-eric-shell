$(function() {

  var currentPane = 1;

  $('.resume button').click(function () {

    if($(this).hasClass('begin')) {
      $('.pane--intro').slideToggle();
    };

    currentPane++;

    $('.pane:nth-child(' + currentPane + ')').slideToggle(function () {
      var scrollDistance = $(this).offset().top;
      $('html, body').animate({
        scrollTop: scrollDistance
      });
    });
  });

});
