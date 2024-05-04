import Swiper from "swiper/bundle";

const makeSliderInstance = [];
const makeSlider = (() => {
  /**
   * Инициализация по умолчанию.
   */
  const init = (el) => {
    try {
      let options = {};
      let breakpoints = {};
      let thumbs = null;
      let swiper = null;
      let sliders = typeof el == "string" ? Array.from(document.querySelectorAll(el)) : [el];

      sliders.forEach((variable) => {
        options = JSON.parse(variable.getAttribute("data-slider-options")) || {};
        breakpoints = JSON.parse(variable.getAttribute("data-slider-breakpoints")) || {};
        thumbs = variable.getAttribute("data-slider-thumbs") || null;

        if (thumbs !== null) {
          options.thumbs = options.thumbs
            ? Object.assign(options.thumbs, { swiper: document.querySelector(thumbs).swiper })
            : { swiper: document.querySelector(thumbs).swiper };
        }

        swiper = new Swiper(variable, Object.assign(options, { breakpoints: breakpoints }));
        makeSliderInstance.push(swiper);

        return swiper;
      });
    } catch (error) {
      console.error(`#makeSlider init. \nMessage: ${error.message}.`);
    }
  };

  /**
   * Инициализировать в ручную
   */
  const initManually = (el, params) => {
    try {
      let slider = el;
      let options = params || {};

      let swiper = new Swiper(slider, options);
      return swiper;
    } catch (error) {
      console.error(`#makeSlider initManually. \nMessage: ${error.message}, \nElement:`, el);
    }
  };

  return { init, initManually };
})();

window.makeSliderInstance = makeSliderInstance;
window.makeSlider = makeSlider;

export default makeSlider;
