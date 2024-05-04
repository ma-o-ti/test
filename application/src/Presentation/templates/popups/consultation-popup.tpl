<div class="popup popup--consultation">
  <div class="popup__inner">
    <div class="popup__background js-popup-background">
      <div class="popup__container js-popup-container">
        <div class="popup__content"><button class="popup__close-btn js-popup-close-btn"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__menu-close"></use></svg></span></button>
          <div class="popup__main">
            <p class="popup__title headline-h3">Оставить заявку на консультацию</p>
            <form class="form js-validation js-callback-form">
              <div class="form__main">
                <div class="form__row">
                  <div class="form__col x12"><input class="form__field" type="text" name="name" placeholder="Имя *" required="required" /></div>
                  <div class="form__col x6"><input class="form__field" type="tel" name="phone" placeholder="+7 (999) 999-99-99" pattern=".{18,18}" data-validation-text="Телефон должен быть по примеру: +7 (9XX) XXX-XX-XX" /></div>
                  <div class="form__col x6"><input class="form__field" type="email" name="email" required="required" placeholder="Электронная почта *" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" data-validation-text="Адрес электронной почты должен быть по примеру: example@mail.com" /></div>
                </div>
              </div>
              <div class="form__footer">
                <div class="form__row">
                  <div class="form__col x5"><button class="form__submit main-btn main-btn--big" type="submit">Отправить</button></div>
                  <div class="form__col x7 flex items-center">
                    <p class="form__note">Нажимая на кнопку, вы подтверждаете свое согласие на обработку персональных данных.</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
