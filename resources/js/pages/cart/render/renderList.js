const createCard = (data) => {
  const el = document.createElement("div");
  el.classList.add("cart-page-product");
  el.setAttribute("data-id", data.id);
  el.innerHTML = `
    <a class="cart-page-product__img" href="${data.url}">
      <img src="${data.media}" alt="cart-page-product" width="80px" height="80px">
    </a>
    <div class="cart-page-product__center">
      <div class="cart-page-product__center-top">
        <a class="cart-page-product__title" href="${data.url}">${data.name}</a>
        <div class="catalog-item-sizes">
          <div class="catalog-item-sizes__row">
            <div class="catalog-item-sizes__col w">
              <svg class="catalog-item-sizes__icon">
                <use href="assets/img/svgSprite.svg#icon__size-direction"></use>
              </svg>
              ${data.width}
            </div>
            <div class="catalog-item-sizes__col sq">
              <svg class="catalog-item-sizes__icon">
                <use href="assets/img/svgSprite.svg#icon__size-direction"></use>
              </svg>
              ${data.depth}
            </div>
            <div class="catalog-item-sizes__col h">
              <svg class="catalog-item-sizes__icon">
                <use href="assets/img/svgSprite.svg#icon__size-direction"></use>
              </svg>
              ${data.height}
            </div>
          </div>
        </div>
        <div class="catalog-item__color-row">
          <div class="catalog-item__color-preview" style="--color: #936735"></div>
          <span>${data.color_name}</span><span class="catalog-item__color-note">+${
    data.colors.length
  } цвет${data.colors.length > 4 ? "ов" : "а"}</span>
        </div>
      </div>
      <div class="cart-page-product__center-bottom">
        <div class="cart-page-product__mobile-fixed">
          <div class="cart-page-product__quantity-title">Количество</div>
          <div class="cart-page-product__mobile-fixed-row">
            <div class="quantity-selector__main">
              <button type="button" class="quantity-selector__trigger qs-dec js-quantity-button" data-change="decrement" disabled="${
                data.count === "1"
              }" aria-label="decrease">
                <svg width="512" height="50" viewBox="0 0 512 50" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0 24.7742C0 11.0918 11.0918 0 24.7742 0H487.226C500.908 0 512 11.0918 512 24.7742C512 38.4566 500.908 49.5484 487.226 49.5484H24.7742C11.0918 49.5484 0 38.4566 0 24.7742Z"></path>
                </svg>
              </button>
              <div class="quantity-selector__content"><input
                  class="quantity-selector js-count-product quantity-selector__trigger js-quantity-basket quantity-selector__field quantity-selector-init"
                  type="number" value="${data.count}" placeholder="" min="1" step="1"></div>
              <button type="button" class="quantity-selector__trigger qs-inc js-quantity-button" data-change="increment" aria-label="increase">
                <svg width="513" height="513" viewBox="0 0 513 513" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M256.543 0.539062C270.225 0.539062 281.317 11.6308 281.317 25.3133V487.765C281.317 501.447 270.225 512.539 256.543 512.539C242.861 512.539 231.769 501.447 231.769 487.765V25.3133C231.769 11.6308 242.861 0.539062 256.543 0.539062Z"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.542969 256.539C0.542969 242.857 11.6348 231.765 25.3172 231.765H487.769C501.451 231.765 512.543 242.857 512.543 256.539C512.543 270.221 501.451 281.313 487.769 281.313H25.3172C11.6348 281.313 0.542969 270.221 0.542969 256.539Z"></path>
                </svg>
              </button>
            </div>
            <div class="cart-page-product__mobile-fixed-links"><a class="cart-page-product__icon-link" href="#">
              <div class="wrap-icon">
                <svg class="icon">
                  <use href="assets/img/svgSprite.svg#icon__favorite"></use>
                </svg>
              </div>
            </a><button class="cart-page-product__icon-link js-remove-basket" type="button">
              <div class="wrap-icon">
                <svg class="icon">
                  <use href="assets/img/svgSprite.svg#icon__delete"></use>
                </svg>
              </div>
            </button></div>
          </div>
        </div>
        <div class="cart-page-product__wrap-price">
        <span class="cart-page-product__price-old">${
          data.discount_price && data.price.toLocaleString() + '<abbr title="Рубль">₽</abbr>'
        }</span>
        <span class="cart-page-product__price">${
          data.discount_price ? data.discount_price.toLocaleString() : data.price.toLocaleString()
        }<abbr title="Рубль">₽</abbr></span></div>
      </div>
    </div>
    <div class="cart-page-product__right">
      <button class="btn cart-page-product__icon-link js-remove-basket" type="button">
        <div class="wrap-icon">
          <svg class="icon">
            <use href="assets/img/svgSprite.svg#icon__delete"></use>
          </svg>
        </div>
      </button>
      <a class="cart-page-product__icon-link cart-page-product__icon-link cart-page-product__icon-more btn" href="#">
        <div class="wrap-icon">
          <svg class="icon">
            <use href="assets/img/svgSprite.svg#icon__more-info"></use>
          </svg>
        </div>
      </a>
    </div>
  `;
  return el;
};

export const renderList = (data, mountElem) => {
  mountElem.innerHTML = "";
  data.forEach((item) => {
    mountElem.append(createCard(item));
  });
};
