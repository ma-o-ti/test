import tippy, { createSingleton, delegate, hideAll } from "tippy.js";

const makeTooltip = (() => {
  const init = (el) => {
    try {
      let triggers = el;
      let tippyInstances = tippy(triggers, {
        theme: "light",
      });

      tippyInstances.forEach((instance) => {
        let element = instance.reference;
        let params = JSON.parse(element.getAttribute("data-tooltip-options")) || {};
        let options = Object.assign(instance.props, params);

        element.classList.add("tooltip-trigger");
        instance.setProps(options);
      });

      let singleton = createSingleton(tippyInstances, {
        allowHTML: true,
        interactive: false,
        moveTransition: "transform 0.2s ease-out",
        trigger: "mouseenter focus",
        overrides: ["delay", "interactive", "trigger", "arrow", "placement", "theme", "content"],
      });

      return singleton;
    } catch (error) {
      console.error(`#makeTooltip init. \nMessage: ${error.message}.`);
    }
  };

  const delegateInit = (el, target, params) => {
    try {
      let parent = typeof el == "string" ? document.querySelector(el) : el;
      let options = params || {};

      options.target = target;
      options.theme = options.theme || "light";

      let instances = delegate(parent, options);

      return instances;
    } catch (error) {
      console.error(`#makeTooltip delegate. \nMessage: ${error.message}.`);
    }
  };

  const methodHideAll = (params) => {
    let options = params || {};

    return hideAll(options);
  };

  return { init, delegateInit, methodHideAll };
})();

window.makeTooltip = makeTooltip;

export default makeTooltip;
