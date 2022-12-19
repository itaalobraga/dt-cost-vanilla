const newTransactionButton = document.querySelector("#new-transaction");
const closeModalButton = document.querySelector(".modal-close");

const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal-content");

newTransactionButton.addEventListener("click", handleModal);
closeModalButton.addEventListener("click", handleModal);

function handleModal() {
  modalOverlay.classList.toggle("close");
}

modalOverlay.addEventListener("click", handleOutsideClick);

function handleOutsideClick(e) {
  const isOutside = !modal.contains(e.target);

  if (isOutside) {
    handleModal();

    return;
  }
}

document.addEventListener("keydown", handleEscPress);

function handleEscPress(e) {
  if (e.key === "Escape") {
    modalOverlay.classList.add("close");
  }
}
