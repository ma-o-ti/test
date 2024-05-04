export const renderResetUploadButton = (entryPoint) => {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.classList.add("upload__close");
  button.innerHTML = `<svg class="icon">
                        <use href="assets/img/svgSprite.svg#icon__menu-close"></use>
                      </svg>`;
  button.addEventListener("click", ({ target }) => {
    if (target.classList.contains("upload__close") || target.closest(".upload__close")) {
      const input = entryPoint.querySelector(".js-upload-company-card");
      const text = entryPoint.querySelector(".upload__text");
      const DEFAULT_TEXT = "Загрузите карточку предприятия для оформления документов";

      input.value = "";
      text.innerText = DEFAULT_TEXT;
      button.remove();
    }
  });
  entryPoint.append(button);
};
