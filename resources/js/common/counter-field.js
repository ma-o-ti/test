import { makeCore } from "../utils/core.js";

const makeFieldCounter = (() => {
  const init = (el) => {
    try {
      let fieldsArray = makeCore.variables(el, ".js-counter-field:not(.counter-field-init)");

      fieldsArray.forEach((variable) => {
        let min = parseInt(variable.getAttribute("minlength")) || 0;
        let max = parseInt(variable.getAttribute("maxlength")) || 100;
        let counterElement = document.createElement("div");

        counterElement.classList.add("counter-result");
        counterElement.setAttribute("title", "Счётчик поля");
        counterElement.innerHTML = `<span class="counter-result__min">${min}</span>/<span class="counter-result__max">${max}</span>`;

        variable.insertAdjacentHTML("afterend", counterElement.outerHTML);
        counterElement = variable.nextElementSibling;

        variable.classList.add("counter-field");
        variable.classList.add("counter-field-init");
        variable.addEventListener(
          "input",
          (event) => listener_textarea(event, min, max, counterElement),
          false,
        );
      });
    } catch (error) {
      console.error(`#makeFieldCounter init. \nMessage: ${error.message}.`);
    }
  };

  const listener_textarea = (event, min, max, counter) => {
    let target = event.target;
    let value = target.value;
    let counterElMin = counter.querySelector(".counter-result__min");

    if (value !== "") {
      if (value.length > min) {
        counterElMin.innerHTML = value.length < max ? value.length : max;
      }
    } else {
      counterElMin.innerHTML = min;
    }
  };

  return { init };
})();

window.makeFieldCounter = makeFieldCounter;

export default makeFieldCounter;
