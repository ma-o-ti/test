<div class="popup  popup--auth popup-auth" id="auth-popup">
  <div class="popup__inner">
    <div class="popup__background js-popup-background">
      <div class="popup__container js-popup-container">
        <div class="popup__content">
          <div class="popup__header">
            <p class="popup__title headline-h3">Вход или регистрация</p><button class="popup__close-btn js-popup-close-btn"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__menu-close"></use></svg></span></button>
          </div>
          <div class="popup__main">
            <div class="popup__content" id="auth-popup-tel">
              <p class="popup-auth__text">Мы отправим вам СМС с кодом на указанный телефон</p><input class="popup-auth__tel" type="tel" name="auth-tel" placeholder="+7 (___) ___-__-__" /><button class="main-btn main-btn--big popup__btn" type="button">Получить код</button>
            </div>
            <div class="popup__content hidden" id="auth-popup-verification">
              <p class="popup-auth__text">Введите код из СМС, которое мы отправили на номер</p>
              <div class="popup-auth__tel-example"></div><button class="popup-auth__reset" type="button">Изменить номер</button><input class="popup-auth__verification-code" type="text" name="auth-code" placeholder="Введите код подтверждения" />
              <p class="popup-auth__verification-warning">Получить новый код можно через</p><button class="main-btn main-btn--big popup-auth__verification-button">Получить новый код</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
