import ready from "../../utils/documentReady.js";

ready(() => {
  const basketSidebar = document.querySelector(".basket-sidebar");

  function toggleBtn(item) {
    const btnBasket = basketSidebar.querySelector(".basket-sidebar__btn");
    if (item.checked && item.classList.contains("js-toggle-pay")) {
      btnBasket.innerHTML = btnBasket.getAttribute("data-pay");
    } else {
      btnBasket.innerHTML = btnBasket.getAttribute("data-default");
    }
  }

  if (basketSidebar) {
    //фиксированная корзина по скроллу
    const rect = basketSidebar.getBoundingClientRect();
    basketSidebar.classList.add("basket-sidebar--fixed");
    window.addEventListener("scroll", () => {
      if (window.scrollY + window.innerHeight > rect.y) {
        basketSidebar.classList.remove("basket-sidebar--fixed");
      } else {
        basketSidebar.classList.add("basket-sidebar--fixed");
      }
    });

    //Смена текста в кнопке при смене типа оплаты
    const btnsChangeBasket = document.querySelectorAll(
      ".cart-page__col-3--not-table .radio__input",
    );

    btnsChangeBasket.forEach((item) => {
      item.addEventListener("change", () => {
        toggleBtn(item);
      });
    });
  }
});
