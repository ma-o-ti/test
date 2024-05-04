const makeQuantitySelector = (() => {
  const innerBuild = (el, config) => {
    let min = config.value <= config.min;
    let max = config.value >= config.max;
    let addClassNames = config.addClass;

    let parent = document.createElement("div");
    parent.classList.add("quantity-selector__main");
    parent.innerHTML = `
      <button type="button" class="quantity-selector__trigger qs-dec" ${
        min ? "disabled" : ""
      } aria-label="decrease">${config.decInner}</button>
          <div class="quantity-selector__content"></div>
      <button type="button" class="quantity-selector__trigger qs-inc" ${
        max ? "disabled" : ""
      } aria-label="increase">${config.incInner}</button>
    `;

    if (min) config.value = config.min;
    if (max) config.value = config.max;

    el.setAttribute("min", config.min);
    el.setAttribute("max", config.max);
    el.setAttribute("step", config.step);
    el.classList.add("quantity-selector__field");
    el.classList.add("quantity-selector-init");
    el.insertAdjacentHTML("afterend", parent.outerHTML);

    parent = el.nextElementSibling;
    addClassNames.forEach((value) => parent.classList.add(value));
    parent.querySelector(".quantity-selector__content").appendChild(el);

    config.field = parent.querySelector(".quantity-selector__field");
    config.triggers = {
      dec: parent.querySelector(".quantity-selector__trigger.qs-dec"),
      inc: parent.querySelector(".quantity-selector__trigger.qs-inc"),
    };

    parent.addEventListener("input", (event) => listenerInput(event, config), false);
    parent.addEventListener("change", (event) => listenerChange(event, config), false);
    parent.addEventListener("click", (event) => listenerClick(event, config), false);
  };

  const init = (el) => {
    try {
      let selectors = typeof el == "string" ? Array.from(document.querySelectorAll(el)) : [el];

      selectors.forEach((variable) => {
        let options = JSON.parse(variable.getAttribute("data-selector-options")) || {};
        let config = {
          min: parseFloat(variable.getAttribute("min")) || 0,
          max: parseFloat(variable.getAttribute("max")) || 999999999,
          step: parseFloat(variable.getAttribute("step")) || 1,
          value: parseFloat(variable.value) || 0,
          addClass: options.addClass ? options.addClass.split(",") : [],
          decInner:
            options.decInner ||
            `
            <svg width="512" height="50" viewBox="0 0 512 50" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 24.7742C0 11.0918 11.0918 0 24.7742 0H487.226C500.908 0 512 11.0918 512 24.7742C512 38.4566 500.908 49.5484 487.226 49.5484H24.7742C11.0918 49.5484 0 38.4566 0 24.7742Z"/>
            </svg>`,
          incInner:
            options.incInner ||
            `
            <svg width="513" height="513" viewBox="0 0 513 513" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M256.543 0.539062C270.225 0.539062 281.317 11.6308 281.317 25.3133V487.765C281.317 501.447 270.225 512.539 256.543 512.539C242.861 512.539 231.769 501.447 231.769 487.765V25.3133C231.769 11.6308 242.861 0.539062 256.543 0.539062Z"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.542969 256.539C0.542969 242.857 11.6348 231.765 25.3172 231.765H487.769C501.451 231.765 512.543 242.857 512.543 256.539C512.543 270.221 501.451 281.313 487.769 281.313H25.3172C11.6348 281.313 0.542969 270.221 0.542969 256.539Z"/>
            </svg>`,
        };

        return innerBuild(variable, config);
      });
    } catch (error) {
      console.error(`#makeQuantitySelector init. \nMessage: ${error.message}.`);
    }
  };

  const listenerClick = (event, config) => {
    let target = event.target;
    let result = config.field.value == "" ? config.min : parseFloat(config.field.value);

    if (
      target.classList.contains("qs-dec") == true ||
      target.classList.contains("qs-inc") == true
    ) {
      // dec
      if (target.classList.contains("qs-dec") == true) {
        result = parseFloat(result) - config.step;
      }

      // inc
      if (target.classList.contains("qs-inc") == true) {
        result = parseFloat(result) + config.step;
      }

      if (parseFloat(result) > config.max) result = config.max;
      if (parseFloat(result) < config.min) result = config.min;

      config.field.value = result;
      config.triggers.dec.disabled = !(config.field.value > config.min);
      config.triggers.inc.disabled = !(config.field.value < config.max);
    }
  };

  const listenerInput = (event, config) => {
    let field = config.field;
    let value = parseInt(field.value);
    let min = value < 0;
    let max = value >= config.max;

    if (field.value !== "") {
      if (min) field.value = config.min;
      if (max) field.value = config.max;
    }
  };

  const listenerChange = (event, config) => {
    let field = config.field;
    let value = parseInt(field.value);
    let min = value < config.min;
    let max = value >= config.max;

    if (field.value !== "") {
      if (min) field.value = config.min;
      if (max) field.value = config.max;
    }
  };

  return { init };
})();

window.makeQuantitySelector = makeQuantitySelector;

export default makeQuantitySelector;
