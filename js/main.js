let getRandomNumber = function(min, max) {
  if (min < 0 || max < 0 || isNaN(min) || isNaN(max) || min >= max) {
    return NaN;
  }
  return Math.round(Math.random() * (max - min) + min);
};

getRandomNumber();

// Ссылка на источник функции https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

let isMaxLength = function(comment, maxLength) {
  if (comment.length < maxLength) {
    return true;
  }
  return false;
};

isMaxLength();
