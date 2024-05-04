import { detailCollectionsUrl, detailGoodsUrl } from "../api/path_ajax";
import makeTooltip from "../common/tooltip-trigger.js";
import { initPopup } from "../common/popup";
import { loader } from "../api/ajax-function";

import makeNotification from "../common/notification";

const pageDetail = (() => {
  const init = (el) => {
    try {
      const parent = el;
      const goodsMain = parent.querySelector(".detail-goods") || false;
      const pointsSlider = parent.querySelector(".detail-slider-main--points") || false;
      const collectionsMain = parent.querySelector(".detail-collections") || false;

      // init points
      if (pointsSlider !== false) {
        pointsStart(pointsSlider);
      }

      // init goods
      if (goodsMain !== false && document.getElementById("goods-popup")) {
        initPopup("#goods-popup");
        goodsMain.addEventListener("click", (event) => listenerGoods(event), false);
      }

      // collections
      if (collectionsMain !== false) {
        const collectionsLinks =
          collectionsMain.querySelector(".detail-collections__links") || false;
        if (collectionsLinks !== false) {
          collectionsLinks.addEventListener(
            "catalogCategory selected",
            (event) => listenerCollections(event),
            false,
          );
        }
      }
    } catch (error) {
      console.error(`#pageDetail init. \nMessage: ${error.message}.`);
    }
  };

  const listenerGoods = (event) => {
    let target = event.target;
    let goodsItem = target.closest(".detail-goods__item") || false;
    let goodsPopupMain = document.getElementById("goods-popup") || false;
    let goodsPopupWrapper = goodsPopupMain.querySelector(".product-card__wrapper");

    if (goodsItem !== false) {
      let relatedLoader = goodsItem.getAttribute("data-related-loader");

      loader(true);

      fetch(`${detailGoodsUrl}/${relatedLoader}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("При получение сопутствующего товара, возникла ошибка.");
          }

          let json = response.json();

          goodsPopupWrapper.innerHTML = "";
          json.forEach((variable) => {
            let productCardElement = document.createElement("div");

            productCardElement.classList.add("product-card");
            productCardElement.classList.add("product-card--medium");
            productCardElement.innerHTML = `
              <div class="product-card__row">
                <div class="product-card__col left">
                    <img class="product-card__pic" src="./img/${
                      variable.pic
                    }" loading="lazy" alt="${variable.name}">
                </div>
                <div class="product-card__col right">
                    <div class="product-card__title">Мягкая офисная мебель LAMELLA</div>
                    <div class="product-card__bottom">
                      <div class="product-card__price">
                        ${
                          variable.price.old
                            ? `<s class="old text-sale text-sale--esm">${variable.price.old} <abbr title="Рубль">₽</abbr></s>`
                            : ""
                        }
                        <p class="actual text-price--elg">${
                          variable.price.actual
                        } <abbr title="Рубль">₽</abbr></p>
                      </div>
                      <button class="product-card__add main-btn js-add-basket" type="button" title="Добавить в корзину" aria-label="Добавить в корзину" data-sku="8665588">
                        <svg class="svg">
                          <use href="assets/img/svgSprite.svg#icon__basket"></use>
                        </svg>
                      </button>
                    </div>
                </div>
              </div>
            `;

            goodsPopupWrapper.insertAdjacentHTML("beforeend", productCardElement.outerHTML);
          });

          goodsPopupMain.makePopup.handleShowPopup();
        })
        .catch((error) => {
          makeNotification.error({
            type: "toast",
            content:
              '<p class="notification__title">Сопутствующие товары</p><p>Во время загрузки Сопутствующих товаров произошла ошибка. Попробуйте ещё раз.</p>',
          });
          console.error(`#pageDetail: Goods request. \nMessage: ${error.message}.`);
        })
        .finally(() => {
          loader(false);
        });
    }
  };

  const listenerCollections = (event) => {
    let detail = event.detail;
    let detailClear = detail.clear;
    let detailVariable = detailClear ? "all" : detail.variable.toString();
    setUrlParamsCollections(detail);
    getCollections(detailVariable);
  };

  const setUrlParamsCollections = (detail) => {
    let detailClear = detail.clear;
    let detailVariable = detail.variable;
    let searchParams = new URLSearchParams(window.location.search);

    searchParams.set("detailCollections", detailClear ? "all" : detailVariable.toString());

    let resultUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?${searchParams.toString()}`;

    window.history.pushState({ path: resultUrl }, "", resultUrl);
  };

  const getCollections = (variable) => {
    loader(true);

    fetch(`${detailCollectionsUrl}/?collections=${variable}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("При получение элементов коллекции, возникла ошибка.");
        }

        let json = response.json();
      })
      .catch((error) => {
        makeNotification.error({
          type: "toast",
          content:
            '<p class="notification__title">Элементы коллекции</p><p>Во время загрузки Элементов коллекции произошла ошибка. Попробуйте ещё раз.</p>',
        });
        console.error(`#pageDetail: Collections request. \nMessage: ${error.message}.`);
      })
      .finally(() => {
        loader(false);
      });
  };

  const pointsStart = (el) => {
    let parent = el;

    // desktop and tablet
    if (window.innerWidth > 767) {
      let options = {
        allowHTML: true,
        hideOnClick: true,
        appendTo: document.body,
        interactive: true,
        arrow: false,
        theme: "light product",
        trigger: "click focus",
        onShow(instance) {
          let trigger = instance.reference;
          let params = {
            id: trigger.getAttribute("data-product-id"),
            pic: trigger.getAttribute("data-product-pic") || false,
            title: trigger.getAttribute("data-product-title") || false,
            price: {
              old: trigger.getAttribute("data-product-price-old") || false,
              actual: trigger.getAttribute("data-product-price-actual") || false,
            },
          };
          let content = `
          <div class="product-card product-card--small">
            <div class="product-card__row">
              ${
                params.pic
                  ? `<div class="product-card__col left"><img class="product-card__pic" src="${params.pic}" alt="${params.title}"></div>`
                  : ""
              }
              <div class="product-card__col right">
                  ${params.title ? `<p class="product-card__title">${params.title}</p>` : ""}

                <div class="product-card__bottom">
                  <div class="product-card__price">
                    ${
                      params.price.old
                        ? `<s class="old text-sale text-sale--esm">${params.price.old} <abbr title="Рубль">₽</abbr></s>`
                        : ""
                    }

                    ${
                      params.price.actual
                        ? `<p class="actual text-price--elg">${params.price.actual} <abbr title="Рубль">₽</abbr></p>`
                        : ""
                    }
                  </div>

                  ${
                    params.price.old || params.price.actual
                      ? `<button type="button" title="Добавить в корзину" aria-label="Добавить в корзину" class="product-card__add main-btn js-add-basket" data-sku="${params.id}"><svg class="svg"><use href="assets/img/svgSprite.svg#icon__basket"></svg></button>`
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        `;

          instance.setContent(content);
          makeTooltip.methodHideAll();
        },
      };

      let tooltipInstance = makeTooltip.delegateInit(
        parent,
        ".detail-slider__points-item",
        options,
      );
      let sliderInstance =
        makeSliderInstance.find((variable) => variable.hostEl == parent) || false;

      if (sliderInstance) {
        sliderInstance.on("slideChange", () => makeTooltip.methodHideAll({ duration: 0 }));
      }
      // mobile
    } else {
      let popup = document.getElementById("detail-points-product");
      let popupUnits = {
        pic: popup.querySelector(".catalog-item__pic"),
        title: popup.querySelector(".catalog-item__title"),
        price: {
          old: popup.querySelector(".catalog-item__price-sale span"),
          actual: popup.querySelector(".catalog-item__price-actual span"),
        },
      };
      let triggers = Array.from(parent.querySelectorAll(".detail-slider__points-item"));

      if (triggers.length > 0) {
        initPopup("#detail-points-product");

        parent.addEventListener(
          "click",
          function (event) {
            let target = event.target;
            let parent = target.closest(".detail-slider__points-item");

            if (parent) {
              let parentUnits = {
                id: parent.getAttribute("data-product-id"),
                pic: parent.getAttribute("data-product-pic"),
                title: parent.getAttribute("data-product-title"),
                price: {
                  actual: parent.getAttribute("data-product-price-actual"),
                  old: parent.getAttribute("data-product-price-old") || false,
                },
              };

              popupUnits.pic.setAttribute("src", parentUnits.pic);
              popupUnits.title.innerHTML = parentUnits.title;
              popupUnits.price.old.innerHTML = parentUnits.price.old
                ? `${parentUnits.price.old} ₽`
                : " ";
              popupUnits.price.actual.innerHTML = `${parentUnits.price.actual} ₽`;

              popup.makePopup.handleShowPopup();
            }
          },
          false,
        );
      }
    }
  };

  return { init };
})();

window.pageDetail = pageDetail;

export default pageDetail;
