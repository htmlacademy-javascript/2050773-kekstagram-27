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

export {getRandomNumber, getRandomArrayElement, isMaxLength};
