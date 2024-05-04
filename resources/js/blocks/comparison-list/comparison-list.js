import Swiper from "swiper";
import ready from "../../utils/documentReady.js";

ready(() => {
  const comparison = document.querySelector(".comparison-list");

  if (comparison) {
    //фиксированный верхний блок по скроллу
    const rect = comparison.getBoundingClientRect();
    window.addEventListener("scroll", () => {
      const mainSlider = comparison.querySelector(".comparison-list__slider");

      if (window.scrollY > rect.y) {
        mainSlider.classList.add("comparison-list__slider--fixed");
      } else {
        mainSlider.classList.remove("comparison-list__slider--fixed");
      }
    });

    //слайдеры
    const breakpointsInfo = {
      768: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      1448: {
        slidesPerView: 6,
        spaceBetween: 16,
      },
    };

    // инициализируем слайдер с товарами
    let sliderMain = new Swiper(".comparison-slider-products", {
      loop: false,
      slidesPerView: 2,
      spaceBetween: 16,
      navigation: {
        nextEl: ".comparison-list .swiper-button-next",
        prevEl: ".comparison-list .swiper-button-prev",
      },
      breakpoints: breakpointsInfo,
      on: {
        slideChange: () => {
          sliderChildren.forEach((item) => {
            item.slideTo(sliderMain.activeIndex);
          });
        },
      },
    });

    // инициализируем остальные слайдеры
    let sliderChildren = new Swiper(".comparison-slider-tables", {
      loop: false,
      slidesPerView: 2,
      spaceBetween: 16,
      navigation: {
        enabled: false,
      },
      breakpoints: breakpointsInfo,
      on: {
        slideChange: (element) => {
          sliderChildren.forEach((item) => {
            item.slideTo(element.activeIndex);
          });
          sliderMain.slideTo(element.activeIndex);
        },
      },
    });
  }
});
