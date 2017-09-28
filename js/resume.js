(function ($) {

  $('span.next-pane').click(function () {

    $(this).closest('.pane').next('.pane').addClass('visible');

    $('html,body').animate({
      scrollTop: $(this).closest('.pane').next('.pane').offset().top
    }, 250);
  });

})(jQuery);
