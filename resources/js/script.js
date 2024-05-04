import ready from "../js/utils/documentReady.js";
import { ERROR_MASSAGE } from "./api/path_ajax.js";
import { chooseCity, compareCheck, favoriteCheck, loader } from "./api/ajax-function.js";
import { debounce } from "./common/debounce";
import {
  handleAddCollectionToBasket,
  handleAddToBasket,
  updateHeaderBasketCount,
} from "./common/basket";
// ui
import makeSlider from "./common/slider.js";
import makeTooltip from "./common/tooltip-trigger.js";
import makeValidation from "./common/validation.js";
import makeFieldCounter from "./common/counter-field.js";
import makeNotification from "./common/notification.js";
import makeQuantitySelector from "./common/quantity-selector.js";
import { initPopup } from "./common/popup.js";
// pages
import pageDetail from "./pages/detail.js";
import { selectWrap } from "./common/select.js";
import { debug } from "husky/lib/debug";

ready(() => {
  // # UI elements init
  makeSlider.init(".slider");
  makeTooltip.init(".tooltip-trigger");
  makeValidation.init(); // .js-validation;
  makeFieldCounter.init(); // .js-field-counter;
  makeNotification.init();
  makeQuantitySelector.init(".quantity-selector");

  const cityInfo = {
    elements: [
      {
        title: "Москва",
      },
      {
        title: "Санкт-Петербург",
      },
      {
        title: "Краснодар",
      },
      {
        title: "Владимир",
      },
      {
        title: "Волгоград",
      },
      {
        title: "Воронеж",
      },
      {
        title: "Екатеренбург",
      },
      {
        title: "Казань",
      },
      {
        title: "Калуга",
      },
      {
        title: "Краснодар",
      },
      {
        title: "Красноярск",
      },
      {
        title: "Нижний Новгород",
      },
      {
        title: "Новосибирск",
      },
      {
        title: "Пятигорск",
      },
      {
        title: "Ростов-на-Дону",
      },
      {
        title: "Рязань",
      },
      {
        title: "Самара",
      },
      {
        title: "Саратов",
      },
      {
        title: "Сочи",
      },
      {
        title: "Тверь",
      },
      {
        title: "Тула",
      },
      {
        title: "Тюмень",
      },
      {
        title: "Челябинск",
      },
      {
        title: "Ярославль",
      },
    ],
  };

  async function searchCity(evt) {
    loader(true, ".js-city-scroll-container");
    try {
      let response = await fetch("/ajax/city-search/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evt.target.value),
      });
      let newData = await response.json();
      if (newData) {
        let contentCity = "";
        cityInfo.elements.forEach((item) => {
          contentCity += `<button class="popup__results-item js-city-results-item">${item.title}</button>`;
        });
        document.querySelector(".js-city-results").innerHTML = contentCity;
      }
    } catch (err) {
      console.error(err);
      loader(false, ".js-city-scroll-container");
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    } finally {
      loader(false, ".js-city-scroll-container");
    }
  }

  const inputCity = document.querySelector(".js-search-city-input");
  if (inputCity) {
    // Поиск города
    const debouncedSearchCity = debounce(searchCity, 500);
    inputCity.addEventListener("input", debouncedSearchCity);

    //Выбор города
    const cityBtn = document.querySelector(".js-city-results");
    cityBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.classList.contains("js-city-results-item")) {
        const nameCity = event.target.innerText;
        chooseCity(nameCity, event.target);
      }
    });
  }

  document.addEventListener("click", (event) => {
    const lkUser = document.querySelector(".js-lk-user");
    // Добавление в избранное
    if (
      event.target.classList.contains("js-add-favorite") ||
      event.target.closest(".js-add-favorite")
    ) {
      event.preventDefault();
      //Проверка регистрации пользователя
      favoriteCheck();
    }

    if (
      event.target.classList.contains("js-add-compare") ||
      event.target.closest(".js-add-compare")
    ) {
      event.preventDefault();
      //Проверка регистрации пользователя
      compareCheck();
    }

    //Добавление в корзину
    if (
      event.target.classList.contains("js-add-basket") ||
      event.target.closest(".js-add-basket")
    ) {
      handleAddToBasket(event);
    }

    // Добавление товаров из "Мебель на фото"
    if (
      event.target.classList.contains(".js-add-collection") ||
      event.target.closest(".js-add-collection")
    ) {
      handleAddCollectionToBasket(event);
    }
  });

  // popup default init
  try {
    let popupTriggers = Array.from(document.querySelectorAll("[data-popup-trigger]"));

    popupTriggers.forEach((trigger) => {
      let popupModal = trigger.getAttribute("data-popup-modal");
      let popupTrigger = trigger.getAttribute("data-popup-trigger");

      initPopup(popupModal, popupTrigger);
    });
  } catch (error) {
    console.error(error);
  }

  let detailElement = document.querySelector(".detail") || false;

  if (detailElement !== false) {
    pageDetail.init(detailElement);
  }

  //custom selets
  selectWrap();
  updateHeaderBasketCount();
});
