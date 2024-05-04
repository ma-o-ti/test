import ready from "../../utils/documentReady.js";

ready(() => {
  const componentCatalogLinks = (() => {
    var catalogLinksEl, catalogLinksSpoilerBtn, catalogLinksList;
    var variableArray = [];
    const customEventSelected = new CustomEvent("catalogCategory selected", {
      bubbles: true,
      detail: {
        el: null,
        trigger: null,
        variable: [],
        clear: false,
      },
    });

    const init = (el) => {
      try {
        catalogLinksEl = el;
        catalogLinksSpoilerBtn = catalogLinksEl.querySelector(".catalog-links__btn") || false;
        catalogLinksList = catalogLinksEl.querySelector(".catalog-category-list");

        catalogLinksList.addEventListener("click", (event) => listenerList(event), false);

        if (catalogLinksSpoilerBtn !== false) {
          catalogLinksSpoilerBtn.addEventListener(
            "click",
            (event) => listenerSpoiler(event),
            false,
          );
        }
      } catch (error) {
        console.error(`#componentCatalogLinks init. \nMessage: ${error.message}.`);
      }
    };

    const listenerList = (event) => {
      let target = event.target;
      let triggerItem = target.closest(".catalog-category-list__item") || false;
      let activeItems = Array.from(
        catalogLinksList.querySelectorAll(".catalog-category-list__item.active"),
      );
      let allItem = catalogLinksEl.querySelector(".catalog-category-list__item.all") || false;
      let statusClear = false;

      if (triggerItem !== false) {
        let triggerName = triggerItem.getAttribute("data-filter-section");

        if (triggerItem.classList.contains("all") === false) {
          if (triggerItem.classList.contains("active") === true) {
            variableArray.splice(variableArray.indexOf(triggerItem), 1);
          } else {
            variableArray.push(triggerName);
          }

          statusClear = false;
          if (allItem !== false) {
            allItem.classList.remove("active");
          }
        } else {
          statusClear = true;
          variableArray = [];
          activeItems.forEach((variable) => variable.classList.remove("active"));
        }
      }

      triggerItem.classList.toggle("active");

      if (catalogLinksList.querySelector(".catalog-category-list__item.active") === null) {
        statusClear = true;
        variableArray = [];
        if (allItem !== false) {
          allItem.classList.add("active");
        }
      }

      // custom event: catalogCategory selected
      customEventSelected.detail.el = catalogLinksEl;
      customEventSelected.detail.trigger = triggerItem;
      customEventSelected.detail.variable = variableArray;
      customEventSelected.detail.clear = statusClear;
      catalogLinksEl.dispatchEvent(customEventSelected);
    };

    const listenerSpoiler = () => {
      let textBtn =
        catalogLinksEl.classList.contains("catalog-links--active") === true
          ? catalogLinksSpoilerBtn.getAttribute("data-show")
          : catalogLinksSpoilerBtn.getAttribute("data-hide");

      catalogLinksSpoilerBtn.innerText = textBtn;
      catalogLinksEl.classList.toggle("catalog-links--active");
    };

    return { init };
  })();

  window.componentCatalogLinks = componentCatalogLinks;

  let catalogLinksElem = document.querySelector(".catalog-links") || false;

  if (catalogLinksElem !== false) {
    componentCatalogLinks.init(catalogLinksElem);
  }
});
