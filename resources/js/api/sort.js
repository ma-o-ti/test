import { ERROR_MASSAGE, filterUrl } from "./path_ajax";

export const sendSortParameter = (value) => {
  fetch(filterUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(value),
  })
    .then(() => {
      location.reload();
    })
    .catch((err) => {
      console.error(err);
      makeNotification.error({
        content: `<p><span class='notification__title'>${ERROR_MASSAGE}</span></p>`,
      });
    });
};
