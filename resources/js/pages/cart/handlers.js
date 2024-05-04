import {
  changeProductQuantity,
  deleteBasketItem,
  getAdvancedInfo,
  getTotalInfo,
} from "../../api/ajax-function";
import { updateHeaderBasketCount } from "../../common/basket";
import { debounce } from "../../common/debounce";
import { renderTotal } from "./render/renderTotal";
import { renderService } from "./render/renderService";
import { renderDelivery } from "./render/renderDelivery";
import { renderResetUploadButton } from "./render/renderResetUploadButton";

function displayEmptyCartMessage() {
  const wrapBasket = document.querySelector(".cart-page");
  const voidBasket = document.querySelector(".cart-page-void");
  wrapBasket.remove();
  voidBasket.classList.add("cart-page-void--active");
}

function hideActiveMenu(moreInfo) {
  moreInfo.forEach((item) => {
    const hideMenu = item
      .closest(".cart-page-product")
      .querySelector(".cart-page-product__mobile-fixed");
    if (hideMenu.classList.contains("cart-page-product__mobile-fixed--active")) {
      hideMenu.classList.remove("cart-page-product__mobile-fixed--active");
    }
  });
}

const debouncedChangeQuantity = debounce(changeProductQuantity, 500);

export const listHandler = (evt) => {
  const target = evt.target;
  const productId = target.closest(".cart-page-product").dataset.id;

  if (target.classList.contains("js-remove-basket") || target.closest(".js-remove-basket")) {
    const list = document.querySelectorAll(".cart-page-product");
    deleteBasketItem(productId);
    if (list.length === 1) {
      displayEmptyCartMessage();
    }
    updateHeaderBasketCount();
  }

  if (target.classList.contains("js-quantity-button") || target.closest(".js-quantity-button")) {
    const input = target.closest(".quantity-selector__main").querySelector(".js-count-product");
    const changeType = target.dataset.change;

    if (changeType === "increment") {
      input.value = parseInt(input.value) + 1;
      target
        .closest(".quantity-selector__main")
        .querySelector(".qs-dec")
        .removeAttribute("disabled");
    } else if (changeType === "decrement" && input.value !== "1") {
      input.value = parseInt(input.value) - 1;
    }

    debouncedChangeQuantity({ id: productId, quantity: input.value });
  }

  if (
    target.classList.contains("cart-page-product__icon-more") ||
    target.closest(".cart-page-product__icon-more")
  ) {
    const menu = target
      .closest(".cart-page-product")
      .querySelector(".cart-page-product__mobile-fixed");
    const allMenus = document.querySelectorAll(".cart-page-product__icon-more");
    if (menu.classList.contains("cart-page-product__mobile-fixed--active")) {
      hideActiveMenu(allMenus);
      menu.classList.remove("cart-page-product__mobile-fixed--active");
    } else {
      hideActiveMenu(allMenus);
      menu.classList.add("cart-page-product__mobile-fixed--active");
    }
    console.log(productId);
  }
};

export const promoCodeHandler = (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch("/ajax/cart/promocode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      renderTotal(data);
    })
    .then(() => {
      form.reset();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deliveryShippingHandler = async () => {
  const data = await getTotalInfo();
  renderTotal(data);
  renderDelivery(data);
};

export const assemblyServiceHandler = async () => {
  const data = await getTotalInfo();
  renderTotal(data);
  renderService(data);
};

export const advancedSelectHandler = async ({ target }) => {
  let data;
  if (target.id === "advanced-lift-type") {
    data = await getAdvancedInfo({ id: target.id, value: target.value });
  } else if (target.id === "advanced-lift") {
    data = await getAdvancedInfo({ id: target.id, value: target.checked.toString() });
  } else if (target.id === "advanced-assembly") {
    data = await getAdvancedInfo({ id: target.id, value: target.checked.toString() });
  }
  renderTotal(data);
  renderService(data);
};

export const uploadCompanyCardHandler = ({ target }) => {
  const BYTES_IN_MB = 1048576;
  const container = target.closest(".upload");
  const textElement = container.querySelector(".upload__text");
  textElement.innerText = `${target.files[0].name}, ${(target.files[0].size / BYTES_IN_MB).toFixed(
    2,
  )}Mb`;
  renderResetUploadButton(container);
};
