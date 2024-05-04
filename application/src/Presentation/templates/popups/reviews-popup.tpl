<div class="popup" id="reviews-popup">
  <div class="popup__inner">
    <div class="popup__background js-popup-background">
      <div class="popup__container js-popup-container">
        <div class="popup__content">
          <div class="popup__header">
            <p class="popup__title headline-h3">Добавить свой отзыв</p><button class="popup__close-btn js-popup-close-btn"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__menu-close"></use></svg></span></button>
          </div>
          <div class="popup__main">
            <form class="form js-validation">
              <div class="form__main">
                <div class="form__row">
                  <div class="form__col x12">
                    <div class="flex items-center justify-between"><span>Поставьте оценку</span>
                      <div class="star-rating-dynamic" style="--rating-color: #eeb83b">
                        <fieldset class="star-rating-dynamic__group" name="rating"><input class="star-rating-dynamic__field" type="radio" id="rating-dynamic-5" name="rating" value="5" /><label class="star-rating-dynamic__label" for="rating-dynamic-5" aria-label="Поставить количество звёзд: 5" title="Поставить количество звёзд: 5"></label><input class="star-rating-dynamic__field" type="radio" id="rating-dynamic-4" name="rating" value="4" /><label class="star-rating-dynamic__label" for="rating-dynamic-4" aria-label="Поставить количество звёзд: 4" title="Поставить количество звёзд: 4"></label><input class="star-rating-dynamic__field" type="radio" id="rating-dynamic-3" name="rating" value="3" /><label class="star-rating-dynamic__label" for="rating-dynamic-3" aria-label="Поставить количество звёзд: 3" title="Поставить количество звёзд: 3"></label><input class="star-rating-dynamic__field" type="radio" id="rating-dynamic-2" name="rating" value="2" /><label class="star-rating-dynamic__label" for="rating-dynamic-2" aria-label="Поставить количество звёзд: 2" title="Поставить количество звёзд: 2"></label><input class="star-rating-dynamic__field" type="radio" id="rating-dynamic-1" name="rating" value="1" /><label class="star-rating-dynamic__label" for="rating-dynamic-1" aria-label="Поставить количество звёзд: 1" title="Поставить количество звёзд: 1"></label></fieldset>
                      </div>
                    </div>
                  </div>
                  <div class="form__col x6"><input class="form__field" type="text" name="name" placeholder="Имя *" required></div>
                  <div class="form__col x6"><input class="form__field" type="email" name="email" required placeholder="Электронная почта *" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z0-9]{2,}" data-validation-text="Адрес электронной почты должен быть по примеру: example@mail.com"></div>
                  <div class="form__col x12"><textarea class="form__field" placeholder="Ваш текст" maxlength="100" rows="5"></textarea></div>
                  <div class="form__col x12"><label class="upload" aria-label="Добавить фото товара" title="Добавить фото товара"><input class="upload__field" type="file" accept="image/*" /><span class="upload__replace text-base"><svg class="upload__icon"><use href="assets/img/svgSprite.svg#icon__picture"></use></svg>Добавить фото товара</span></label></div>
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
