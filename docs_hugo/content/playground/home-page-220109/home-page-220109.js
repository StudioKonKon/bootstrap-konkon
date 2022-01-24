"use strict";

var sTemp = {
   // Optional parameters
   slidesPerView: "auto",
   loop: true,
   spaceBetween: 20,
   autoplay: {
      delay: 5000,
   }
};


/*var swiper = new Swiper(
   "#video-carousel",
   Object.assign({}, sTemp, {
      "centeredSlides": true,
      "effect": "coverflow"
   })
);*/

var swiper = new Swiper("#video-carousel", sTemp);
var swiper = new Swiper("#mycarousel", sTemp);

document.querySelectorAll(".form").forEach(function(item) {
   item.addEventListener("submit", function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
   })
});
