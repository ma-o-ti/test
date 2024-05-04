import ready from "../../utils/documentReady.js";

ready(() => {
  const makeColorPattern = (() => {
    const init = (el) => {
      try {
        let patternsColor = [];

        if (typeof el == "string") patternsColor = Array.from(document.querySelectorAll(el));
        if (typeof el == "object") patternsColor = el.length !== undefined ? Array.from(el) : [el];

        patternsColor.forEach((variable) => {
          let outputPreview = document.querySelector(variable.getAttribute("data-output-preview"));
          let outputName = document.querySelector(variable.getAttribute("data-output-name"));
          let row = variable.querySelector(".color-pattern__row");

          row.addEventListener(
            "click",
            (event) => listener_choice(event, outputPreview, outputName, row),
            false,
          );
        });
      } catch (error) {
        console.error(`#makeColorPattern init. \nMessage: ${error.message}.`);
      }
    };

    const listener_choice = (event, outputPreview, outputName, row) => {
      let target = event.target;
      let parent = target.closest(".color-pattern__col") || false;
      let active = row.querySelector(".color-pattern__col.active") || false;

      if (parent !== false) {
        let dataPreview = parent.getAttribute("data-color-preview");
        let dataName = parent.getAttribute("data-color-name");

        outputPreview.innerHTML = `<img src="${dataPreview}">`;
        outputName.innerHTML = dataName;

        parent.classList.add("active");

        if (active !== false) {
          active.classList.remove("active");
        }
      }
    };

    return { init };
  })();

  // let colorPatternInit = makeColorPattern.init(document.querySelectorAll(".color-pattern"));
});
