import { ERROR_MASSAGE, favoriteUrl, productsUrlItems } from "./path_ajax";
import makeNotification from "../common/notification";
import { updateHeaderBasketCount } from "../common/basket";
import { renderTotal } from "../pages/cart/render/renderTotal";

let isFetching = false;

/**
 * Функция для управления видимостью блока загрузчика на основе флага.
 *
 * @param {boolean} flag - Флаг для управления видимостью блока загрузчика.
 * @param {string} parentClass - Класс родительского элемента для поиска блока загрузчика. Если не указан, используется класс по умолчанию.
 * @return {void} Эта функция не возвращает значений.
 */
export const loader = (flag, parentClass) => {
  let parent;
  if (parentClass) {
    parent = document.querySelector(parentClass);
  } else {
    parent = document.querySelector(".main-wrap-loader-block");
  }
  const loader = parent.querySelector(".loader-block");
  if (flag) {
    loader.classList.add("loader-block--active");
  } else {
    loader.classList.remove("loader-block--active");
  }
};

/**
 * Отправляет запрос для выбора города и обновляет пользовательский интерфейс на основе ответа.
 *
 * @param {string} nameCity - Название города, который нужно выбрать.
 * @param {Element} element - Элемент, представляющий город в пользовательском интерфейсе, который будет обновлен.
 */
export const chooseCity = (nameCity, element) => {
  loader(true, ".js-city-scroll-container");
  fetch("/ajax/city-selected/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(nameCity),
  })
    .then(() => {
      element.classList.add("popup__results-item--active");
    })
    .catch((err) => {
      console.error(err);
      loader(false, ".js-city-scroll-container");
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    })
    .finally(() => {
      loader(false, ".js-city-scroll-container");
    });
};

/**
 * Добавляет элемент в корзину, делая POST-запрос на сервер.
 *
 * @param {string} id - Идентификатор элемента, который нужно добавить в корзину.
 * @param {HTMLElement} element - HTML-элемент, связанный с элементом.
 * @param {number} count - Количество элементов, которое нужно добавить в корзину.
 */
export const addToBasket = (id, element, count) => {
  //перехватываем несколько запросов на сервер
  if (isFetching === true) {
    return;
  }
  isFetching = true;
  loader(true);

  const data = {
    id,
    count,
  };

  fetch("/ajax/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.total) {
        throw new Error("Total field not found in the response JSON");
      }
      if (element) {
        element.setAttribute("disabled", "");
      }
      updateHeaderBasketCount(data.total);
    })
    .catch((err) => {
      console.error(err);
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    })
    .finally(() => {
      isFetching = false;
      loader(false);
    });
};

/**
 * Добавляет элементы в корзину, используя предоставленные данные.
 *
 * @param {object} data - Данные, которые будут добавлены в корзину
 * @return {void}
 */
export const addItemsToBasket = (data) => {
  if (isFetching === true) {
    return;
  }
  isFetching = true;
  loader(true);

  fetch("/ajax/cart/add-collection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.total) {
        throw new Error("Total field not found in the response JSON");
      }
      updateHeaderBasketCount(data.total);
    })
    .catch((err) => {
      console.error(err);
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    })
    .finally(() => {
      isFetching = false;
      loader(false);
    });
};

/**
 * Изменяет количество товара в корзине и обновляет информацию о корзине
 * @param {Element} element - Элемент, представляющий товар в корзине
 */
export const changeProductBasketItem = (element) => {
  const product = element.closest(".cart-page-product");
  const id = product.getAttribute("data-id");
  const count = product.querySelector(".js-quantity-basket").value;
  //перехватываем несколько запросов на сервер
  if (isFetching === true) {
    return;
  }
  isFetching = true;
  loader(true);
  //передаем данные массивом если коллекция(с количеством) или только id товара
  let idProduct = {
    id: id,
  };

  if (count) {
    idProduct.count = count;
  }

  fetch(productsUrlItems, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(idProduct),
  })
    .then((response) => response.json())
    .then((data) => {
      const lengthProduct = data.data.cart;
      //вставляем новые полученные данные количества товаров
      const countProducts = document.querySelector(
        ".js-before-products-count .js-basket-sidebar-products-count",
      );
      countProducts.innerHTML = lengthProduct.list.length;

      //вставка цены без скидки
      if (lengthProduct.amount_before_discount) {
        const orderingSidebarDiscount = document.querySelector(
          ".js-before-products-count .js-basket-sidebar-price-count",
        );
        orderingSidebarDiscount.innerHTML = lengthProduct.amount_before_discount;
      }

      //вставляем новые полученные данные скидки корзины
      const discount = document.querySelector(".js-before-count .js-basket-sidebar-price-count");
      if (lengthProduct.discount) {
        discount.innerHTML = lengthProduct.discount;
      }

      //вставляем новые полученные данные итога корзины
      const orderingSidebar = document.querySelector(".js-basket-sidebar-total");
      orderingSidebar.innerHTML = lengthProduct.amount;

      //вставляем новые полученные данные веса товаров
      const weightProducts = document.querySelector(".js-basket-weight");
      weightProducts.innerHTML = lengthProduct.weight;

      //вставляем новые полученные данные объема товаров
      const volumeProducts = document.querySelector(".js-basket-volume");
      volumeProducts.innerHTML = lengthProduct.volume;
    })
    .catch((err) => {
      console.error(err);
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    })
    .finally(() => {
      isFetching = false;
      loader(false);
    });
};

