(function ($) {
	$(document).ready(function() {

		$('#clients .slider').slick({
      dots: true,
      arrows: false,
      lazyLoad: 'ondemand',
			slidesToShow: 4,
  		slidesToScroll: 4,
      accessibility: false,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
  					slidesToScroll: 2,
          }
        },
      ]
    });

	});
})(jQuery);
