import { getProductsList, getTotalInfo } from "../../api/ajax-function";
import { renderList } from "./render/renderList";
import { init } from "./init";
import { renderTotal } from "./render/renderTotal";
import { renderService } from "./render/renderService";
import { renderDelivery } from "./render/renderDelivery";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".js-products-list");
  // const productCardTemplate
  getProductsList()
    .then((data) => renderList(data, container))
    .then(() => init());

  getTotalInfo().then((data) => {
    renderTotal(data);
    renderDelivery(data);
    renderService(data);
  });
});
