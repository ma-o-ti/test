import {
  assemblyServiceHandler,
  deliveryShippingHandler,
  advancedSelectHandler,
  listHandler,
  promoCodeHandler,
  uploadCompanyCardHandler,
} from "./handlers";

export const init = () => {
  const productList = document.querySelector(".js-products-list");
  const promoCodeBlock = document.querySelector(".js-promocode-block");
  const deliveryShippingBlock = document.getElementById("shipping-delivery");
  const pickupShippingBlock = document.getElementById("shipping-pickup");
  const assemblyServiceInput = document.querySelector(".js-assembly-basket");
  const liftingSelect = document.querySelector("[data-sidebar='js-lifting-basket']");
  const liftTypeSelect = document.querySelector(".select[name='lift']");
  const liftSelect = document.querySelector("[data-sidebar='js-assembly-basket']");
  const uploadCompanyCard = document.querySelector(".js-upload-company-card");

  productList.addEventListener("click", listHandler);
  promoCodeBlock.addEventListener("submit", promoCodeHandler);
  deliveryShippingBlock.addEventListener("change", deliveryShippingHandler);
  pickupShippingBlock.addEventListener("change", deliveryShippingHandler);
  assemblyServiceInput.addEventListener("change", assemblyServiceHandler);
  liftingSelect.addEventListener("change", advancedSelectHandler);
  liftTypeSelect.addEventListener("change", advancedSelectHandler);
  liftSelect.addEventListener("change", advancedSelectHandler);
  uploadCompanyCard.addEventListener("change", uploadCompanyCardHandler);
};
