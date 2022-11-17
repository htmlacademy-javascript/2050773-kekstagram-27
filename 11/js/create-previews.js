import {showBigPicture} from './create-big-picture.js';

const buttonFilteredByLikes = document.querySelector('#filter-discussed');
const buttonFilteredRandom = document.querySelector('#filter-random');
const RANDOM_PICS_AMOUNT = 10;


const compareLikes = (picA, picB) => {
  const likeA = picA.likes;
  const likeB = picB.likes;

  return likeB - likeA;
};

const setLikesClick = (data, cb) => {
  buttonFilteredByLikes.addEventListener('click', () => {
    const sortedData = data.slice().sort(compareLikes);
    cb(sortedData);
  });
};

const getRandomPhotosArray = (data) => {
  const newArray = data.slice(0, RANDOM_PICS_AMOUNT);
  return newArray.sort(() => Math.round(Math.random() * 100) - 50);
};

const setRandomClick = (data, cb) => {
  buttonFilteredRandom.addEventListener('click', () => {
    cb(getRandomPhotosArray(data));
  });
};

const createPreviews = (data) => {
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const similarUserFragment = document.createDocumentFragment();
  const imageFilters = document.querySelector('.img-filters');


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
  imageFilters.classList.remove('img-filters--inactive');
};

export {createPreviews, setLikesClick, setRandomClick};
