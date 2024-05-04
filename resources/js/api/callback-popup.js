export function handleCallBackForm() {
  document.addEventListener("DOMContentLoaded", () => {
    const callbackForms = document.querySelectorAll(".js-callback-form");

    function handleFormSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      fetch("/ajax/contacts-for-callback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      })
        .then((r) => r.status === 200)
        .catch((err) => console.error(err))
        .finally(() => {
          form.closest(".popup--consultation").querySelector(".js-popup-close-btn").click();
          form.reset();
        });
    }

    callbackForms.forEach((elem) => elem.addEventListener("submit", handleFormSubmit));
  });
}
