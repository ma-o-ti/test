export const renderDelivery = (data) => {
  const deliveryCostElem = document.querySelector(".js-delivery-cost");
  deliveryCostElem.innerText = data.delivery.toLocaleString();
};
