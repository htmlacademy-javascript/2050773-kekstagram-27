const BASE_URL = 'https://27.javascript.pages.academy/kekstagram';

import {showAlert} from './utils.js';


const getData = (onSuccess) => {
  fetch(`${BASE_URL}/data`)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера');
    });
};

const sendData = (body, onSuccess, onFail) => {
  fetch(
    BASE_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
