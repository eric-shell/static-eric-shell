$(function() {

  $('.work__banner button').click(function () {
    $('.work__list, .work__banner').slideToggle();

    var scrollDistance = $(this).offset().top;
    $('html, body').animate({
      scrollTop: scrollDistance
    });
  });

});
