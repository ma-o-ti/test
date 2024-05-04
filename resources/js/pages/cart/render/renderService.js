export const renderService = (data) => {
  const serviceLifting = document.querySelector(".js-lifting-cost");
  const serviceAssembly = document.querySelector(".js-assembly-cost");

  serviceLifting.innerText = data.lifting.toLocaleString();
  serviceAssembly.innerText = data.assembly.toLocaleString();
};
