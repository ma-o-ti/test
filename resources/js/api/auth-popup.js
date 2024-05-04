export function handleAuthPopup() {
  document.addEventListener("DOMContentLoaded", () => {
    const telContainer = document.getElementById("auth-popup-tel");
    const telInput = telContainer.querySelector(".popup-auth__tel");
    const telButton = telContainer.querySelector(".popup__btn");
    const verificationContainer = document.getElementById("auth-popup-verification");
    let verificationTelephone = verificationContainer.querySelector(".popup-auth__tel-example");
    const verificationReset = verificationContainer.querySelector(".popup-auth__reset");
    const verificationInput = verificationContainer.querySelector(".popup-auth__verification-code");

    const showAuth = () => {
      telContainer.classList.remove("hidden");
      verificationContainer.classList.add("hidden");
    };

    const showVerification = () => {
      telContainer.classList.add("hidden");
      verificationContainer.classList.remove("hidden");
    };

    const requestConfirmationCode = (telephoneNumber) => {
      return fetch("/ajax/tel-to-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(telephoneNumber),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    if (telContainer) {
      telButton.addEventListener("click", () => {
        verificationTelephone.innerText = telInput.value;

        showVerification();
      });

      verificationReset.addEventListener("click", () => {
        telInput.value = "";
        showAuth();
      });
    }
  });
}
