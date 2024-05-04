/**
 * Main client core
 * @namespaces
 * @property {function} makeCore.variables — build variables;
 * @property {function} makeCore.variable  — build variable;
 * @property {object}   makeCore.logging   — message logging;
 * @property {object}   makeCore.position  — element position assembly.
 */
let makeCore = {
  variables: (variable, defaultClass) => {
    let result = null;

    if (variable == undefined) result = Array.from(document.querySelectorAll(defaultClass));
    if (typeof variable == "string") result = [document.querySelector(variable)] || false;
    if (typeof variable == "object")
      result = variable instanceof NodeList ? Array.from(variable) : new Array(variable) || false;

    return result;
  },

  variable: (variable, defaultClass) => {
    let result = null;

    if (variable == undefined) result = document.querySelector(defaultClass);
    if (typeof variable == "string") result = document.querySelector(variable) || false;
    if (typeof variable == "object")
      result = variable instanceof NodeList ? variable : variable || false;

    return result;
  },

  logging: {
    name: "#Prime Wood",
    error: {
      missing: `\n *Eng: "Element missing"\n *Rus: "Отсутствует элемент"`,
      type: `\n *Eng: "Invalid input value, accepts only values of type String or Object"\n *Rus: "Неправильное входное значение, принимает только значения с типом String или Object"`,

      popup: {
        missing: {
          modal: `\n *Eng: "Missing popup element"\n *Rus: "Отсутствует попап элемент"`,
          trigger: `\n *Eng: "Missing trigger element"\n *Rus: "Отсутствует триггер элемент"`,
        },
      },

      select: {
        missing: {
          option: `\n *Eng: "This element is not in the list"\n *Rus: "Такого элемента нет в списке"`,
        },
      },

      accordion: {
        missing: {
          item: `\n *Eng: "Element is not a child of an accordion"\n *Rus: "Элемент не относится к дочерним аккордеона"`,
        },
      },
    },
  },

  position: {
    top: (el, container) => {
      let coordTrigger = el.getBoundingClientRect(),
        coordContainer = container.getBoundingClientRect(),
        position = {
          name: "top",
          top: 0,
          right: coordTrigger.right + 8,
          left: coordTrigger.left + coordTrigger.width / 2 - container.offsetWidth / 2,
        };

      if (coordTrigger.top > 0) {
        position.name = "top";
        position.top = coordTrigger.top + window.pageYOffset - coordContainer.height - 8;

        if (position.top < 0) {
          position = makeCore.position.bottom(el, container);
        }
      } else {
        position.name = "bottom";
        position.top = coordTrigger.top + window.pageYOffset + coordTrigger.height + 8;
      }

      // result
      return position;
    },

    right: (el, container) => {
      let coordTrigger = el.getBoundingClientRect(),
        coordContainer = container.getBoundingClientRect(),
        position = {
          name: "right",
          top: 0,
          left: coordTrigger.right + 8,
        };

      if (position.left + coordContainer.width < window.innerWidth) {
        position.top =
          coordTrigger.top +
          window.pageYOffset +
          coordTrigger.height / 2 -
          coordContainer.height / 2;
        position.left = position.left;
      } else {
        position = makeCore.position.top(el, container);
      }

      return position;
    },

    bottom: (el, container) => {
      let coordTrigger = el.getBoundingClientRect(),
        coordContainer = container.getBoundingClientRect(),
        position = {
          top: 0,
          name: "bottom",
          left: coordTrigger.left + coordTrigger.width / 2 - container.offsetWidth / 2,
        };

      if (coordContainer.bottom < document.body.offsetHeight) {
        position.top = coordTrigger.top + window.pageYOffset + coordTrigger.height + 8;
      } else {
        position.name = "top";
        position.top = coordTrigger.top + window.pageYOffset - coordContainer.height - 8;
      }

      return position;
    },

    left: (el, container) => {
      let coordTrigger = el.getBoundingClientRect(),
        coordContainer = container.getBoundingClientRect(),
        position = {
          top: 0,
          name: "left",
          left: coordTrigger.left - coordContainer.width - 8,
        };

      if (position.left > 0) {
        position.top =
          coordTrigger.top +
          window.pageYOffset +
          coordTrigger.height / 2 -
          coordContainer.height / 2;
      } else {
        position = makeCore.position.top(el, container);
      }

      return position;
    },
  },
};

window.makeCore = makeCore;

export { makeCore };
