(function ($) {
	$(document).ready(function() {

    $('a.next-pane').click(function(e){

      event.preventDefault(e);

      $(this).closest('.pane').next('.pane').addClass('visible').find('.slider').slick({
        dots: true,
        arrows: false,
        accessibility: false,
        adaptiveHeight: true
      });

      $('html,body').animate({
        scrollTop:$(this).closest('.pane').next('.pane').offset().top
      }, 250);
    });

	});
})(jQuery);
