import { addItemsToBasket, addToBasket } from "../api/ajax-function";
import { ERROR_MASSAGE } from "../api/path_ajax";
import makeNotification from "./notification";

export const handleAddToBasket = (evt) => {
  const element = evt.target.classList.contains("js-add-basket")
    ? evt.target
    : evt.target.closest(".js-add-basket");
  const productId = element.getAttribute("data-id");
  const parent = element.closest(".js-add-basket-parent");
  const countElement = parent ? parent.querySelector(".js-count-product") : null;
  const count = countElement ? countElement.value : "1";
  addToBasket(productId, element, count);
};

export const handleAddCollectionToBasket = () => {
  const products = Array.from(document.querySelectorAll(".js-collection-list .detail-prices__row"));

  const data = products
    .map((item) => {
      const id = parseInt(item.dataset.id);
      const count = parseInt(item.querySelector(".js-count-product").value);
      return { id, count };
    })
    .filter((item) => item.count > 0);
  if (data.length) {
    addItemsToBasket(data);
  }
};

export const updateHeaderBasketCount = (count) => {
  const countBasket = document.querySelector(".basket-link__count");

  if (typeof count === "undefined") {
    fetch("/ajax/cart/total/")
      .then((response) => response.json())
      .then((data) => {
        countBasket.innerText = data.total;
      })
      .catch((err) => {
        console.error(err);
        makeNotification.error({
          content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
        });
      });
  } else {
    countBasket.innerText = count;
  }
};
