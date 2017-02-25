(function ($) {
	$(document).ready(function() {

    $('a.next-panel').click(function(e){
      event.preventDefault(e);
      $(this).parent().parent().next('.panel').addClass('visible');
      $('html,body').animate({
        scrollTop:$(this).parent().parent().next().offset().top
      }, 250);
    });

    // Create sliders
    $('.slider').slick({
      prevArrow: '',
      nextArrow: '',
      dots: true,
      infinite: true,
      adaptiveHeight: true
    });

	});
})(jQuery);
