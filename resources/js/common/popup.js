export const initPopup = (popupClass, triggerBtn) => {
  // привязываем необходимые элементы
  const trigger = triggerBtn;
  const popup = document.querySelector(popupClass);
  const bodyElementHTML = document.body;
  const modalBackground = popup.querySelector(".js-popup-background");
  const modalClose = popup.querySelector(".js-popup-close-btn");

  // событие нажатия на триггер открытия модального окна
  if (trigger) {
    document.addEventListener("click", (evt) => {
      if (evt.target.closest(trigger)) {
        evt.preventDefault();
        // делаем модальное окно видимым
        modalBackground.style.display = "flex";
        bodyElementHTML.classList.add("lock");

        //закрываем главное меню, если оно открыто
        if (document.querySelector(".submenu").classList.contains("submenu--open")) {
          const menuTriggerClose = document.querySelector(".js-header-burger-close");
          menuTriggerClose.click();
        }
      }
    });
  }

  // открытие
  const handleShowPopup = () => {
    modalBackground.style.display = "flex";
    document.body.classList.add("lock");
  };

  // закрытие
  const handleClosePopup = () => {
    modalBackground.style.display = "none";
    bodyElementHTML.classList.remove("lock");
  };

  // нажатие на крестик закрытия модального окна
  modalClose && modalClose.addEventListener("click", handleClosePopup);

  // закрытие модального окна на зону вне окна
  modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
      handleClosePopup();
    }
  });

  popup.makePopup = { handleShowPopup, handleClosePopup };
};

export const initZoomPopup = (popupClass, triggerBtn) => {
  // привязываем необходимые элементы
  let currentSlideIndex;
  const popup = document.querySelector(popupClass);
  const bodyElementHTML = document.body;
  const modalBackground = popup.querySelector(".js-popup-background");
  const modalClose = popup.querySelector(".js-popup-close-btn");

  // событие нажатия на триггер открытия модального окна
  document.addEventListener("click", (evt) => {
    if (evt.target.closest(triggerBtn)) {
      // делаем модальное окно видимым
      modalBackground.style.display = "block";
      bodyElementHTML.classList.add("lock");
      const currentZoomBtn = evt.target.closest(triggerBtn);
      currentSlideIndex = currentZoomBtn.dataset.slideIndex;
    }
  });

  // закрытие
  const handleClosePopup = () => {
    modalBackground.style.display = "none";
    bodyElementHTML.classList.remove("lock");
  };

  // нажатие на крестик закрытия модального окна
  modalClose && modalClose.addEventListener("click", handleClosePopup);

  // закрытие модального окна на зону вне окна
  modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
      handleClosePopup();
    }
  });
};
