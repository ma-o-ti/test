import ready from "../../utils/documentReady.js";

ready(() => {
  function makeTabs() {
    const tabs = document.querySelectorAll(".tabs__labels");
    const hash = window.location.hash || false;

    tabs.forEach((item) => {
      // берем только верхний уровень таба, чтобы не сломать вложенные табы
      const parent = item.parentNode;
      const tabsLabels = item.querySelectorAll(".tabs__label");
      const tabPanes = parent.querySelector(".tabs__panes");
      const tabPane = tabPanes.children;
      tabsLabels.forEach((elem) => {
        let dataHref = elem.getAttribute("data-href");

        if (hash !== false && dataHref == hash) {
          let tabsActive = {
            pane: parent.querySelector(".tabs__pane--active"),
            label: parent.querySelector(".tabs__label--active"),
          };

          if (tabsActive.pane) tabsActive.pane.classList.remove("tabs__pane--active");
          if (tabsActive.label) tabsActive.label.classList.remove("tabs__label--active");

          elem.classList.add("tabs__label--active");
          parent.querySelector(dataHref).classList.add("tabs__pane--active");
        }

        elem.addEventListener("click", (event) => {
          event.preventDefault();
          tabsLabels.forEach((label) => {
            label.classList.remove("tabs__label--active");
          });
          elem.classList.add("tabs__label--active");
          [...tabPane].forEach((pane) => {
            pane.classList.remove("tabs__pane--active");
          });
          const clickedTab = elem.getAttribute("data-href");
          parent.querySelector(clickedTab).classList.add("tabs__pane--active");

          history.replaceState(true, "", clickedTab);
        });
      });
    });

    // у ссылки чекаем хеш, если хеш совпадает с табом, то покажем сам таб
    window.addEventListener(
      "hashchange",
      function () {
        let result = window.location.hash;

        if (result !== "") {
          let tabsPane = document.querySelector(result);
          let tabsLabel = document.querySelector(`[data-href="${result}"]`);

          if (tabsPane && tabsPane.classList.contains("tabs__pane")) {
            let tabsParent = tabsPane.closest(".tabs");
            let tabsActive = {
              pane: tabsParent.querySelector(".tabs__pane--active"),
              label: tabsParent.querySelector(".tabs__label--active"),
            };

            if (tabsActive.pane) tabsActive.pane.classList.remove("tabs__pane--active");
            if (tabsActive.label) tabsActive.label.classList.remove("tabs__label--active");

            tabsPane.classList.add("tabs__pane--active");
            tabsLabel.classList.add("tabs__label--active");

            tabsPane.scrollIntoView();
          }
        }
      },
      false,
    );
  }

  let tabs = document.querySelectorAll(".tabs__labels");

  if (tabs) {
    makeTabs(tabs);
  }
});
