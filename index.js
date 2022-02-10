const buttonShowInputs = document.querySelector('.button__showInputs');
const form = document.querySelector('.form__parcel');

function hideElement() {
  toggleClass(form, buttonShowInputs, 'd-none');
}

buttonShowInputs.addEventListener('click', hideElement);

function toggleClass(element1, element2, className) {
  element1.classList.remove(className);
  element2.classList.add(className);
}
