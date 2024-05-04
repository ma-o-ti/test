export function initSpoilerWrap() {
  const spoilerWrap = document.querySelectorAll(".spoiler-wrap");
  const spoilerWrapInner = document.querySelectorAll(".spoiler-wrap__inner-spoiler");
  spoilerWrap.forEach((element) => {
    const spoilerBtn = element.querySelector(".spoiler-wrap__btn");
    spoilerBtn.addEventListener("click", (event) => {
      event.preventDefault();
      element.classList.toggle("spoiler-wrap--active");
    });
  });

  spoilerWrapInner.forEach((element) => {
    const spoilerBtn = element
      .closest(".spoiler-wrap")
      .querySelector(".spoiler-wrap__inner-spoiler-btn");
    spoilerBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let textElement;
      if (element.classList.contains("spoiler-wrap__inner-spoiler--active")) {
        textElement = spoilerBtn.getAttribute("data-show");
      } else {
        textElement = spoilerBtn.getAttribute("data-hide");
      }
      spoilerBtn.innerText = textElement;
      element.classList.toggle("spoiler-wrap__inner-spoiler--active");
    });
  });
}
