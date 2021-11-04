"use strict";

if (window.innerWidth >= 480) {
  const photo = document.querySelectorAll(".badge-slider__slider-slide img");
  const downloadBtn = document.querySelectorAll(
    ".badge-slider__slider-download:not(.badge-slider__slider-download--mobile)"
  );

  for (let i = 0; i < photo.length; i++) {
    downloadBtn[i].href = photo[i].getAttribute("src");
  }
} else {
  let photo;
  const downloadBtn = document.querySelector(
    ".badge-slider__slider-download--mobile"
  );
  function activeSlide({ slides, activeIndex }) {
    photo = slides[activeIndex].querySelector("img");
    downloadBtn.href = photo.getAttribute("src");
  }

  activeSlide(swiperPhotos);
  swiperPhotos.on("activeIndexChange", activeSlide);
}
