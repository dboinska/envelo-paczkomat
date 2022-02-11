const buttonShowInputs = document.querySelector('.button__showInputs'),
  form = document.querySelector('.form__parcel'),
  sectionPassValidation = document.querySelector('.passValidation'),
  sectionFailValidation = document.querySelector('.failValidation'),
  endButton = document.getElementById('endButton'),
  nextParcelPass = document.getElementById('nextParcel__pass'),
  nextParcelFail = document.getElementById('nextParcel__fail'),
  progressPassForm = document.getElementById('progressPassForm'),
  progressFailForm = document.getElementById('progressFailForm'),
  TIMEOUT = 2000,
  BACKEND_TIME = 1000,
  D_NONE = 'd-none';

let timeStart,
  timeEnd,
  progressTimeout,
  REVERSE_COUNTER = 100;

const data = [
  { accessPhone: 507123098, accessKey: 5643 },
  { accessPhone: 793793793, accessKey: 2022 },
];

function hideElement() {
  toggleClass(form, buttonShowInputs, D_NONE);
}

function toggleClass(element1, element2, className) {
  element1.classList.remove(className);
  element2.classList.add(className);
}

function takeTime() {
  return new Date().getTime();
}

function fetchData(phoneNumber, key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundNumber = data.find(
        ({ accessPhone, accessKey }) =>
          phoneNumber === accessPhone && key === accessKey
      );
      if (foundNumber) {
        resolve(foundNumber);
      } else {
        reject('Nie znaleziono numeru telefonu lub kodu odbioru paczki.');
      }
    }, BACKEND_TIME);
  });
}

function validateField(field) {
  return field.validity.valid;
}

function startCountdown(id) {
  const downloadTimer = setInterval(() => {
    id.value = 100 - --REVERSE_COUNTER;
    if (REVERSE_COUNTER <= 0) {
      clearInterval(downloadTimer);
    }
  }, 20);
  progressTimeout = setTimeout(() => {
    sectionPassValidation.classList.add(D_NONE);
    sectionFailValidation.classList.add(D_NONE);
    toggleClass(buttonShowInputs, form, D_NONE);
    REVERSE_COUNTER = 100;
    clearInterval(downloadTimer);
    id.value = 0;

    document.body.classList.remove('overflowHidden');
  }, 3200);
  form.reset();
}

function handleSubmit(event) {
  event.preventDefault();
  timeEnd = takeTime();

  const clientPhone = document.getElementById('phone'),
    clientKey = document.getElementById('parcelKey'),
    seconds = ((timeEnd - timeStart + BACKEND_TIME) / 1000).toFixed(2),
    timeInfo = document.querySelector('.timeInfo'),
    submitFormButton = document.querySelector('.button__submitForm'),
    spinner = submitFormButton.querySelector('i');

  if (validateField(clientPhone) && validateField(clientKey)) {
    window.scrollTo(0, 0);
    document.body.classList.add('overflowHidden');
    submitFormButton.disabled = true;
    spinner.classList.remove('d-none');

    fetchData(Number(clientPhone.value), Number(clientKey.value))
      .then(
        () => {
          sectionPassValidation.classList.remove(D_NONE);
          startCountdown(progressPassForm);
        },
        error => {
          sectionFailValidation.querySelector('p').textContent = error;
          sectionFailValidation.classList.remove(D_NONE);
          startCountdown(progressFailForm);
          console.error(error);
        }
      )
      .finally(() => {
        spinner.classList.add('d-none');
        submitFormButton.disabled = false;
      });
  }
  timeInfo.textContent = ` ${seconds}`;
}

function resetForm() {
  buttonShowInputs.classList.add(D_NONE);
  form.reset();
  clearTimeout(progressTimeout);
}

buttonShowInputs.addEventListener('click', () => {
  timeStart = takeTime();
  hideElement();
});

form.addEventListener('submit', handleSubmit);

endButton.addEventListener('click', () => {
  toggleClass(buttonShowInputs, sectionPassValidation, D_NONE);
  form.classList.add(D_NONE);
  form.reset();
});

nextParcelPass.addEventListener('click', () => {
  toggleClass(form, sectionPassValidation, D_NONE);
  resetForm();
});

nextParcelFail.addEventListener('click', () => {
  toggleClass(form, sectionFailValidation, D_NONE);
  resetForm();
});
