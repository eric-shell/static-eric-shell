(function ($) {
	$(document).ready(function() {

    $('a.next-pane').click(function(e){

      event.preventDefault(e);

      $(this).parent().parent().next('.pane').addClass('visible').find('.slider').slick({
        dots: true,
        arrows: false,
        accessibility: false
      });

      $('html,body').animate({
        scrollTop:$(this).parent().parent().next().offset().top
      }, 250);
    });

	});
})(jQuery);
