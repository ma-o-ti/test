import Swiper from "swiper/bundle";
import ready from "../../utils/documentReady.js";

ready(() => {
  const makeOverflowScroll = (() => {
    let defaultOptions = {
      direction: "horizontal",
      slidesPerView: "auto",
      freeMode: true,
      mousewheel: true,
      observeParents: true,
    };

    /**
     * Инициализация по умолчанию.
     */
    const init = (el) => {
      try {
        let options = {};
        let swiper = null;
        let scrollElems = typeof el == "string" ? Array.from(document.querySelectorAll(el)) : [el];

        scrollElems.forEach((variable) => {
          options = JSON.parse(variable.getAttribute("data-scroll-options")) || {};
          options = Object.assign(defaultOptions, options);

          swiper = new Swiper(variable, options);

          return swiper;
        });
      } catch (error) {
        console.error(error);
        // console.error(`#makeOverflowScroll init. \nMessage: ${error.message}.`);
      }
    };

    /**
     * Инициализировать в ручную
     */
    const initManually = (el, params) => {
      try {
        let overflowScroll = el;
        let options = params;

        options = Object.assign(defaultOptions, options);

        Object.assign(overflowScroll, options);
        overflowScroll.initialize();

        return overflowScroll;
      } catch (error) {
        console.error(
          `#makeOverflowScroll initManually. \nMessage: ${error.message}, \nElement:`,
          el,
        );
      }
    };

    return { init, initManually };
  })();

  window.makeOverflowScroll = makeOverflowScroll;

  makeOverflowScroll.init(".overflow-scroll");
});
