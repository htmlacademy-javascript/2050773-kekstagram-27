const ALERT_SHOW_TIME = 5000;

const getRandomNumber = function(min, max) {
  if (min < 0 || max < 0 || isNaN(min) || isNaN(max) || min >= max) {
    throw new Error('Некорректный аргумент функции');
  }
  return Math.round(Math.random() * (max - min) + min);
};
// Ссылка на источник функции https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const isMaxLength = function(string, maxLength) {
  return string.length < maxLength;
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {getRandomNumber, getRandomArrayElement, isMaxLength, isEscapeKey, showAlert};
