<?php

/**
 * Блок шапки сайта
 */

$isIndexPage = $this->isIndexPage ?? false;
?>
<header class="header">
  <div class="container">
    <div class="header__row">
      <?php if (isset($isIndexPage)): ?>
        <span class="logo header__logo">
          <img class="logo__icon" src="assets/img/logo__main.svg" alt="Логотип компании" />
        </span>
      <?php else : ?>
        <a class="logo header__logo" href="/">
          <img class="logo__icon" src="assets/img/logo__main.svg" alt="Логотип компании" />
        </a>
      <?php endif ; ?>

      <nav class="header__nav">
        <div class="header__nav-item"><span class="main-nav-link js-submenu-btn" href="#" data-menu="catalog">Мебель</span></div>
        <div class="header__nav-item"><span class="main-nav-link js-submenu-btn" href="#" data-menu="laptop">Оборудование</span></div>
        <div class="header__nav-item"><span class="main-nav-link js-submenu-btn" href="#" data-menu="interior">Интерьеры</span></div>
        <div class="header__nav-item"><span class="main-nav-link js-submenu-btn" href="#" data-menu="company">О компании</span></div>
      </nav>
      <div class="header__info-links"><a class="header__info-link header__phone" href="tel: 84951205391">+7 (495) 120-53-91</a><a class="header__info-link header__messangers-icon js-submenu-btn" href="#" data-menu="messangers"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__messangers"></use></svg></span></a>
        <div class="header__search"><a class="header__info-link js-search-modal" href="#"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__search"></use></svg></span></a>
          <div class="header__search-wrap">
            <form class="header__search-form"><span class="header__search-title">Я ищу</span><input class="header__search-input js-search-input" type="text" name="" placeholder="Начните вводить название товара " />
              <div class="header__search-btns"><button class="header__search-btn header__info-link"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__search"></use></svg></span></button><button class="header__search-btn header__info-link js-search-modal"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__menu-close"></use></svg></span></button></div>
            </form>
          </div>
        </div><a class="header__info-link js-popup-auth" href="#"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__user"></use></svg></span></a><a class="header__info-link basket-link" href="./cart.html"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__basket"></use></svg></span>
          <div class="basket-link__count">0</div>
        </a><button class="header__info-link header__burger js-header-burger-open"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__burger"></use></svg></span></button>
      </div>
    </div>
  </div>
  <div class="header__submenu submenu">
    <div class="submenu__wrap">
      <div class="container">
        <div class="submenu__top"><button class="submenu__back-btn js-submenu-back-btn"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__back-link"></use></svg></span></button><a class="logo header__logo" href="/"><img class="logo__icon" src="./assets/img/logo__main.svg" alt="" /></a>
          <div class="header__info-link js-header-burger-close"><span class="wrap-icon"><svg class="icon"><use href="assets/img/svgSprite.svg#icon__menu-close"></use></svg></span></div>
        </div>
      </div>
      <div class="submenu__scroll-wrap">
        <div class="container">
          <div class="header__tabs-wrap header__tabs tabs">
            <div class="submenu__tabs-labels tabs__labels">
              <div class="submenu__tab-link tabs__label tabs__label--active" data-href="#catalog">Мебель</div>
              <div class="submenu__tab-link tabs__label" data-href="#laptop">Оборудование</div>
              <div class="submenu__tab-link tabs__label" data-href="#interior">Интерьеры</div>
              <div class="submenu__tab-link tabs__label" data-href="#company">О компании</div>
            </div>
            <div class="tabs__panes">
              <div class="header__tabs-pane tabs__pane tabs__pane--active" id="catalog">
                <div class="submenu__info-links">
                  <div class="header__tabs tabs js-submenu-tabs">
                    <div class="header__tabs-labels tabs__labels js-tabs-labels">
                      <div class="submenu__tab-link-label tabs__label menu-link tabs__label--active js-submenu-tabs-inner-btn" data-href="#tab1">
                        <div class="submenu__tab-link-title">
                          <div class="wrap-icon"><svg class="icon">
                              <use href="assets/img/svgSprite.svg#icon__office"></use>
                            </svg></div>Мебель для персонала
                        </div>
                        <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                            <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                          </svg></div>
                      </div>
                      <div class="submenu__tab-link-label tabs__label menu-link tabs__label--active js-submenu-tabs-inner-btn" data-href="#tab2">
                        <div class="submenu__tab-link-title">
                          <div class="wrap-icon"><svg class="icon">
                              <use href="assets/img/svgSprite.svg#icon__cabinet"></use>
                            </svg></div>Кабинеты руководителей
                        </div>
                        <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                            <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                          </svg></div>
                      </div>
                      <div class="submenu__tab-link-label tabs__label menu-link tabs__label--active js-submenu-tabs-inner-btn" data-href="#tab3">
                        <div class="submenu__tab-link-title">
                          <div class="wrap-icon"><svg class="icon">
                              <use href="assets/img/svgSprite.svg#icon__chair"></use>
                            </svg></div>Кресла и стулья
                        </div>
                        <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                            <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                          </svg></div>
                      </div>
                      <div class="submenu__tab-link-label tabs__label menu-link tabs__label--active js-submenu-tabs-inner-btn" data-href="#tab4">
                        <div class="submenu__tab-link-title">
                          <div class="wrap-icon"><svg class="icon">
                              <use href="assets/img/svgSprite.svg#icon__table"></use>
                            </svg></div>Переговорные столы
                        </div>
                        <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                            <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                          </svg></div>
                      </div>
                      <div class="submenu__tab-link-label tabs__label menu-link tabs__label--active js-submenu-tabs-inner-btn" data-href="#tab5">
                        <div class="submenu__tab-link-title">
                          <div class="wrap-icon"><svg class="icon">
                              <use href="assets/img/svgSprite.svg#icon__sofax"></use>
                            </svg></div>Мягкая офисная мебель
                        </div>
                        <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                            <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                          </svg></div>
                      </div>
                      <div class="submenu__tab-link-label tabs__label menu-link tabs__label--active js-submenu-tabs-inner-btn" data-href="#tab6">
                        <div class="submenu__tab-link-title">
                          <div class="wrap-icon"><svg class="icon">
                              <use href="assets/img/svgSprite.svg#icon__kitchen"></use>
                            </svg></div>Офисные кухни
                        </div>
                        <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                            <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                          </svg></div>
                      </div>
                      <div class="submenu__tab-link-label tabs__label menu-link tabs__label--active js-submenu-tabs-inner-btn" data-href="#tab7">
                        <div class="submenu__tab-link-title">
                          <div class="wrap-icon"><svg class="icon">
                              <use href="assets/img/svgSprite.svg#icon__reception"></use>
                            </svg></div>Ресепшены
                        </div>
                        <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                            <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                          </svg></div>
                      </div>
                      <div class="submenu__tab-link-label tabs__label menu-link tabs__label--active js-submenu-tabs-inner-btn" data-href="#tab8">
                        <div class="submenu__tab-link-title">
                          <div class="wrap-icon"><svg class="icon">
                              <use href="assets/img/svgSprite.svg#icon__safe"></use>
                            </svg></div>Металлическая мебель
                        </div>
                        <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                            <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                          </svg></div>
                      </div>
                    </div>
                    <div class="submenu__panes-inner tabs__panes js-tabs-panes">
                      <div class="header__tabs-pane tabs__pane tabs__pane--active" id="tab1"><span class="submenu__pane-title">Мебель для персонала</span>
                        <div class="submenu__pane-row">
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные столы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Прямые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Угловые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Письменные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Рабочие</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С тумбой</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Недорого</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные тумбы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Подкатные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Приставные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С замком</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные шкафы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для документов</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для одежды</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Закрытые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Со стеклом</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Двухстворчатые</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="header__tabs-pane tabs__pane" id="tab2"><span class="submenu__pane-title">Кабинеты руководителей</span>
                        <div class="submenu__pane-row">
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные столы<span class="header__tab-link-count">2</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Прямые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Угловые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Письменные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Рабочие</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С тумбой</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные тумбы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Подкатные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Приставные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С замком</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные шкафы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для документов</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для одежды</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Закрытые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Со стеклом</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Двухстворчатые</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="header__tabs-pane tabs__pane" id="tab3"><span class="submenu__pane-title">Кресла и стулья</span>
                        <div class="submenu__pane-row">
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные столы<span class="header__tab-link-count">3</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Прямые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Угловые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Письменные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Рабочие</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С тумбой</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные тумбы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Подкатные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Приставные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С замком</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные шкафы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для документов</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для одежды</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Закрытые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Со стеклом</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Двухстворчатые</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="header__tabs-pane tabs__pane" id="tab4"><span class="submenu__pane-title">Переговорные столы</span>
                        <div class="submenu__pane-row">
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные столы<span class="header__tab-link-count">4</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Прямые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Угловые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Письменные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Рабочие</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С тумбой</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные тумбы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Подкатные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Приставные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С замком</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные шкафы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для документов</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для одежды</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Закрытые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Со стеклом</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Двухстворчатые</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="header__tabs-pane tabs__pane" id="tab5"><span class="submenu__pane-title">Мягкая офисная мебель</span>
                        <div class="submenu__pane-row">
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные столы<span class="header__tab-link-count">5</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Прямые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Угловые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Письменные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Рабочие</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С тумбой</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные тумбы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Подкатные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Приставные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С замком</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные шкафы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для документов</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для одежды</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Закрытые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Со стеклом</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Двухстворчатые</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="header__tabs-pane tabs__pane" id="tab6"><span class="submenu__pane-title">Офисные кухни</span>
                        <div class="submenu__pane-row">
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные столы<span class="header__tab-link-count">6</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Прямые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Угловые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Письменные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Рабочие</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С тумбой</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные тумбы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Подкатные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Приставные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С замком</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные шкафы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для документов</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для одежды</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Закрытые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Со стеклом</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Двухстворчатые</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="header__tabs-pane tabs__pane" id="tab7"><span class="submenu__pane-title">Ресепшены</span>
                        <div class="submenu__pane-row">
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные столы<span class="header__tab-link-count">7</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Прямые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Угловые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Письменные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Рабочие</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С тумбой</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные тумбы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Подкатные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Приставные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С замком</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные шкафы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для документов</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для одежды</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Закрытые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Со стеклом</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Двухстворчатые</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="header__tabs-pane tabs__pane" id="tab8"><span class="submenu__pane-title">Металлическая мебель</span>
                        <div class="submenu__pane-row">
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные столы<span class="header__tab-link-count">8</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Прямые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Угловые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Письменные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Рабочие</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С тумбой</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные тумбы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Подкатные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Приставные</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">С замком</a></li>
                            </ul>
                          </div>
                          <div class="header__menu-col"><a class="header__tab-link menu-link" href="#">Офисные шкафы<span class="header__tab-link-count">356</span></a>
                            <ul class="header__tab-ul">
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для документов</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Для одежды</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Закрытые</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Со стеклом</a></li>
                              <li class="header__tab-li"><a class="main-second-link" href="#">Двухстворчатые</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="header__tabs-pane tabs__pane" id="laptop">
                <div class="submenu__info-links header-info-links"><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__laptop"></use>
                      </svg></div>Компьютеры и ноутбуки
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__keyboard"></use>
                      </svg></div>Периферия
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__servers"></use>
                      </svg></div>Серверное оборудование
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__printer"></use>
                      </svg></div>Оргтехника
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__appliance"></use>
                      </svg></div>Презентационное оборудование
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__processor"></use>
                      </svg></div>Комплектующие для ПК
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__network"></use>
                      </svg></div>Сетевое оборудование
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__microphone"></use>
                      </svg></div>Мультимедийное оборудование
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__phone-ofice"></use>
                      </svg></div>Офисное оборудование
                  </a></div>
              </div>
              <div class="header__tabs-pane tabs__pane" id="interior">
                <div class="submenu__info-links header-info-links"><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__partition"></use>
                      </svg></div>Офисные перегородки
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__ceiling-systems"></use>
                      </svg></div>Потолочные системы
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__lamp"></use>
                      </svg></div>Освещение
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__macro"></use>
                      </svg></div> Озеленение
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__decor"></use>
                      </svg></div>Аксессуары и декор
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__panels"></use>
                      </svg></div>Стеновые панели
                  </a><a class="header-info-links__item menu-link" href="#">
                    <div class="wrap-icon"><svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__block"></use>
                      </svg></div>Напольные покрытия
                  </a></div>
              </div>
              <div class="header__tabs-pane tabs__pane" id="company">
                <div class="submenu__info-links header-info-links header-info-links--company">
                  <div class="header__menu-col js-submenu-tabs-company"><a class="submenu__tab-link-label header__tab-link menu-link js-submenu-tabs-inner-company-btn" href="#"><span>О нас</span>
                      <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                          <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                        </svg></div>
                    </a>
                    <div class="submenu__panes-inner js-tabs-panes-company">
                      <div class="submenu__pane-title">О нас</div>
                      <ul class="header__tab-ul header__tab-ul--hide">
                        <li class="header__tab-li"><a class="main-second-link" href="#">Наша миссия</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Наша команда</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Наши работы</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Работа в Prime Wood</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Контакты</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Блог и Новости</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="header__menu-col js-submenu-tabs-company"><a class="submenu__tab-link-label header__tab-link menu-link js-submenu-tabs-inner-company-btn" href="#"><span>Услуги</span>
                      <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                          <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                        </svg></div>
                    </a>
                    <div class="submenu__panes-inner js-tabs-panes-company">
                      <div class="submenu__pane-title">Услуги</div>
                      <ul class="header__tab-ul header__tab-ul--hide">
                        <li class="header__tab-li"><a class="main-second-link" href="#">Дизайн-проект</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Мебель на заказ</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Доставка и сборка</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Выезд специалиста</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Доставка день-в-день</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Образцы материалов</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Вывоз старой мебели</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="header__menu-col js-submenu-tabs-company"><a class="submenu__tab-link-label header__tab-link menu-link js-submenu-tabs-inner-company-btn" href="#"><span>Сервисы</span>
                      <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                          <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                        </svg></div>
                    </a>
                    <div class="submenu__panes-inner js-tabs-panes-company">
                      <div class="submenu__pane-title">Сервисы</div>
                      <ul class="header__tab-ul header__tab-ul--hide">
                        <li class="header__tab-li"><a class="main-second-link" href="#">Проектный менеджмент</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Релокация офиса</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Реконфигурация офиса</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Тест-драйв мебели</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Премиальное обслуживание</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Консолидация поставок</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Калькулятор</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="header__menu-col js-submenu-tabs-company"><a class="submenu__tab-link-label header__tab-link menu-link js-submenu-tabs-inner-company-btn" href="#"><span>Партнерам</span>
                      <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                          <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                        </svg></div>
                    </a>
                    <div class="submenu__panes-inner js-tabs-panes-company">
                      <div class="submenu__pane-title">Партнерам</div>
                      <ul class="header__tab-ul header__tab-ul--hide">
                        <li class="header__tab-li"><a class="main-second-link" href="#">Госзаказчикам</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Дизайнерам</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Брокерам и риэлторам</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="header__menu-col js-submenu-tabs-company"><a class="submenu__tab-link-label header__tab-link menu-link js-submenu-tabs-inner-company-btn" href="#"><span>Наши проекты</span>
                      <div class="wrap-icon wrap-icon--tab-icon"><svg class="icon">
                          <use href="assets/img/svgSprite.svg#icon__right-tab"></use>
                        </svg></div>
                    </a>
                    <div class="submenu__panes-inner js-tabs-panes-company">
                      <div class="submenu__pane-title">Наши проекты</div>
                      <ul class="header__tab-ul header__tab-ul--hide">
                        <li class="header__tab-li"><a class="main-second-link" href="#">Поиск и подбор помещений</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Архитектурное бюро</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Trade In старой мебели</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Дайджест офисного мира</a></li>
                        <li class="header__tab-li"><a class="main-second-link" href="#">Сообщество дизайнеров</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="submenu__wrap-bottom">
          <div class="container">
            <div class="submenu__bottom">
              <div class="submenu__wrap-bottom-city city-info">
                <div class="city-info__title">Ваш город</div><a class="city-info__icon menu-link js-popup-city" href="#">
                  <div class="wrap-icon"><svg class="icon">
                      <use href="assets/img/svgSprite.svg#icon__location"></use>
                    </svg></div>Москва
                </a>
              </div><a class="menu-link" href="tel: +74951205391">
                <div class="wrap-icon"><svg class="icon">
                    <use href="assets/img/svgSprite.svg#icon__messangers"></use>
                  </svg></div>+7 (495) 120-53-91
              </a>
            </div>
            <div class="header-info-links-messangers header-info-links header-info-links--center"><a class="header-info-links__item menu-link" href="#">
                <div class="wrap-icon"><svg class="icon">
                    <use href="assets/img/svgSprite.svg#icon__call"></use>
                  </svg></div>Заказать звонок
              </a><a class="header-info-links__item menu-link" href="mailto: test@mail.ru">
                <div class="wrap-icon"><svg class="icon">
                    <use href="assets/img/svgSprite.svg#icon__mail"></use>
                  </svg></div>Написать нам
              </a><a class="header-info-links__item menu-link" href="#">
                <div class="wrap-icon"><svg class="icon">
                    <use href="assets/img/svgSprite.svg#icon__online-chat"></use>
                  </svg></div>On-line чат
              </a><a class="header-info-links__item menu-link" href="#">
                <div class="wrap-icon"><svg class="icon">
                    <use href="assets/img/svgSprite.svg#icon__whatsapp"></use>
                  </svg></div>Whats app
              </a><a class="header-info-links__item menu-link" href="#">
                <div class="wrap-icon"><svg class="icon">
                    <use href="assets/img/svgSprite.svg#icon__telegram"></use>
                  </svg></div>Telegram
              </a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
