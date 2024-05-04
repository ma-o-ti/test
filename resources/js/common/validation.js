import { makeCore } from "../utils/core.js";

const makeValidation = (() => {
  class Core {
    constructor(el) {
      this.$el = el || false;
      this.$params = {
        message: { error: [] },
        requireds:
          Array.from(this.$el.elements).filter(
            (variable) => variable.getAttribute("required") !== null,
          ) || [],
      };

      this.$customEventInput = new CustomEvent("validation input", {
        bubbles: true,
        detail: {
          event: "input",
          target: null,
          status: false,
        },
      });

      this.$ListenerSubmit = (event) => {
        let message = "",
          focusElement = null,
          requireds = Array.from(this.$el.querySelectorAll("[required]")),
          status = requireds.every((variable) => {
            return variable.validity.valid == true;
          });

        // field validation
        requireds.forEach((variable, index) => {
          message =
            variable.getAttribute("data-validation-text") !== null
              ? `${variable.getAttribute("data-validation-text")}`
              : "Заполните это поле.";

          if (
            variable.validity.valid == false ||
            variable.validity.typeMismatch == true ||
            variable.validity.patternMismatch == true
          ) {
            // focus
            if (focusElement == null) {
              focusElement = variable;
              if (focusElement.closest(".js-cart-page-wrap-step")) {
                let positionParent = focusElement
                  .closest(".js-cart-page-wrap-step")
                  .getBoundingClientRect();
                positionParent = positionParent.top + window.scrollY - 30;
                window.scroll({
                  top: positionParent,
                  behavior: "smooth",
                });
              } else {
                focusElement.focus();
              }
            }

            variable.classList.add("validation-field--invalid");
            variable.classList.remove("validation-field--valid");

            if (
              variable.getAttribute("data-validation-not-message") == null &&
              this.$params.message.error[index]
            ) {
              this.$params.message.error[index].classList.add("validation-message--show");
              this.$params.message.error[index].querySelector(
                ".validation-message__content",
              ).textContent = message;
            }
          } else {
            variable.classList.add("validation-field--valid");
            variable.classList.remove("validation-field--invalid");

            if (
              variable.getAttribute("data-validation-not-message") == null &&
              this.$params.message.error[index]
            ) {
              this.$params.message.error[index].classList.remove("validation-message--show");
              this.$params.message.error[index].querySelector(
                ".validation-message__content",
              ).textContent = "";
            }
          }
        });

        if (status == false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      if (
        this.$params.requireds.length > 0 &&
        this.$el.classList.contains("validation-init") == true
      ) {
        this.$params.requireds.forEach((variable) => {
          let result = variable.getAttribute("data-message-container")
            ? document.querySelector(variable.getAttribute("data-message-container"))
            : variable.nextSibling;

          if (variable.getAttribute("data-validation-not-message") == null) {
            this.$params.message.error.push(result);
          }
        });
      }
    }

    init() {
      if (
        this.$params.requireds.length > 0 &&
        this.$el.classList.contains("validation-init") == false
      ) {
        this.build();
        this.event();
      }
    }

    method_updateRequiredCollection() {
      if (this.$params.requireds.length > 0) {
        this.build();
        this.event();
      }
    }

    build() {
      // create elements
      let result = null,
        errorElement = null;

      this.$params.requireds.forEach((variable) => {
        let dataAttrContainer = variable.getAttribute("data-message-container") || false;

        errorElement = document.createElement("div");
        errorElement.classList.add("validation-message");
        errorElement.classList.add("validation-message--error");
        errorElement.innerHTML = `<span class="validation-message__content"></span>`;

        if (dataAttrContainer !== false) {
          let containerElement = document.querySelector(dataAttrContainer) || false;

          if (containerElement) {
            containerElement.classList.add("validation-message");
            containerElement.classList.add("validation-message--error");
            containerElement.innerHTML = `<span class="validation-message__content"></span>`;

            result = containerElement;
          } else {
            variable.insertAdjacentHTML("afterend", errorElement.outerHTML);
            result = variable.nextSibling;
          }
        } else {
          variable.insertAdjacentHTML("afterend", errorElement.outerHTML);
          result = variable.nextSibling;
        }

        variable.classList.add("validation-field");
        this.$params.message.error.push(result);
      });

      this.$el.setAttribute("novalidate", "");
      this.$el.classList.add("validation-init");
    }

    event() {
      this.$el.addEventListener("submit", this.$ListenerSubmit, false);
      this.$el.addEventListener("input", this.listener_input.bind(this), false);
      // this.$el.addEventListener("change", this.listener_input.bind(this), false);
    }

    listener_input(event) {
      let message = "",
        target = event.target,
        index = this.$params.requireds.indexOf(target),
        fieldsShowArray = this.$params.requireds.filter((elem) => elem.offsetParent !== null),
        status = fieldsShowArray.every((elem) => elem.validity.valid == true);

      // check validation
      if (target.getAttribute("required") !== null) {
        if (target.validity.typeMismatch == true || target.validity.patternMismatch == true) {
          message =
            target.getAttribute("data-validation-text") !== null
              ? `${target.getAttribute("data-validation-text")}`
              : "Заполните это поле.";

          target.classList.add("validation-field--invalid");
          target.classList.remove("validation-field--valid");
          if (this.$params.message.error[index]) {
            this.$params.message.error[index].classList.add("validation-message--show");
            this.$params.message.error[index].querySelector(
              ".validation-message__content",
            ).textContent = message;
          }
        } else {
          target.classList.add("validation-field--valid");
          target.classList.remove("validation-field--invalid");

          if (this.$params.message.error[index]) {
            this.$params.message.error[index].classList.remove("validation-message--show");
            this.$params.message.error[index].querySelector(
              ".validation-message__content",
            ).textContent = "";
          }
        }
      }

      if (target.value == "") {
        target.classList.remove("validation-field--valid");
      }

      if (status == false) this.$el.addEventListener("submit", this.$ListenerSubmit, false);
      if (status == true) this.$el.removeEventListener("submit", this.$ListenerSubmit, false);

      // custom event
      this.$customEventInput.detail.target = target;
      this.$customEventInput.detail.status = status;
      this.$el.dispatchEvent(this.$customEventInput);
    }

    method_check() {
      let message = "",
        focusElement = null,
        requireds = Array.from(this.$el.querySelectorAll("[required]")),
        status = requireds.every((variable) => variable.validity.valid == true);

      // field validation
      requireds.forEach((variable, index) => {
        if (variable.offsetParent !== null) {
          message =
            variable.getAttribute("data-validation-text") !== null
              ? `${variable.getAttribute("data-validation-text")}`
              : variable.validationMessage;

          if (
            variable.validity.valid == false ||
            variable.validity.typeMismatch == true ||
            variable.validity.patternMismatch == true
          ) {
            // focus
            if (focusElement == null) {
              focusElement = variable;
              focusElement.focus();
            }

            variable.classList.add("validation-field--invalid");
            variable.classList.remove("validation-field--valid");

            if (
              variable.getAttribute("data-validation-not-message") == null &&
              this.$params.message.error[index]
            ) {
              this.$params.message.error[index].classList.add("validation-message--show");
              this.$params.message.error[index].querySelector(
                ".validation-message__content",
              ).textContent = message;
            }
          } else {
            variable.classList.add("validation-field--valid");
            variable.classList.remove("validation-field--invalid");

            if (
              variable.getAttribute("data-validation-not-message") == null &&
              this.$params.message.error[index]
            ) {
              this.$params.message.error[index].classList.remove("validation-message--show");
              this.$params.message.error[index].querySelector(
                ".validation-message__content",
              ).textContent = "";
            }
          }
        }
      });

      // blocked submit form
      return status;
    }
  }

  let active = null;

  /**
   * Validation initialization
   * @param {*} variable - element for validation API initialization
   * @returns
   */
  const init = (variable) => {
    let element = null;
    let elements = makeCore.variables(variable, ".js-validation:not(.validation-init)");

    try {
      if (elements == false && variable !== undefined)
        throw new Error(makeCore.logging["error"]["missing"]);
      if (elements == null && variable !== undefined)
        throw new Error(makeCore.logging["error"]["type"]);

      elements.forEach((value) => {
        element = value;

        active = new Core(element);
        active.init();
      });

      return active;
    } catch (error) {
      console.error(
        `${makeCore.logging["name"]} | makeValidation init. \nMessage: ${error.message}.\nElement:`,
        element,
      );
    }
  };

  /**
   * В зависимости от валидации формы, возращает ``Boolean`` значение(true или false)
   * @param {*} form
   */
  const check = (variable) => {
    let status = null,
      element = null;

    if (typeof variable == "string") element = document.querySelector(variable) || false;
    if (typeof variable == "object") element = variable || null;

    try {
      if (element == false && variable !== undefined)
        throw new Error(makeCore.logging["error"]["missing"]);
      if (element == null && variable !== undefined)
        throw new Error(makeCore.logging["error"]["type"]);

      active = new Core(element);
      status = active.method_check();

      return status;
    } catch (error) {
      console.error(
        `${makeCore.logging["name"]} | makeValidation check. \nMessage: ${error.message}.\nElement: `,
        variable,
      );
    }
  };

  /**
   * Обновляет коллекцию required полей
   * @param {*} variable - element for validation API initialization
   * @returns
   */
  const updateRequiredCollection = (variable) => {
    var element = null;

    if (typeof variable == "string") element = document.querySelector(variable) || false;
    if (typeof variable == "object") element = variable || null;

    try {
      if (element == false && variable !== undefined)
        throw new Error(makeCore.logging["error"]["missing"]);
      if (element == null && variable !== undefined)
        throw new Error(makeCore.logging["error"]["type"]);

      active = new Core(element);
      active.method_updateRequiredCollection();

      return active;
    } catch (error) {
      console.error(
        `${makeCore.logging["name"]} | makeValidation updateCollection. \nMessage: ${error.message}.\nElement:`,
        element,
      );
    }
  };

  return { init, check };
})();

window.makeValidation = makeValidation;

export default makeValidation;
