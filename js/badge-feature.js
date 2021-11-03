"use strict";

function slickInitWP() {
  $(".real-weddings__post_slider:nth-child(1)")
    .not(".slick-initialized")
    .slick({
      time: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
      arrows: false,
      swipe: false,
    });
  $(".real-weddings__post_slider:nth-child(2)")
    .not(".slick-initialized")
    .slick({
      time: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2800,
      fade: true,
      arrows: false,
      swipe: false,
    });
  $(".real-weddings__post_slider:nth-child(3)")
    .not(".slick-initialized")
    .slick({
      time: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
      arrows: false,
      swipe: false,
    });
  $(".real-weddings__post_slider:nth-child(4)")
    .not(".slick-initialized")
    .slick({
      time: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2200,
      fade: true,
      arrows: false,
      swipe: false,
    });
}

slickInitWP();
