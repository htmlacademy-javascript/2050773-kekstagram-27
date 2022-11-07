import {showBigPicture} from './create-big-picture.js';

const createPreviews = function(data) {
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const similarUserFragment = document.createDocumentFragment();

  data.forEach(({url, likes, comments, description}, index) => {
    const userPicture = pictureTemplate.cloneNode(true);

    userPicture.querySelector('.picture__img').src = url;
    userPicture.querySelector('.picture__img').alt = description;
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;

    similarUserFragment.appendChild(userPicture);

    userPicture.addEventListener('click', () => {
      showBigPicture(data[index]);
    });
  });
  picturesList.appendChild(similarUserFragment);
};

export {createPreviews};
