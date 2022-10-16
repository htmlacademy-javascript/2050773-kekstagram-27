import {getRandomNumber, getRandomArrayElement} from './utils.js';

const DESCRIPTIONS = [
  'Ну мы',
  '2022 be like',
  'Дорогие подписчики, это вам от меня, не завидуйте',
  'Инструкции получения ВНЖ в Стамбуле в комментариях',
  'Мой личный топ мест с лучшим кебабом в Берлине'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Василиса',
  'Василиск',
  'Доминик',
  'Доминикана',
  'Антон',
  'Антонина',
];

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${ index }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const commentsList = [];
for (let i = 1; i <= 6; i++) {
  commentsList.push(createComment(i));
}

const createDescription = (index) => ({
  id: index,
  url: `photos/${ index }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: commentsList,
});

const createDescriptionList = function() {
  const descriptionsList = [];
  for (let i = 1; i <= 25; i++) {
    descriptionsList.push(createDescription(i));
  }
  return descriptionsList;
};

export {createDescriptionList};
