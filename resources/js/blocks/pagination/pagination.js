import ready from "../../utils/documentReady.js";
import { urlParams } from "../../utils/urlParams";

ready(() => {
  const componentPagination = (() => {
    var paginationEl, paginationCount, paginationList;
    const customEventChange = new CustomEvent("pagination change", {
      bubbles: true,
      detail: {
        el: null,
        index: null,
        current: null,
        previous: null,
      },
    });

    const init = (el) => {
      try {
        paginationEl = el;
        paginationCount = Math.ceil(paginationEl.getAttribute("data-page-count"));
        paginationList = paginationEl.querySelector(".pagination__list");

        let startIndex = parseInt(urlParams.get("page")) || 1;
        build.linksCollection(startIndex);

        paginationEl.addEventListener("click", (event) => listenerArrows(event), false);
        paginationList.addEventListener("click", (event) => listenerList(event), false);
      } catch (error) {
        console.error(`#componentPagination init. \nMessage: ${error.message}.`);
      }
    };

    const build = {
      linksCollection(indexActive) {
        let paginationLinkElem = null;
        let startLinks = [
          {
            type: "first",
            number: 1,
          },
          {
            type: "active",
            number: indexActive,
          },
          {
            type: "last",
            number: paginationCount,
          },
        ];

        if (startLinks[1].number <= 0) startLinks[1].number = 1;
        if (startLinks[1].number > paginationCount) startLinks[1].number = paginationCount;

        paginationList.innerHTML = "";

        startLinks.forEach((variable, index, array) => {
          let typeLink = variable.type;
          let numberLink = parseInt(variable.number);

          paginationLinkElem = document.createElement("button");
          paginationLinkElem.classList.add(typeLink);
          paginationLinkElem.classList.add("pagination__link");
          paginationLinkElem.setAttribute("type", "button");
          paginationLinkElem.setAttribute("data-page-number", numberLink);
          paginationLinkElem.textContent = numberLink;

          if (variable.type !== array[1].type && variable.number === array[1].number) {
            return;
          } else {
            paginationLinkElem.classList.add(variable.type);
          }

          // prev
          if (typeLink === "active") {
            let prevNumber = numberLink - 1;

            if (prevNumber >= 2 && prevNumber < paginationCount) {
              let prevPaginationLinkElem = this.prevLink(prevNumber);
              paginationList.insertAdjacentHTML("beforeend", prevPaginationLinkElem.outerHTML);
            }
          }

          paginationList.insertAdjacentHTML("beforeend", paginationLinkElem.outerHTML);

          // next and set url params
          if (typeLink === "active") {
            let nextNumber = numberLink + 1;

            if (nextNumber >= 2 && nextNumber < paginationCount) {
              let nextPaginationLinkElem = this.nextLink(nextNumber);
              paginationList.insertAdjacentHTML("beforeend", nextPaginationLinkElem.outerHTML);
            }
          }
        });
      },

      prevLink(index) {
        let prevNumber = index;
        let prevLinkElem = document.createElement("button");

        prevLinkElem.classList.add("pagination__link");
        prevLinkElem.setAttribute("type", "button");
        prevLinkElem.setAttribute("data-page-number", prevNumber);
        prevLinkElem.textContent = prevNumber;

        if (prevNumber >= 3) {
          prevLinkElem.classList.add("prev");
        }

        return prevLinkElem;
      },

      nextLink(index) {
        let nextNumber = index;
        let nextLinkElem = document.createElement("button");

        nextLinkElem.classList.add("pagination__link");
        nextLinkElem.setAttribute("type", "button");
        nextLinkElem.setAttribute("data-page-number", nextNumber);
        nextLinkElem.textContent = nextNumber;

        if (nextNumber < paginationCount - 1) {
          nextLinkElem.classList.add("next");
        }

        return nextLinkElem;
      },
    };

    const listenerList = (event) => {
      let target = event.target;
      let triggerLink = target.closest(".pagination__link") || false;

      if (triggerLink !== false && triggerLink.classList.contains("active") === false) {
        let triggerIndex = parseInt(target.getAttribute("data-page-number"));

        build.linksCollection(triggerIndex);
        urlParams.set("page", triggerIndex);

        // custom event: pagination change
        customEventChange.detail.el = paginationEl;
        customEventChange.detail.index = triggerIndex;
        customEventChange.detail.active = paginationList.querySelector(".active");
        paginationEl.dispatchEvent(customEventChange);
      }
    };

    const listenerArrows = (event) => {
      let target = event.target;
      let arrow = target.closest(".pagination__arrow") || false;
      let linkActive = paginationList.querySelector(".active");
      let linkIndex = parseInt(linkActive.getAttribute("data-page-number"));

      if (arrow !== false) {
        // next
        if (arrow.classList.contains("next") == true) {
          linkIndex += 1;
          linkIndex = linkIndex > paginationCount ? 1 : linkIndex;
        }

        // prev
        if (arrow.classList.contains("prev") == true) {
          linkIndex -= 1;
          linkIndex = linkIndex <= 0 ? paginationCount : linkIndex;
        }

        build.linksCollection(linkIndex);
        urlParams.set("page", linkIndex);

        // custom event: pagination change
        customEventChange.detail.el = paginationEl;
        customEventChange.detail.index = linkIndex;
        customEventChange.detail.active = paginationList.querySelector(".active");
        paginationEl.dispatchEvent(customEventChange);
      }
    };

    const changeActive = (el, index) => {
      try {
        paginationEl = el;
        paginationList = paginationEl.querySelector(".pagination__list");

        let paginationIndex = parseInt(index);
        build.linksCollection(paginationIndex);
        urlParams.set("page", paginationIndex);
      } catch (error) {
        console.error(`#componentPagination changeActive. \nMessage: ${error.message}.`);
      }
    };

    return { init, changeActive };
  })();

  window.componentPagination = componentPagination;

  let paginationElem = document.querySelector(".pagination") || false;

  if (paginationElem !== false) {
    componentPagination.init(paginationElem);
  }
});
