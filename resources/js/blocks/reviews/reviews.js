import ready from "../../utils/documentReady.js";
import { reviewsUrl } from "../../api/path_ajax.js";
import { urlParams } from "../../utils/urlParams";

ready(() => {
  const blockReviews = (() => {
    var reviewsEl, reviewsMain, reviewsPagination;

    const init = (el) => {
      try {
        reviewsEl = el;
        reviewsMain = reviewsEl.querySelector(".reviews__main");
        reviewsPagination = reviewsEl.querySelector(".reviews__pagination") || false;

        // pagination
        if (reviewsPagination !== false) {
          // build
          const paramsId = parseInt(urlParams.get("page")) || 1;
          requestReviews(paramsId);

          // event
          reviewsPagination.addEventListener(
            "pagination change",
            (event) => listenerPagination(event),
            false,
          );
        }
      } catch (error) {
        console.error(`#blockReviews init. \nMessage: ${error.message}.`);
      }
    };

    const listenerPagination = (event) => {
      const detail = event.detail;
      const activeIndex = detail.index;

      requestReviews(activeIndex);
    };

    const requestReviews = async (current) => {
      let numberPerPage = 4;
      let currentPage = current;
      let idProduct = 77;

      fetch(`${reviewsUrl}?product=${idProduct}&_page=${currentPage}&_limit=${numberPerPage}`)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("При получение отзывов, возникла ошибка.");
          }

          let json = await response.json();

          if (json.length > 0) {
            reviewsMain.innerHTML = "";
            reviewsEl.scrollIntoView();
            json.forEach((variable) => {
              let review = createTemplateReview(variable);
              reviewsMain.insertAdjacentHTML("beforeend", review);
            });
          }
        })
        .catch((error) => {
          makeNotification.error({
            type: "toast",
            content:
              '<p class="notification__title">Отзывы</p><p>Во время просмотра отзывов, произошла ошибка. Попробуйте ещё раз.</p>',
          });
          console.error(`#blockReviews request. \nMessage: ${error.message}.`);
        });
    };

    const createTemplateReview = (dataReview) => {
      let data = {
        date: dataReview.date || "11 апреля 2023",
        name: dataReview.name,
        rating: dataReview.rating || 4,
        body: dataReview.body,
      };

      let template = `
          <figure class="review" role="figure" tabindex="0">
            <div class="review-header">
              <div class="review-header__row">
                <div class="review-header__col"><span class="review__name" title="Владимир">${data.name}</span></div>
                <div class="review-header__col"><span class="review__date">${data.date}</span></div>
              </div>
            </div>
            <div class="review-main">
              <div class="review-main__row">
                <div class="review-main__col">
                  <blockquote class="review__blockquote" aria-label="${data.body}">${data.body}</blockquote>
                </div>
                <div class="review-main__col">
                  <div class="star-rating-static" style="--rating-number: ${data.rating}; --rating-color: #eeb83b">
                    <div class="star-rating-static__wrapper">
                      <div class="star-rating-static__body"></div>
                      <div class="star-rating-static__progress"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
      `;

      return template;
    };

    return { init };
  })();

  window.blockReviews = blockReviews;

  let reviewsElem = document.querySelector(".reviews") || false;

  if (reviewsElem !== false) {
    blockReviews.init(reviewsElem);
  }
});
