import ready from "../utils/documentReady.js";
import SimpleBar from "simplebar";

ready(function () {
  Array.prototype.forEach.call(
    document.querySelectorAll(
      ".panel__scroll, .nav__scroll, .product-card__scroll, .ss-list, .form__scroll, .products__filter-scroll",
    ),
    (el) => new SimpleBar(el, { autoHide: false }),
  );
});
