export function initHeader() {
  const header = document.querySelector(".header");
  let openMenu = false;
  let resizeCloseMenu = true;
  const htmlTag = document.querySelector("html");
  const bodyTag = document.querySelector("body");
  const submenuBack = document.querySelector(".js-submenu-back-btn");

  const menuTrigger = header.querySelectorAll(".js-header-burger-open");
  const submenuBtn = header.querySelectorAll(".js-submenu-tabs-inner-btn");
  const submenuBtnCompany = header.querySelectorAll(".js-submenu-tabs-inner-company-btn");
  const menuTriggerClose = header.querySelectorAll(".js-header-burger-close");
  const menuBtn = header.querySelectorAll(".js-submenu-btn");
  const mobileMenu = header.querySelector(".submenu");

  const submenuLabels = mobileMenu.querySelector(".submenu__tabs-labels");
  const submenuBottom = mobileMenu.querySelector(".submenu__wrap-bottom");
  const submenuTop = mobileMenu.querySelector(".submenu__top");

  // mobile menu start
  menuTrigger.forEach((item) => {
    item.addEventListener("click", (element) => {
      element.preventDefault();
      resizeCloseMenu = true;
      mobileMenu.classList.add("submenu--open");

      if (window.innerWidth < 1024) {
        bodyTag.classList.add("body--hide");
        htmlTag.classList.add("html--active");
        let mobileMenuReact = mobileMenu.getBoundingClientRect();
        let heightMobileMenu = mobileMenuReact.height;
        bodyTag.style.height = heightMobileMenu + "px";
      }
    });
  });

  menuTriggerClose.forEach((item) => {
    item.addEventListener("click", (element) => {
      element.preventDefault();
      resizeCloseMenu = false;
      mobileMenu.classList.remove("submenu--open");

      if (window.innerWidth < 1024) {
        bodyTag.classList.remove("body--hide");
        htmlTag.classList.remove("html--active");
        bodyTag.OuterHeight = mobileMenu;
      }
    });
  });

  // закрытие меню по клику вне меню
  document.addEventListener("click", (element) => {
    if (openMenu) {
      if (!element.target.closest(".header")) {
        menuBtn.forEach((item) => {
          if (item.classList.contains("js-submenu-btn--open")) {
            item.click();
          }
        });
      }
    }
  });
  // mobile menu end

  menuBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const linkMenu = item.getAttribute("data-menu");
      //нажали на основное меню или нет
      const tabsSubMenu = header.querySelector(".header__tabs-wrap");
      const messangersMenu = mobileMenu.querySelector(".header-info-links-messangers");
      if (item.classList.contains("header__messangers-icon")) {
        tabsSubMenu.classList.add("header__tabs-wrap--hide");
        messangersMenu.classList.add("header-info-links-messangers--open");
      } else {
        //Закрытие\открытие обертки подменю и поиск нужного подменю
        const submenu = mobileMenu.querySelectorAll(".submenu__tab-link");

        submenu.forEach((element) => {
          let tabLink = element.getAttribute("data-href");
          tabLink = tabLink.split("#");
          if (tabLink[1] === linkMenu) {
            element.click();
          }
        });
        tabsSubMenu.classList.remove("header__tabs-wrap--hide");
        messangersMenu.classList.remove("header-info-links-messangers--open");
      }

      if (openMenu) {
        //Закрытие\открытие меню по кнопке и при повторном клике
        if (item.classList.contains("js-submenu-btn--open")) {
          mobileMenu.classList.remove("submenu--open");
          item.classList.remove("js-submenu-btn--open");
          openMenu = false;
        } else {
          menuBtn.forEach((element) => {
            element.classList.remove("js-submenu-btn--open");
          });
          item.classList.add("js-submenu-btn--open");
        }
      } else {
        item.classList.add("js-submenu-btn--open");
        mobileMenu.classList.add("submenu--open");
        openMenu = true;
      }
    });
  });

  //открытие таба внутри меню на мобильнике
  submenuBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      if (window.innerWidth < 1024) {
        const parent = item.closest(".js-submenu-tabs");
        const tabLabels = parent.querySelector(".js-tabs-labels");
        const tabInner = parent.querySelector(".js-tabs-panes");

        tabLabels.classList.add("header__tabs-labels--close");
        tabInner.classList.add("submenu__panes-inner--open");
        submenuLabels.classList.add("submenu__tabs-labels--hide");
        submenuBottom.classList.add("submenu__wrap-bottom--hide");
        submenuTop.classList.add("submenu__top--submenu");
      }
    });
  });

  //открытие таба внутри меню на мобильнике
  submenuBtnCompany.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      if (window.innerWidth < 1024) {
        const wrapMenuCompany = item
          .closest(".submenu__info-links")
          .querySelectorAll(".js-submenu-tabs-company");
        const parent = item.closest(".js-submenu-tabs-company");
        const tabInner = parent.querySelector(".js-tabs-panes-company");

        wrapMenuCompany.forEach((element) => {
          element.classList.add("header__menu-col--hide");
        });
        item.classList.add("submenu__tab-link-label--close");
        parent.classList.remove("header__menu-col--hide");
        tabInner.classList.add("submenu__panes-inner--open");
        submenuLabels.classList.add("submenu__tabs-labels--hide");
        submenuBottom.classList.add("submenu__wrap-bottom--hide");
        submenuTop.classList.add("submenu__top--submenu");
      }
    });
  });

  //закрытие таба внутри меню на мобильнике
  submenuBack.addEventListener("click", (event) => {
    event.preventDefault();
    if (window.innerWidth < 1024) {
      const tabLabels = mobileMenu.querySelector(".js-tabs-labels");
      const tabInner = mobileMenu.querySelectorAll(".submenu__panes-inner");
      const tabLabelCompany = mobileMenu.querySelectorAll(".submenu__tab-link-label");

      tabLabels.classList.remove("header__tabs-labels--close");
      tabInner.forEach((element) => {
        element.classList.remove("submenu__panes-inner--open");
      });
      tabLabelCompany.forEach((element) => {
        element.classList.remove("submenu__tab-link-label--close");
      });
      submenuLabels.classList.remove("submenu__tabs-labels--hide");
      submenuBottom.classList.remove("submenu__wrap-bottom--hide");
      submenuTop.classList.remove("submenu__top--submenu");

      const wrapMenuCompany = mobileMenu.querySelectorAll(".js-submenu-tabs-company");
      wrapMenuCompany.forEach((element) => {
        element.classList.remove("header__menu-col--hide");
      });
    }
  });

  //Закрываем меню по resize
  window.addEventListener(
    "resize",
    function () {
      if (window.innerWidth > 1024 && resizeCloseMenu) {
        menuTriggerClose[0].click();
      }
    },
    true,
  );

  const searchModel = document.querySelectorAll(".js-search-modal");
  searchModel.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const parent = item.closest(".header__search");
      const searchWrap = parent.querySelector(".header__search-wrap");
      searchWrap.classList.toggle("header__search-wrap--active");
    });
  });

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

  makeTabs();
}
