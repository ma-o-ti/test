import { ERROR_MASSAGE, productsUrlItems } from "../../api/path_ajax.js";
import { deleteProductUrl } from "../../api/path_ajax.js";
import { decodeCommaUrl } from "../../api/decode.js";
import { sendUrl } from "../../api/ajax-function.js";
import ready from "../../utils/documentReady.js";
import { urlParams } from "../../utils/urlParams";
// import dataExample from "./catalog-items.json";
import { loader } from "../../api/ajax-function";

ready(() => {
  const catalogParent = document.querySelector(".js-wrap-catalog-content") || false;

  if (catalogParent !== false) {
    const pageNumber = urlParams.get("page") || 1;
    const catalogList = catalogParent.querySelector(".catalog-list") || false;
    const catalogPagination = catalogParent.querySelector(".catalog-pagination") || false;
    const moreProduct = document.querySelector(".js-show-more-products") || false;

    if (moreProduct !== false) {
      moreProduct.addEventListener("click", (event) => {
        const target = event.target;
        addProductsCatalogList(target);
      });

      moreProduct.setAttribute("data-page", pageNumber);
    }

    if (catalogList !== false) {
      catalogList.addEventListener("click", (event) => deleteCatalogItem(event), false);
    }

    if (catalogPagination !== false) {
      catalogPagination.addEventListener(
        "pagination change",
        (event) => changePagination(event),
        false,
      );
    }

    /**
     * Добавляем товар в список(например при помощи триггера "Показать ещё")
     * @param catalogParent
     * @param path
     * @returns {Promise<void>}
     */
    async function addProductsCatalogList(moreButton) {
      const path = moreButton.getAttribute("data-path");
      var pageIndex = parseInt(moreButton.getAttribute("data-page")) || 1;

      loader(true, "body");
      try {
        // TO DO - productsUrlItems
        // const productsUrlItems = "https://jsonplaceholder.typicode.com/todos/1";
        // let response = await fetch(productsUrlItems);
        let response = await fetch(`${productsUrlItems}${path}`);
        let newData = await response.json();
        if (newData) {
          // let products = dataExample.products;

          // if (path == "product-single-desk") products = dataExample.productsDesk;
          // if (path == "product-single-chair") products = dataExample.productsChair;
          // if (path == "product-single-chair-delete") products = dataExample.productsChairDelete;
          let products = newData.products;

          catalogParent.querySelector(".catalog-list").insertAdjacentHTML("beforeend", products);

          //удаляем "Показать еще" если больше нет товаров(true если больше нет товаров)
          // if (dataExample.showAllProducts) {
          if (newData.showAllProducts) {
            catalogParent.querySelector(".js-show-more-products").remove();
          }

          makeSlider.initManually(".js-wrap-catalog-content .slider", {
            loop: true,
            navigation: false,
            pagination: {
              el: ".swiper-pagination",
              type: "bullets",
              clickable: true,
            },
          });

          makeQuantitySelector.init(
            ".js-wrap-catalog-content .quantity-selector:not(.quantity-selector-init)",
          );

          pageIndex += 1;
          moreButton.setAttribute("data-page", pageIndex);

          if (catalogPagination !== false) {
            componentPagination.changeActive(catalogPagination, pageIndex);
          }
        }
      } catch (err) {
        console.error(err);
        makeNotification.error({
          content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
        });
      } finally {
        loader(false, "body");
      }
    }

    /**
     * Удаляем превью товара из списка(например в "Избранном")
     * @param event
     */
    const deleteCatalogItem = (event) => {
      let target = event.target;
      let deleteBtn = target.closest(".catalog-item__delete") || false;

      if (deleteBtn !== false) {
        let parent = deleteBtn.closest(".catalog-item");
        let id = parent.getAttribute("data-product-id"); // подставляем нужное значение для обращения к БД, например id продукта

        // пример удаления элемента из бд
        fetch(`${deleteProductUrl}/${id}`, { method: "DELETE" })
          .then((res) => res)
          .catch((error) => {
            makeNotification.error({
              type: "toast",
              content:
                '<p class="notification__title">Избранное</p><p>Во время удаление товара из избранного, произошла ошибка. Попробуйте ещё раз.</p>',
            });
            console.error(`#catalogItem delete. \nMessage: ${error.message}.`);
          });
        parent.remove();
      }

      if (catalogList.children.length == 0) {
        let triggerMore = catalogList.nextElementSibling;
        let pagination = triggerMore.nextElementSibling;

        triggerMore.remove();
        pagination.remove();
        catalogList.classList.add("catalog-list--empty");
        catalogList.innerHTML = "<p class='catalog-list__note'>Ваш список пуст...</p>";
      }
    };

    /**
     * Основное событие пагинации(Каталог, Избранное)
     * @param event
     */
    const changePagination = (event) => {
      const url = new URL(window.location.href);
      const urlByRedirect = decodeCommaUrl(url.href);
      const urlBySend = decodeCommaUrl(url.href);

      sendUrl(urlBySend, urlByRedirect);
    };
  }
});
