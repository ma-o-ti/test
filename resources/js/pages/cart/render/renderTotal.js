/**
 * Рендерит общее количество, подитог, общую скидку, общую доставку, общий подъем, общую сборку, общую цену, общий вес и общий объем на странице.
 *
 * @param {Object} data - объект данных, содержащий count, sub_total, discount, shipping, lifting, assembly, total, weight и volume
 * @return {void}
 */
export const renderTotal = (data) => {
  const elements = {
    "total-count": data.count,
    "sub-total": data.sub_total.toLocaleString(),
    "total-discount": data.discount.toLocaleString(),
    "total-delivery": data.delivery.toLocaleString(),
    "total-lifting": data.lifting.toLocaleString(),
    "total-assembly": data.assembly.toLocaleString(),
    "total-price": data.total.toLocaleString(),
    "total-weight": data.weight,
    "total-volume": data.volume,
  };

  Object.keys(elements).forEach((key) => {
    const element = document.getElementById(key);
    if (element) {
      element.innerText = elements[key];
    }
  });
};
