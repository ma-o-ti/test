import ready from "../../utils/documentReady.js";

ready(() => {
  const additionalCheckbox = document.querySelectorAll(
    ".js-cart-page-step-spoiler .js-cart-page-step-spoiler-btn",
  );

  if (additionalCheckbox) {
    additionalCheckbox.forEach((item) => {
      item.addEventListener("change", () => {
        if (item.checked) {
          item
            .closest(".js-cart-page-step-spoiler")
            .classList.add("js-cart-page-step-spoiler--active");
        } else {
          item
            .closest(".js-cart-page-step-spoiler")
            .classList.remove("js-cart-page-step-spoiler--active");
        }
      });
    });
  }

  const additionalRadio = document.querySelectorAll(".js-cart-page-step-spoiler [type='radio']");

  if (additionalRadio) {
    additionalRadio.forEach((item) => {
      item.addEventListener("change", () => {
        if (item.classList.contains("js-cart-page-step-spoiler-btn") && item.checked) {
          item
            .closest(".js-cart-page-step-spoiler")
            .classList.add("js-cart-page-step-spoiler--active");
        } else {
          item
            .closest(".js-cart-page-step-spoiler")
            .classList.remove("js-cart-page-step-spoiler--active");
        }
      });
    });
  }

  function activeStep(item) {
    const parent = item.closest(".js-cart-page-wrap-step");
    const activeInputs = parent.querySelectorAll("input, textarea");

    let flag = false;
    let flagTemp = false;
    let flagRequire = false;
    for (let i = 0; i < activeInputs.length; i++) {
      if (
        activeInputs[i].closest(".js-cart-page-step-spoiler-content") &&
        !item.classList.contains("js-cart-page-step-spoiler-btn") &&
        item.closest(".js-cart-page-step-spoiler-content") == null
      ) {
        break;
      }
      if (activeInputs[i].hasAttribute("required")) {
        flagRequire = true;
        flagTemp = true;
        if (activeInputs[i].value !== "" || activeInputs[i].checked) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      } else {
        if (!flagRequire) {
          flag = true;
          if (activeInputs[i].type === "radio" || activeInputs[i].type === "checkbox") {
            if (activeInputs[i].checked) {
              flagTemp = true;
            }
          } else if (activeInputs[i].type === "file") {
            if (activeInputs[i].files.length > 0) {
              flagTemp = true;
            }
          } else {
            if (activeInputs[i].value !== "") {
              flagTemp = true;
            }
          }
        }
      }
    }
    if (flag && flagTemp) {
      parent.classList.add("cart-page__wrap--active");
    } else {
      parent.classList.remove("cart-page__wrap--active");
    }
  }

  const stepActive = document.querySelectorAll(
    ".js-cart-page-wrap-step input, .js-cart-page-wrap-step textarea",
  );
  //Отмечаем заполненные шаги
  if (stepActive) {
    stepActive.forEach((item) => {
      if (item.type === "radio" || item.type === "checkbox" || item.type === "file") {
        item.addEventListener("change", () => {
          activeStep(item);
        });
      } else {
        item.addEventListener("input", () => {
          activeStep(item);
        });
      }
    });

    const tempRequired = document.querySelectorAll(".js-temp-required");
    let flagTempRequired = false;

    tempRequired.forEach((item) => {
      const activeParent = item
        .closest(".js-cart-page-step-spoiler")
        .querySelector(".js-cart-page-step-spoiler-btn");
      if (item.type === "radio" || item.type === "checkbox" || item.type === "file") {
        item.addEventListener("change", () => {
          checkTempRequired(item, item.type);
          activeStep(activeParent);
        });
      } else {
        item.addEventListener("input", () => {
          checkTempRequired(item, item.type);
          activeStep(activeParent);
        });
      }
    });

    function checkTempRequired(item, type) {
      const items = item.closest(".cart-page__spoiler-wrap").querySelectorAll(".js-temp-required");
      if (item.type === "file") {
        if (item.files.length > 0) {
          item.classList.add("js-temp-required-input");
          flagTempRequired = true;
          items.forEach((element) => {
            if (!element.classList.contains("js-temp-required-input")) {
              element.required = false;
              element.classList.remove("validation-field--invalid");
            }
          });
        }
      } else {
        if (item.value !== "") {
          item.classList.add("js-temp-required-input");
          items.forEach((element) => {
            if (!element.classList.contains("js-temp-required-input")) {
              element.required = false;
              element.classList.remove("validation-field--invalid");
            }
          });
        } else {
          if (!flagTempRequired) {
            item.classList.remove("js-temp-required-input");
            items.forEach((element) => {
              element.required = "required";
            });
          }
        }
      }
    }
  }

  const additionalSwitch = document.querySelectorAll(".cart-page__additional .toggle-switch-input");

  if (additionalSwitch) {
    additionalSwitch.forEach((item) => {
      item.addEventListener("change", () => {
        const parent = item.closest(".cart-page__additional");
        if (item.checked) {
          parent.classList.add("cart-page__additional--active");
        } else {
          parent.classList.remove("cart-page__additional--active");
        }
      });
    });
  }

  //Изменение количества товара в корзине end
  const dopSidebarRow = document.querySelectorAll(".js-dop-sidebar-row");
  if (dopSidebarRow) {
    let flagCheckedDelivery = false;
    dopSidebarRow.forEach((item) => {
      item.addEventListener("change", () => {
        let countItem, element, sidebarBasketRow;
        const selectRowSidebar = item.getAttribute("data-sidebar");

        if (selectRowSidebar) {
          sidebarBasketRow = document.querySelector(`.${selectRowSidebar}`);
          element = item;
        } else {
          element = item.closest(".js-dop-sidebar-row-wrap").querySelector("[data-sidebar]");
          sidebarBasketRow = element.getAttribute("data-sidebar");
          sidebarBasketRow = document.querySelector(`.${sidebarBasketRow}`);
        }

        //отображение скрытых доп услуг
        if (item.closest(".js-dop-sidebar-row-wrap")) {
          const optionsDop = document.querySelector(".js-cart-page-wrap-step-options");
          if (selectRowSidebar === "js-delivery-basket" && element.checked) {
            optionsDop.classList.remove("cart-page__wrap__hide");
          } else {
            optionsDop.classList.add("cart-page__wrap__hide");
          }
        }

        if (element.checked) {
          sidebarBasketRow.classList.remove("basket-sidebar__row-price--hide");
          //отмечаем что доставку выбирали
          if (selectRowSidebar === "js-delivery-basket") {
            flagCheckedDelivery = true;
          }
        } else {
          sidebarBasketRow.classList.add("basket-sidebar__row-price--hide");
          //Расчет стоимости заказа с учетом включенных доп услуг
          if (item.closest(".js-dop-sidebar-row-wrap")) {
            const optionsDop = document.querySelectorAll(
              ".js-cart-page-wrap-step-options .toggle-switch-input",
            );
            let counterDopOptions = 0;
            optionsDop.forEach((item) => {
              if (item.checked) {
                const dataSidebar = item.getAttribute("data-sidebar");
                const sidebarBasketCount = document.querySelector(`.${dataSidebar}`);
                sidebarBasketCount.classList.add("basket-sidebar__row-price--hide");
                item.checked = false;
              }
            });
            //если доставку выбирали
            if (flagCheckedDelivery) {
              flagCheckedDelivery = false;
            }
          }
        }
      });
    });
  }
});
