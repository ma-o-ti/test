<div class="popup" id="question-popup">
  <div class="popup__inner">
    <div class="popup__background js-popup-background">
      <div class="popup__container js-popup-container">
        <div class="popup__content">
          <div class="popup__header">
            <p class="popup__title headline-h3">Задать вопрос эксперту</p><button class="popup__close-btn js-popup-close-btn"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__menu-close"></use></svg></span></button>
          </div>
          <div class="popup__main">
            <figure class="quoting  quoting--form">
              <div class="quoting__row">
                <blockquote class="quoting__blockquote">Наши дизайнеры проработают правильную и эргономичную расстановку мебели для вашего помещения, при необходимости сделают 3D визуализацию.</blockquote>
                <figcaption class="quoting__author"><img class="quoting__pic" src="./img/woman.jpg" loading="lazy" />
                  <div class="quoting__desc"><span class="quoting__name">Алена Соколова</span><span class="quoting__type">Дизайнер интерьеров</span></div>
                </figcaption>
              </div>
            </figure>
            <form class="form js-validation" onsubmit="">
              <div class="form__main">
                <div class="form__row">
                  <div class="form__col x12"><input class="form__field" type="text" name="name" placeholder="Имя *" required></div>
                  <div class="form__col x6"><input class="form__field" type="tel" name="phone" placeholder="+7 (999) 999-99-99" pattern=".{18,18}" data-validation-text="Телефон должен быть по примеру: +7 (9XX) XXX-XX-XX"></div>
                  <div class="form__col x6"><input class="form__field" type="email" name="email" required placeholder="Электронная почта *" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z0-9]{2,}" data-validation-text="Адрес электронной почты должен быть по примеру: example@mail.com"></div>
                  <div class="form__col x12"><textarea class="form__field js-counter-field" placeholder="Ваш вопрос" maxlength="100" rows="5"></textarea></div>
                </div>
              </div>
              <div class="form__footer">
                <div class="form__row">
                  <div class="form__col x5"><button class="form__submit main-btn main-btn--big" type="submit">Задать вопрос</button></div>
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
