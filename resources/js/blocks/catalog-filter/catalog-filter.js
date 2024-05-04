import { sendSortParameter } from "../../api/sort.js";
import ready from "../../utils/documentReady.js";

ready(() => {
  const filterSort = document.querySelector(".catalog-filter__sort-btn");
  if (filterSort) {
    filterSort.addEventListener("click", (e) => {
      e.preventDefault();
      filterSort.closest(".catalog-filter__sort").classList.toggle("catalog-filter__sort--active");
      document.querySelector(".filter-menu").classList.remove("filter-menu--active");
    });
  }

  const sortType = document.cookie
    .split("; ")
    .find((row) => row.startsWith("sort_type="))
    ?.split("=")[1];

  const checkedSortInput = document.querySelector(
    `.catalog-filter__sort-drop .radio__input[id=${sortType}]`,
  );

  checkedSortInput && checkedSortInput.setAttribute("checked", "checked");

  // sorting
  const sortFilterList = document.querySelector(".catalog-filter__sort-drop");

  if (sortFilterList) {
    const sortFilterForm = sortFilterList.querySelectorAll(".radio__input");

    /** слушатель на выбор сортировки */
    sortFilterForm.forEach((element) => {
      element.addEventListener("change", (event) => {
        const filterValue = {
          sort: event.target.id,
        };
        sendSortParameter(filterValue);
      });
    });
  }

  const filterBlock = document.querySelector(".catalog-filter");

  if (filterBlock) {
    document.addEventListener("click", (event) => {
      //Закрытие сортировки
      const filterSort = filterBlock.querySelector(".catalog-filter__sort");

      if (
        filterSort &&
        filterSort.classList.contains("catalog-filter__sort--active") &&
        (event.target.classList.contains("catalog-filter__sort") ||
          event.target.closest(".catalog-filter__sort") === null)
      ) {
        filterSort.classList.remove("catalog-filter__sort--active");
      }

      //Закрытие фильтра
      const filterMenuContainer = filterBlock.querySelector(".filter-menu");

      if (
        filterMenuContainer &&
        filterMenuContainer.classList.contains("filter-menu--active") &&
        (event.target.classList.contains("catalog-filter") ||
          event.target.closest(".catalog-filter") === null)
      ) {
        filterMenuContainer.classList.remove("filter-menu--active");
      }
    });
  }
});
