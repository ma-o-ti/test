/*
	Описание: API для вывода различных уведомлений(Neutral, Info, Success, Warning, Error).
    Опции:
        * type — тип уведомления, есть несколько значений: toast(по умолчанию), message, alert;
        * position — определяет позицию добавляемого уведомления: bottom-right, bottom-left, top-right, top-left;
        * icon — скрыть/показать иконку;
        * container — контейнер, поверх которого необходимо показать уведомление(относится к типу "message" и "alert");
        * content — контент уведомления(в значениях можно указать полноценную разметку);
        * addClass — добавить доп.классы для уведомления(можно указать несколько классов через пробел);
        * notificationItem — уведомление, которое необходимо скрыть(относится к методу makeNotification.hide()).
*/

const makeNotification = (() => {
  class Core {
    constructor({
      type,
      icon,
      position,
      container,
      content,
      addClass,
      notificationItem,
      interactive,
    }) {
      this.type = type || "toast";
      this.icon = icon || true;
      this.position = position || "top-right";
      this.content = content || "";
      this.container = container || false;
      this.addClass = addClass ? addClass.split(" ") : false;
      this.notificationItem = notificationItem || false;
      this.interactive = interactive || false;

      if (this.container !== false) {
        if (typeof this.container === "object") this.container = container || false;
        if (typeof this.container === "string")
          this.container = document.querySelector(container) || false;
      }

      if (this.notificationItem !== false) {
        if (typeof this.notificationItem === "object")
          this.notificationItem = notificationItem || false;
        if (typeof this.notificationItem === "string")
          this.notificationItem = document.querySelector(notificationItem) || false;
      }

      this.init();
    }

    init() {
      this.variables();
      this.build_wrapper();
      this.build_notification();
    }

    variables() {
      this.typeArray = ["toast"];
      this.wrapper = document.querySelector(`.wrapper-notification--${this.type}`) || false;
    }

    // build wrapper: для toast и message соберём отдельные обёртки
    build_wrapper() {
      let wrapperToast = document.querySelector(".wrapper-notification--toast") || false;

      // toast
      if (this.type == "toast" && wrapperToast == false) {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("wrapper-notification");
        this.wrapper.classList.add(`wrapper-notification--${this.type}`);

        document.body.insertAdjacentHTML("beforeend", this.wrapper.outerHTML);

        this.wrapper = document.querySelector(".wrapper-notification--toast");
      }

      // message or message-window
      if (this.type == "message" || this.type == "message-window") {
        if (this.container !== false) {
          this.wrapper =
            this.container.querySelector(`.wrapper-notification--${this.type}`) || false;

          if (this.wrapper == false) {
            this.wrapper = document.createElement("div");
            this.wrapper.classList.add("wrapper-notification");
            this.wrapper.classList.add(`wrapper-notification--${this.type}`);

            this.container.classList.add("relative");
            this.container.insertAdjacentHTML("beforeend", this.wrapper.outerHTML);

            this.wrapper =
              this.container.querySelector(`.wrapper-notification--${this.type}`) || false;
          }
        }
      }

      this.wrapper.classList.remove(
        `wrapper-notification--${this.wrapper.getAttribute("data-notification-position")}`,
      );
      this.wrapper.classList.add(`wrapper-notification--${this.position}`);
      this.wrapper.setAttribute("data-notification-position", this.position);

      // event notification
      if (this.type == "toast" || this.type == "message-window") {
        this.wrapper.addEventListener("click", this.listener_wrapper.bind(this), false);
      }
    }

    // build notification(собираем уведомление)
    build_notification() {
      this.btnClose = "";

      // button close
      if (this.type == "toast" || this.type == "message-window") {
        if (this.interactive == false) {
          this.btnClose = `
            <button
                type="button"
                title="Закрыть уведомление"
                aria-label="Закрыть уведомление"
                class="notification__close"
						>
							<svg width="513" height="513" viewBox="0 0 513 513" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M7.50619 7.50619C17.1811 -2.16873 32.8673 -2.16873 42.5422 7.50619L504.994 469.958C514.669 479.633 514.669 495.319 504.994 504.994C495.319 514.669 479.633 514.669 469.958 504.994L7.50619 42.5422C-2.16873 32.8673 -2.16873 17.1811 7.50619 7.50619Z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M504.994 7.50619C514.669 17.1811 514.669 32.8673 504.994 42.5422L42.5422 504.994C32.8673 514.669 17.1811 514.669 7.50619 504.994C-2.16873 495.319 -2.16873 479.633 7.50619 469.958L469.958 7.50619C479.633 -2.16873 495.319 -2.16873 504.994 7.50619Z"/>
							</svg>
            </button>`;
        }
      }

      // notification
      this.elementNotification = document.createElement("div");
      this.elementNotification.classList.add("notification");
      this.elementNotification.innerHTML = `<div class="notification__icon"></div><div class="notification__text">${this.content}</div>${this.btnClose}`;

      // addClass
      if (this.addClass !== false) {
        this.addClass.forEach((classItem) => this.elementNotification.classList.add(classItem));
      }
    }

    listener_wrapper(event) {
      let target = event.target,
        notification = target.closest(".notification") || false;

      if (this.interactive == false) {
        // close
        if (target.classList.contains("notification__close") == true && notification !== false) {
          notification.classList.remove("show");

          setTimeout(() => {
            notification.remove();
            if (this.wrapper.children.length == 0) this.wrapper.classList.remove("show");
          }, 168);
        }

        // wrapper-notification--message-window
        if (target.classList.contains("wrapper-notification--message-window") == true) {
          this.wrapper.classList.remove("show");
          Array.from(this.wrapper.children).forEach((children) => children.remove());
        }
      }
    }

    // выводим уведомление
    output_notification() {
      // toast и message
      if (this.wrapper !== false) {
        // show wrapper and display a notification
        this.wrapper.classList.add("show");
        this.wrapper.insertAdjacentHTML("afterbegin", this.elementNotification.outerHTML);

        // notification
        this.notification = this.wrapper.querySelector(".notification");

        // show notification
        setTimeout(() => this.notification.classList.add("show"), 50);

        // auto-hide(toast) notification
        if (this.type == "toast") {
          setTimeout(() => {
            this.notification.classList.remove("show");
            this.notification.remove();

            if (this.wrapper.children.length == 0) {
              this.wrapper.classList.remove("show");
            }
          }, 8000);
        }
      }

      // выведем для этого типа отдельный метод, т.к. у данного типа уведомлений нет обёртки
      if (this.type == "alert") {
        this.container.insertAdjacentHTML("beforeend", this.elementNotification.outerHTML);
      }
    }

    // метод: default
    method_default() {
      this.elementNotification.classList.add("notification--default");
      this.output_notification();
    }

    // метод: preloader
    method_preloader() {
      this.elementNotification.classList.add("notification--preloader");
      this.output_notification();
    }

    // метод: neutral
    method_neutral() {
      this.elementNotification.classList.add("notification--neutral");
      this.elementNotification.querySelector(".notification__icon").innerHTML = `
        <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M256 35.7209C134.343 35.7209 35.7209 134.343 35.7209 256C35.7209 377.657 134.343 476.279 256 476.279C377.657 476.279 476.279 377.657 476.279 256C476.279 134.343 377.657 35.7209 256 35.7209ZM0 256C0 114.615 114.615 0 256 0C397.385 0 512 114.615 512 256C512 397.385 397.385 512 256 512C114.615 512 0 397.385 0 256Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M256 142.884C265.864 142.884 273.86 150.88 273.86 160.744V256C273.86 265.864 265.864 273.86 256 273.86C246.136 273.86 238.14 265.864 238.14 256V160.744C238.14 150.88 246.136 142.884 256 142.884Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M238.14 351.256C238.14 341.392 246.136 333.395 256 333.395H256.238C266.102 333.395 274.099 341.392 274.099 351.256C274.099 361.12 266.102 369.116 256.238 369.116H256C246.136 369.116 238.14 361.12 238.14 351.256Z"/>
        </svg>`;
      this.output_notification();
    }

    // метод: success
    method_success() {
      this.elementNotification.classList.add("notification--success");
      this.elementNotification.querySelector(".notification__icon").innerHTML = `
        <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M345.654 54.791C302.264 35.4579 253.788 30.6685 207.455 41.1369C161.121 51.6054 119.413 76.7709 88.55 112.88C57.6873 148.99 39.3239 194.108 36.1984 241.506C33.073 288.905 45.353 336.044 71.207 375.893C97.061 415.742 135.104 446.167 179.662 462.628C224.219 479.09 272.905 480.708 318.457 467.239C364.009 453.771 403.987 425.939 432.429 387.893C460.87 349.848 476.252 303.628 476.279 256.126V234.227C476.279 224.363 484.275 216.367 494.139 216.367C504.004 216.367 512 224.363 512 234.227V256.136C511.968 311.341 494.093 365.066 461.039 409.281C427.985 453.496 381.524 485.842 328.585 501.494C275.646 517.147 219.066 515.267 167.282 496.136C115.499 477.004 71.2871 441.647 41.2406 395.335C11.194 349.024 -3.07734 294.241 0.554926 239.156C4.1872 184.071 25.5285 131.636 61.3959 89.6716C97.2634 47.7067 145.735 18.4603 199.582 6.29426C253.43 -5.87178 309.767 -0.305646 360.192 22.1625C369.202 26.1772 373.252 36.7359 369.237 45.746C365.222 54.7561 354.664 58.8057 345.654 54.791Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M506.762 52.9865C513.741 59.958 513.746 71.2666 506.775 78.245L268.635 316.623C265.287 319.975 260.743 321.859 256.004 321.86C251.266 321.861 246.721 319.979 243.371 316.629L171.929 245.187C164.954 238.212 164.954 226.904 171.929 219.929C178.904 212.954 190.212 212.954 197.187 219.929L255.994 278.735L481.504 52.9991C488.475 46.0207 499.784 46.0151 506.762 52.9865Z"/>
        </svg>`;
      this.output_notification();
    }

    // метод: warning
    method_warning() {
      this.elementNotification.classList.add("notification--warning");
      this.elementNotification.querySelector(".notification__icon").innerHTML = `
        <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M256 35.7209C134.343 35.7209 35.7209 134.343 35.7209 256C35.7209 377.657 134.343 476.279 256 476.279C377.657 476.279 476.279 377.657 476.279 256C476.279 134.343 377.657 35.7209 256 35.7209ZM0 256C0 114.615 114.615 0 256 0C397.385 0 512 114.615 512 256C512 397.385 397.385 512 256 512C114.615 512 0 397.385 0 256Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M256 142.884C265.864 142.884 273.86 150.88 273.86 160.744V256C273.86 265.864 265.864 273.86 256 273.86C246.136 273.86 238.14 265.864 238.14 256V160.744C238.14 150.88 246.136 142.884 256 142.884Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M238.14 351.256C238.14 341.392 246.136 333.395 256 333.395H256.238C266.102 333.395 274.099 341.392 274.099 351.256C274.099 361.12 266.102 369.116 256.238 369.116H256C246.136 369.116 238.14 361.12 238.14 351.256Z"/>
        </svg>`;
      this.output_notification();
    }

    // метод: error
    method_error() {
      this.elementNotification.classList.add("notification--error");
      this.elementNotification.querySelector(".notification__icon").innerHTML = `
        <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M256 35.7209C134.343 35.7209 35.7209 134.343 35.7209 256C35.7209 377.657 134.343 476.279 256 476.279C377.657 476.279 476.279 377.657 476.279 256C476.279 134.343 377.657 35.7209 256 35.7209ZM0 256C0 114.615 114.615 0 256 0C397.385 0 512 114.615 512 256C512 397.385 397.385 512 256 512C114.615 512 0 397.385 0 256Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M256 238.14C265.864 238.14 273.86 246.136 273.86 256V351.256C273.86 361.12 265.864 369.116 256 369.116C246.136 369.116 238.14 361.12 238.14 351.256V256C238.14 246.136 246.136 238.14 256 238.14Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M238.14 160.744C238.14 150.88 246.136 142.884 256 142.884H256.238C266.102 142.884 274.099 150.88 274.099 160.744C274.099 170.608 266.102 178.605 256.238 178.605H256C246.136 178.605 238.14 170.608 238.14 160.744Z"/>
        </svg>`;
      this.output_notification();
    }

    // метод: hide notification
    method_hide() {
      if (this.notificationItem !== false) {
        this.parent = this.notificationItem.closest(".wrapper-notification");

        this.notificationItem.classList.remove("show");

        setTimeout(() => {
          this.notificationItem.remove();
          if (this.parent.children.length == 0) this.parent.classList.remove("show");
        }, 168);
      }
    }
  }

  let active = null;

  // Init
  const init = () => {
    let options = {},
      wrapper = document.querySelector(".wrapper-notification") || false;

    if (wrapper == false) {
      active = new Core(options);
    }
  };

  // * Methods *

  // Hide notification
  const hide = (item) => {
    let options = {};

    options.notificationItem = item;

    active = new Core(options);
    active.method_hide();
  };

  // Default
  const defaults = (config) => {
    let options = config || {};

    active = new Core(options);
    active.method_default();
  };

  // Preloader
  const preloader = (config) => {
    let options = config || {};

    active = new Core(options);
    active.method_preloader();
  };

  // Neutral
  const neutral = (config) => {
    let options = config || {};

    active = new Core(options);
    active.method_neutral();
  };

  // Success
  const success = (config) => {
    let options = config || {};

    active = new Core(options);
    active.method_success();
  };

  // Warning
  const warning = (config) => {
    let options = config || {};

    active = new Core(options);
    active.method_warning();
  };

  // Error
  const error = (config) => {
    let options = config || {};

    active = new Core(options);
    active.method_error();
  };

  return {
    init,
    hide,
    defaults,
    preloader,
    neutral,
    success,
    warning,
    error,
  };
})();

window.makeNotification = makeNotification;

export default makeNotification;
