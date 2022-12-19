const newTransactionButton = document.querySelector("#new-transaction");
const closeModalButton = document.querySelector(".modal-close");

const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal-content");

newTransactionButton.addEventListener("click", handleModal);
closeModalButton.addEventListener("click", handleModal);

function handleModal() {
  modalOverlay.classList.toggle("close");
}
/* se o elemnto tiver uma classe, ele remove, se não tiver, ele adiciona.
O toggle()método da DOMTokenListinterface remove um token existente da lista e 
retorna false. Se o token não existir, ele é adicionado e a função retorna true */

modalOverlay.addEventListener("click", handleOutsideClick);

function handleOutsideClick(e) {
  const isOutside = !modal.contains(e.target);

  if (isOutside) {
    handleModal();

    return;
  }
}
