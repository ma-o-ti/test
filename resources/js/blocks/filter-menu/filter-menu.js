import ready from "../../utils/documentReady.js";
import noUiSlider from "nouislider";
import IMask from "imask";
import wNumb from "wnumb";
import { decodeCommaUrl } from "../../api/decode.js";
import { sendUrl } from "../../api/ajax-function.js";

ready(() => {
  const filterBtn = document.querySelectorAll(".js-catalog-filter");
  if (filterBtn) {
    const filterMenu = document.querySelector(".filter-menu");
    filterBtn.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        filterMenu.classList.toggle("filter-menu--active");
        const filterBg = document.querySelector(".filter-menu-bg");
        filterBg.classList.toggle("filter-menu-bg--active");
        const htmlWrap = document.querySelector("html");
        htmlWrap.classList.toggle("ovh");
      });
    });
  }

  //filter
  const filterForm = document.querySelector(".filter-menu__form");

  if (filterForm) {
    const filterApplyButton = document.querySelector("[data-filter-apply]");
    const filterResetButton = document.querySelector("[data-filter-reset]");
    const fromField = filterForm.querySelector('input[name="priceFrom"]');
    const toField = filterForm.querySelector('input[name="priceTo"]');
    const url = new URL(window.location.href);

    const setParamNewValue = (name, value, deleteBtnClick) => {
      if (Array.isArray(value)) {
        if (deleteBtnClick) {
          url.searchParams.delete(name);
        } else {
          if (!value) {
            url.searchParams.delete(name);
          } else {
            url.searchParams.set(
              name,
              `${value[0].replace(/ /g, "")}-${value[1].replace(/ /g, "")}`,
            );
          }
        }
      } else {
        let newValue = "";
        if (url.search) {
          const searchParamsArray = decodeCommaUrl(url.search.substring(1)).split(`&`);
          const searchParamObject = {};

          searchParamsArray.forEach((param) => {
            const [paramName, paramValue] = param.split("=");
            searchParamObject[paramName] = new Set(paramValue.split(","));
          });

          if (name in searchParamObject) {
            if (deleteBtnClick) {
              searchParamObject[name].delete(value);
            } else {
              if (searchParamObject[name].has(value)) {
                searchParamObject[name].delete(value);
              } else {
                searchParamObject[name].add(value);
              }
            }

            searchParamObject[name].size !== 0
              ? url.searchParams.set(name, [...searchParamObject[name]].join(","))
              : url.searchParams.delete(name);

            //в категории вне фильтра если выбрать "Все"
            if (value == "all") {
              url.searchParams.delete(name);
            }
          } else {
            newValue = value;
            url.searchParams.set(name, newValue);
          }
        } else {
          if (!deleteBtnClick) {
            newValue = value;
            url.searchParams.set(name, newValue);
          }
        }
      }
    };

    const clearParamsFilter = () => {
      const innerFilterInputs = filterForm.querySelectorAll(".js-filter-section");
      innerFilterInputs.forEach((item) => {
        const name = item.dataset.filterSection;
        if (url.search) {
          const searchParamsArray = decodeCommaUrl(url.search.substring(1)).split(`&`);
          const searchParamObject = {};

          searchParamsArray.forEach((param) => {
            const [paramName, paramValue] = param.split("=");
            searchParamObject[paramName] = new Set(paramValue.split(","));
          });

          if (name in searchParamObject) {
            url.searchParams.delete(name);
          }
        }
      });
      url.searchParams.delete("page");
    };

    filterApplyButton.addEventListener("click", (event) => {
      event.preventDefault();
      onSendUrl(url.href, event.target);
    });

    filterResetButton.addEventListener("click", (event) => {
      event.preventDefault();
      clearParamsFilter();
      onSendUrl(url.href, event.target);
    });

    /** GET с url фильтрации. С перезагрузкой **/
    const onSendUrl = (urlHref, target) => {
      const urlBySend = decodeCommaUrl(url.href);
      const urlByRedirect = decodeCommaUrl(urlHref);
      if (target === filterApplyButton) {
        sendUrl(urlBySend, urlByRedirect);
      }
      if (target === filterResetButton) {
        sendUrl(url.href, urlBySend);
      }
    };

    /**
     * ф-я изменения любого из фильтров
     * меняет url и делает POST запрос
     * @param { HTMLElement } targetInput - поле фильтра, в котором произошли изменения
     *  */
    const filterChange = (targetInput) => {
      let filterValue;
      let filterName;
      if (!Array.isArray(targetInput)) {
        filterValue = targetInput.closest("input").value;
        filterName = targetInput.closest(".js-filter-section").dataset.filterSection;
      } else {
        filterValue = [targetInput[0].value, targetInput[1].value];
        filterName = targetInput[0].closest(".js-filter-section").dataset.filterSection;
      }
      setParamNewValue(filterName, filterValue);
    };

    /** слушатель на изменение фильтров */
    filterForm.addEventListener("change", (event) => {
      if (event.target !== fromField && event.target !== toField) {
        filterChange(event.target);
      }
    });

    // добавление в фильтрацию верхних категорий(вне фильтра)
    const filterCheckedCategory = document.querySelectorAll(".catalog-category-list__item");

    filterCheckedCategory.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const urlName = item.closest(".js-filter-section").dataset.filterSection;
        const urlValue = item.dataset.filterValue;
        const urlBySend = decodeCommaUrl(url.href);
        setParamNewValue(urlName, urlValue);
        sendUrl(urlBySend, decodeCommaUrl(url.href));
      });
    });

    // наличие
    const availabilityInput = document.querySelector(".js-toggle-switch-input-availability");
    if (availabilityInput) {
      availabilityInput.addEventListener("change", () => {
        const urlName = availabilityInput.closest(".js-filter-section").dataset.filterSection;
        const urlValue = availabilityInput.value;
        const urlBySend = decodeCommaUrl(url.href);
        setParamNewValue(urlName, urlValue);
        sendUrl(urlBySend, decodeCommaUrl(url.href));
      });
    }

    //сброс выбранных фильтров
    const filterCheckedItems = document.querySelectorAll(".catalog-filter__tags-item");

    filterCheckedItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const urlName = item.dataset.filterSection;
        const urlValue = item.dataset.filterValue;
        const urlBySend = decodeCommaUrl(url.href);
        setParamNewValue(urlName, urlValue, true);
        sendUrl(urlBySend, decodeCommaUrl(url.href));
      });
    });

    //range
    let range = document.querySelectorAll(".range");

    if (range) {
      range.forEach((item) => {
        let input0 = item
          .closest(".filter-menu__input-range")
          .querySelector(".filter-menu__input--min");
        let input1 = item
          .closest(".filter-menu__input-range")
          .querySelector(".filter-menu__input--max");
        let inputs = [input0, input1];
        const min = Number(input0.getAttribute("data-from"));
        const max = Number(input1.getAttribute("data-to"));
        const numberMask = {
          mask: Number,
          thousandsSeparator: " ",
        };
        noUiSlider.create(item, {
          start: [min, max],
          connect: true,
          range: {
            min: min,
            max: max,
          },
          format: wNumb({
            decimals: 0,
            thousand: " ",
          }),
        });

        const maskMin = IMask(input0, numberMask);
        const maskMax = IMask(input1, numberMask);

        item.noUiSlider.on("update", (values, handle) => {
          inputs[handle].value = values[handle];
          maskMin.updateValue();
          maskMax.updateValue();
        });

        item.noUiSlider.on("change", (values, handle) => {
          inputs[handle].value = values[handle];
          maskMin.updateValue();
          maskMax.updateValue();
          filterChange(inputs);
        });

        const itemMinus = item.closest(".filter-menu__input-range").querySelector(`[data-from]`);
        const itemAdd = item.closest(".filter-menu__input-range").querySelector(`[data-to]`);

        itemMinus.addEventListener("input", function () {
          maskMin.updateValue();
          maskMax.updateValue();
          item.noUiSlider.set([itemMinus.value, itemAdd.value]);
        });
        itemAdd.addEventListener("input", function () {
          maskMin.updateValue();
          maskMax.updateValue();
          item.noUiSlider.set([itemMinus.value, itemAdd.value]);
        });
      });
    }

    /** расстановка визуальной активности фильтров при получении данных из url */
    const activeFilters = () => {
      const urlParameters = paramParse();
      const filterSections = document.querySelectorAll(".js-filter-section");
      const selectedFilters = Object.keys(urlParameters);
      filterSections.forEach((filter) => {
        const filterName = filter.dataset.filterSection;
        if (selectedFilters.includes(filterName)) {
          filter.querySelectorAll("input, .catalog-category-list__item").forEach((input) => {
            const parameterValues = urlParameters[filterName].split(",");
            parameterValues.forEach((parameter) => {
              if (input.classList.contains("catalog-category-list__item")) {
                if (parameter && input.getAttribute("data-filter-value") === parameter) {
                  input.classList.add("active");
                }
              } else {
                if (parameter && input.value === parameter) {
                  input.checked = true;
                  if (filterName === "availability") {
                    const fakeSwitch = document.querySelector(
                      ".js-toggle-switch-availability-fake",
                    );
                    fakeSwitch.classList.add("toggle-switch__label--active");
                  }
                }
              }
            });
          });
        } else {
          //выставляем для подкатегорий активную кнопку "Все"
          if (filter.querySelectorAll(".catalog-category-list__item").length > 0) {
            const allSelect = filter.querySelector("[data-filter-value='all']");
            allSelect.classList.add("active");
          }
        }

        if (
          (selectedFilters.includes("price") && filterName === "price") ||
          (selectedFilters.includes("thickness") && filterName === "thickness") ||
          (selectedFilters.includes("length") && filterName === "length") ||
          (selectedFilters.includes("width") && filterName === "width") ||
          (selectedFilters.includes("height") && filterName === "height")
        ) {
          const split1 = url.search.split(`${filterName}=`)[1];
          const price = split1 ? split1.split("&")[0] : 1;
          const min = price.split("-")[0];
          const max = price.split("-")[1];

          let itemMinus = filterForm.querySelector(`[data-filter-section="${filterName}"]`);
          let itemAdd = filterForm.querySelector(`[data-filter-section="${filterName}"]`);
          const rangeElement = itemMinus
            .closest(".filter-menu__input-range")
            .querySelector(".range");
          itemMinus = itemMinus.querySelector(`[data-from]`);
          itemAdd = itemAdd.querySelector(`[data-to]`);
          itemMinus.value = min;
          itemAdd.value = max;
          rangeElement.noUiSlider.set([itemMinus.value, itemAdd.value]);
        }
      });
    };

    /** парсинг параметров url для фильтра */
    const paramParse = function () {
      const queryArr = decodeURI(url.search).slice(1).split("&");
      const urlParameters = {};
      queryArr.forEach((el) => {
        let temp = el.split("=");
        urlParameters[temp[0]] = temp[1];
      });
      return urlParameters;
    };

    activeFilters();
  }
});
