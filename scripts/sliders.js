(function ($) {
	$(document).ready(function() {

		$('#clients ul').slick({
      prevArrow: '<svg class="slick-prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><path class="path" d="M10.2 86.9l13.3-13.3 126.7 126.6L276.9 73.6l13.3 13.3-140 140-140-140z"/></svg>',
      nextArrow: '<svg class="slick-next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><path class="path" d="M10.2 86.9l13.3-13.3 126.7 126.6L276.9 73.6l13.3 13.3-140 140-140-140z"/></svg>',
      dots: true,
      arrows: true,
			slidesToShow: 4,
  		slidesToScroll: 4,
      accessibility: false,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            arrows: false,
            slidesToShow: 2,
  					slidesToScroll: 2,
          }
        },
      ]
    });

	});
})(jQuery);
