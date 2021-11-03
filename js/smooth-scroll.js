"use strict";

if (document.body.clientWidth > 1000) {
  SmoothScroll({
    animationTime: 1000, // [ms]
    stepSize: 100, // [px]
    accelerationDelta: 20,
    accelerationMax: 5,
    keyboardSupport: true,
    arrowScroll: 50, // [px]
    touchpadSupport: false,
  });
}
