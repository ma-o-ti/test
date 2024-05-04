import ready from "../../utils/documentReady.js";

ready(() => {
  const moreInfo = document.querySelectorAll(".cart-page-product__icon-more");

  //закрываем все активные меню
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

  if (moreInfo) {
    moreInfo.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const hideMenu = item
          .closest(".cart-page-product")
          .querySelector(".cart-page-product__mobile-fixed");
        if (hideMenu.classList.contains("cart-page-product__mobile-fixed--active")) {
          hideActiveMenu(moreInfo);
          hideMenu.classList.remove("cart-page-product__mobile-fixed--active");
        } else {
          hideActiveMenu(moreInfo);
          hideMenu.classList.add("cart-page-product__mobile-fixed--active");
        }
      });
    });
  }

  const cartPage = document.querySelector(".cart-page-product");

  if (cartPage) {
    document.addEventListener("click", (event) => {
      //Закрытие фиксированного меню корзины товара в мобильнике
      const moreInfoBasket = cartPage.querySelectorAll(".cart-page-product__mobile-fixed");
      if (moreInfoBasket) {
        moreInfoBasket.forEach((item) => {
          if (item.classList.contains("cart-page-product__mobile-fixed--active")) {
            if (
              event.target.classList.contains("cart-page-product__icon-more") ||
              event.target.closest(".cart-page-product__icon-more") ||
              event.target.classList.contains("cart-page-product__mobile-fixed") ||
              event.target.closest(".cart-page-product__mobile-fixed")
            ) {
              item.classList.remove("cart-page-product__mobile-fixed--active");
            }
          }
        });
      }
    });
  }
});
