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

isMaxLength();

const DESCRIPTION = [
  'Ну мы',
  '2022 be like',
  'Дорогие подписчики, это вам от меня, не завидуйте',
  'Инструкции получения ВНЖ в Стамбуле в комментариях',
  'Мой личный топ мест с лучшим кебабом в Берлине'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME = [
  'Василиса',
  'Василиск',
  'Доминик',
  'Доминикана',
  'Антон',
  'Антонина',
];

const DESCRIPTION_ID = Array.from(Array(25)).map((e,i)=>i + 1);

const PHOTO_ID = Array.from(Array(25)).map((e,i)=>i + 1);

const COMMENT_ID = Array.from(Array(200)).map((e,i)=>i + 1);

const AVATAR_ID = Array.from(Array(6)).map((e,i)=>i + 1);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getUniqueID = function(array) {
  if (array.length === 1) {
    return array[0];
  } else {
    const IDindex = getRandomNumber(0, array.length - 1);
    const ID = array[IDindex];
    array = array.splice(IDindex, 1);
    return ID;
  }
};

const creatComment = () => ({
  id: getUniqueID(COMMENT_ID),
  avatar: `img/avatar-${ getUniqueID(AVATAR_ID) }.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAME),
});

const creatDescription = () => ({
  id: getUniqueID(DESCRIPTION_ID),
  url: `photos/${ getUniqueID(PHOTO_ID) }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: 6}, creatComment)
});

const similarDescription = Array.from({length: 25}, creatDescription);

similarDescription();

