(function ($) {
	$(document).ready(function() {

    $('.slogan a').mouseover(function(){
      $('.slogan').addClass('hover');
    });

    $('.slogan a').mouseout(function(){
      $('.slogan').removeClass('hover');
    });

	});
})(jQuery);
