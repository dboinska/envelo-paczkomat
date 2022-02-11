const BACKEND_TIME = 1000;
const ERROR_MESSAGE = 'Nie znaleziono numeru telefonu lub kodu odbioru paczki.';

const data = [
  { accessPhone: 507123098, accessKey: 5643 },
  { accessPhone: 793793793, accessKey: 2022 },
];

export function fetchData(phoneNumber, key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundNumber = data.find(
        ({ accessPhone, accessKey }) =>
          phoneNumber === accessPhone && key === accessKey
      );
      if (foundNumber) {
        resolve(foundNumber);
      } else {
        reject(ERROR_MESSAGE);
      }
    }, BACKEND_TIME);
  });
}
