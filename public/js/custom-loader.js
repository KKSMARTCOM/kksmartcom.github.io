// Gestion du loader et animation Pace.js
$(document).ready(function () {
  if ($('.owl-carousel').length > 0) {
    setTimeout(function () {
      var owl_car = "/js/owl.carousel.min.js";
      $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/css/owl.carousel.css'));
      $.getScript(owl_car, function () {
        var footer_scripts = "/js/other/footer-scripts.js";
        $.getScript(footer_scripts, function () {
          console.log('loaded footer scripts')
        })
      })
    }, 2000);
  }
  if ($('.swiper').length > 0) {
    setTimeout(function () {
      var owl_car_2 = "../cdn.jsdelivr.net/npm/swiper%408/swiper-bundle.min.js";
      $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../cdn.jsdelivr.net/npm/swiper%408/swiper-bundle.min.css'));
      $.getScript(owl_car_2, function () {
        var footer_scripts = "/js/other/footer-scripts.js";
        $.getScript(footer_scripts, function () {
          console.log('loaded footer scripts')
        })
      })
    }, 2000);
  }
});
