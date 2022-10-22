import {createDescriptionList} from './create-description-list.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = createDescriptionList();

const similarUserFragment = document.createDocumentFragment();

similarPictures.forEach(({url, likes, comments}) => {
  const userPicture = pictureTemplate.cloneNode(true);

  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  picturesList.appendChild(userPicture);
  return userPicture;
});

picturesList.appendChild(similarUserFragment);

