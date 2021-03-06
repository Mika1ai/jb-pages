"use strict";

const swiperPhotos = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 0,
  speed: 500,
  simulateTOuch: false,
  navigation: {
    nextEl: ".badge-slider__slider-button.next",
    prevEl: ".badge-slider__slider-button.prev",
    disabledClass: "disabled",
  },
});

const creditsBtn = document.querySelector(".badge-slider__credits-copy");

creditsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  navigator.clipboard.writeText(creditsBtn.href);
  creditsBtn.classList.add("copied");
  setTimeout(() => {
    creditsBtn.classList.remove("copied");
  }, 700);
});
