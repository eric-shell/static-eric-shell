// (function ($) {
//
//   var allowGrayscale = true;
//
//   setTimeout(function () {
//     allowGrayscale = false
//     $('body').removeClass('grayscale');
//   }, 3000);
//
//   $(window).on('scroll', function () {
//
//     if (allowGrayscale === true) {
//
//       var scrollPos = $(window).scrollTop();
//
//       if (scrollPos <= 0) {
//         $('body').addClass('grayscale');
//       }
//       else {
//         $('body').removeClass('grayscale');
//       }
//     }
//   });
//
// })(jQuery);