/**
 * Удаляет элемент из корзины.
 *
 * @param {number} idDeleteProduct - Идентификатор удаляемого продукта
 */
/**
 * Удаляет элемент из корзины.
 *
 * @param {number} idDeleteProduct - Идентификатор удаляемого продукта
 */
export const deleteBasketItem = async (idDeleteProduct) => {
  if (isFetching === true) {
    return;
  }
  isFetching = true;

  try {
    const response = await fetch("/ajax/cart/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: idDeleteProduct }),
    });
    const data = await response.json();
    renderTotal(await getTotalInfo());
    const deletedItem = document.querySelector(`.cart-page-product[data-id="${data.id}"]`);
    deletedItem && deletedItem.remove();
  } catch (err) {
    console.error(err);
    makeNotification.error({
      content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
    });
  } finally {
    isFetching = false;
  }
};

/**
 * Отправляет запрос по URL и обрабатывает ответ, перенаправляя на другой URL, если он предоставлен.
 *
 * @param {string} urlBySend - URL, на который отправляется запрос.
 * @param {string} urlByRedirect - URL, на который происходит перенаправление после завершения запроса, если предоставлен.
 * @return {void}
 */
export const sendUrl = (urlBySend, urlByRedirect) => {
  //перехватываем несколько запросов на сервер
  if (isFetching === true) {
    return;
  }
  isFetching = true;
  loader(true);
  fetch(urlBySend, {
    method: "GET",
  })
    .then(() => {
      location.href = urlByRedirect || urlBySend;
    })
    .catch((err) => {
      console.error(err);
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    })
    .finally(() => {
      isFetching = false;
      loader(false);
    });
};

export const favoriteCheck = () => {
  //перехватываем несколько запросов на сервер
  if (isFetching === true) {
    return;
  }
  isFetching = true;
  loader(true);
  fetch(favoriteUrl, {
    method: "GET",
  })
    .then((data) => {
      if (data.checked) {
        console.log("зарегистрирован");
      } else {
        console.error("не зарегистрирован");

        if (document.querySelector(".js-popup-favorite")) {
          document.querySelector(".js-popup-favorite").click();
        }
      }
    })
    .catch((err) => {
      console.error(err);
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    })
    .finally(() => {
      isFetching = false;
      loader(false);
    });
};

export const compareCheck = () => {
  //перехватываем несколько запросов на сервер
  if (isFetching === true) {
    return;
  }
  isFetching = true;
  loader(true);
  fetch(favoriteUrl, {
    method: "GET",
  })
    .then((data) => {
      if (data.checked) {
        console.log("зарегистрирован");
      } else {
        console.error("не зарегистрирован");

        if (document.querySelector(".js-popup-compare")) {
          document.querySelector(".js-popup-compare").click();
        }
      }
    })
    .catch((err) => {
      console.error(err);
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    })
    .finally(() => {
      isFetching = false;
      loader(false);
    });
};

export const getProductsList = () => {
  if (isFetching === true) {
    return;
  }
  isFetching = true;
  loader(true, ".cart-page__products-list");

  // TODO: При интеграции timeout убрать. Сейчас он нужен чтобы не усложнять логику мока
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/ajax/cart/list")
        .then((data) => data.json())
        .then((result) => {
          loader(false, ".cart-page__products-list");
          resolve(result);
        })
        .catch((error) => {
          reject(error);
          makeNotification.error({
            content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
          });
        })
        .finally(() => {
          isFetching = false;
        });
    }, 2000);
  });
};

export const changeProductQuantity = async ({ id, quantity }) => {
  if (isFetching === true) {
    return;
  }
  isFetching = true;

  try {
    const response = await fetch("/ajax/cart/quantity/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id, quantity }),
    });
    const data = await response.json();
    renderTotal(await getTotalInfo());
    return data;
  } catch (err) {
    makeNotification.error({
      content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
    });
    throw err;
  } finally {
    isFetching = false;
  }
};

/**
 * Получает информацию об итоговых цифрах с сервера и управляет отображением блока "Итого".
 *
 * @return {Promise} Промис, который разрешается информацией с итоговыми цифрами или отклоняется с ошибкой.
 */
export const getTotalInfo = () => {
  loader(true, ".basket-sidebar");

  // TODO: При интеграции timeout убрать. Сейчас он нужен чтобы не усложнять логику мока
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/ajax/cart/total-info")
        .then((data) => data.json())
        .then((result) => {
          loader(false, ".basket-sidebar");
          resolve(result);
        })
        .catch((error) => {
          reject(error);
          makeNotification.error({
            content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
          });
        });
    }, 2000);
  });
};

export const getAdvancedInfo = (value) => {
  loader(true, ".basket-sidebar");

  // TODO: При интеграции timeout убрать. Сейчас он нужен чтобы не усложнять логику мока
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/ajax/cart/lifted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ lift: value }),
      })
        .then((data) => data.json())
        .then((result) => {
          loader(false, ".basket-sidebar");
          resolve(result);
        })
        .catch((error) => {
          reject(error);
          makeNotification.error({
            content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
          });
        });
    }, 2000);
  });
};
