'use strict';

const swiperPhotos = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  speed: 500,
  simulateTOuch: false,
  navigation: {
    nextEl: '.slider__button.next',
    prevEl: '.slider__button.prev',
    disabledClass: 'disabled',
  },
});

const totalCount = document.querySelector('.slider__count-total');
const currentCount = document.querySelector('.slider__count-current');

setZero(`${swiperPhotos.activeIndex + 1}`, currentCount);
setZero(`${swiperPhotos.slides.length}`, totalCount);

swiperPhotos.on('slideChange', () => {
  setZero(`${swiperPhotos.activeIndex + 1}`, currentCount);
});

function setZero(value, field) {
  const j = 3 - value.length;
  let newValue = '';
  for (let i = 0; i < j; i += 1) {
    newValue += '0';
  }
  newValue += value;
  field.textContent = newValue;
}

const socialItem = document.querySelectorAll('.social__item');
for (let i = 0; i < socialItem.length; i += 1) {
  socialItem[i].addEventListener('click', () => {
    socialItem[i].classList.toggle('active');
  });
}
