// Testimonials carousel - CSS-based transitions (compatible with jQuery slim)
jQuery(document).ready(function($) {
  // Setup variables
  var $items = $('.testimonials__item');
  var currentIndex = 0;
  var interval = 5000; // Time between auto-transitions (5 seconds)
  var isPlaying = true;
  var slideTimer;

  // Set up initial state
  $items.first().addClass('active'); // Mark first item as active
  $items.not(':first').css('display', 'none'); // Hide all except first

  // SVG icons for pause/play toggle - using bolder strokes
  var pauseSvg = '<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 4H5V20H9V4Z" fill="currentColor"/><path d="M19 4H15V20H19V4Z" fill="currentColor"/></svg>';
  var playSvg = '<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4L21 12L7 20V4Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/></svg>';

  // Function to transition to a specific slide using CSS
  function goToSlide(index) {
    // Handle boundary conditions
    if (index < 0) {
      index = $items.length - 1;
    } else if (index >= $items.length) {
      index = 0;
    }

    // Get current and next slide elements
    var $current = $items.eq(currentIndex);
    var $next = $items.eq(index);

    // Update ARIA attributes for screen readers
    $current.attr('aria-hidden', 'true');
    $next.attr('aria-hidden', 'false');

    // Hide current slide (remove active class first, then hide after transition)
    $current.removeClass('active');

    // Wait for transition to complete before hiding
    setTimeout(function() {
      $current.css('display', 'none');

      // Show next slide
      $next.css('display', 'block');

      // Force browser repaint before adding active class
      $next[0].offsetHeight;

      // Add active class to trigger transition
      $next.addClass('active');
    }, 400); // Half of our CSS transition time

    currentIndex = index;

    // Update counter for screen readers (e.g., "2 of 10")
    $('.testimonials__controls').attr('aria-label', 'Testimonial ' + (currentIndex + 1) + ' of ' + $items.length);
  }

  // Function to start auto-play
  function startAutoPlay() {
    isPlaying = true;
    $('.testimonials__pause')
      .attr('aria-label', 'Pause testimonial slider')
      .html(pauseSvg);
    clearInterval(slideTimer);
    slideTimer = setInterval(function() {
      goToSlide(currentIndex + 1);
    }, interval);
  }

  // Function to stop auto-play
  function stopAutoPlay() {
    isPlaying = false;
    $('.testimonials__pause')
      .attr('aria-label', 'Play testimonial slider')
      .html(playSvg);
    clearInterval(slideTimer);
  }

  // Setup click handlers for controls
  $('.testimonials__next').on('click', function() {
    goToSlide(currentIndex + 1);
    // Reset timer when manually navigating
    if (isPlaying) {
      clearInterval(slideTimer);
      startAutoPlay();
    }
  });

  $('.testimonials__prev').on('click', function() {
    goToSlide(currentIndex - 1);
    // Reset timer when manually navigating
    if (isPlaying) {
      clearInterval(slideTimer);
      startAutoPlay();
    }
  });

  $('.testimonials__pause').on('click', function() {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // Add keyboard navigation support for accessibility
  $(document).on('keydown', function(e) {
    // Only handle keyboard events when testimonials are in viewport
    if ($('.testimonials').hasClass('visible')) {
      switch(e.which) {
        case 37: // Left arrow
          $('.testimonials__prev').trigger('click');
          break;
        case 39: // Right arrow
          $('.testimonials__next').trigger('click');
          break;
        case 32: // Space bar
          $('.testimonials__pause').trigger('click');
          e.preventDefault();
          break;
      }
    }
  });

  // Initialize ARIA attributes on items
  $items.attr('aria-hidden', 'true');
  $items.first().attr('aria-hidden', 'false');

  // Set initial counter for screen readers
  $('.testimonials__controls').attr('aria-label', 'Testimonial 1 of ' + $items.length);

  // Start the auto-play
  startAutoPlay();
});
