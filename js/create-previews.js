import {showBigPicture} from './create-big-picture.js';
import {getRandomArrayElement} from './utils.js';
import {debounce} from './utils.js';


const discussedFilterButton = document.querySelector('#filter-discussed');
const randomFilterButton = document.querySelector('#filter-random');
const defaultFilterButton = document.querySelector('#filter-default');

const compareLikes = (picA, picB) => {
  const likeA = picA.likes;
  const likeB = picB.likes;

  return likeB - likeA;
};

const initDefaultFilter = (data, cb) => {
  defaultFilterButton.addEventListener('click', () => {
    const activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.add('img-filters__button--active');

    cb(data);
  });
};

const initDiscussedFilter = (data, cb) => {

  discussedFilterButton.addEventListener('click', () => {
    const activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.add('img-filters__button--active');

    const sortedData = data.slice().sort(compareLikes);
    cb(sortedData);
  });
};

const getRandomPhotosArray = (data) => {
  const RANDOM_PICS_AMOUNT = 10;
  const randomPics = new Set();

  while (randomPics.size < RANDOM_PICS_AMOUNT) {
    randomPics.add(getRandomArrayElement(data));
  }
  return Array.from(randomPics);
};

const initRandomFilter = (data, cb) => {
  randomFilterButton.addEventListener('click', () => {
    const activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.add('img-filters__button--active');
    cb(getRandomPhotosArray(data));
  });
};

const createPreviews = debounce((data) => {
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const similarUserFragment = document.createDocumentFragment();
  const imageFilters = document.querySelector('.img-filters');

  const pictures = document.querySelectorAll('.picture');

  for (let i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }

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
});


export {createPreviews, initDefaultFilter, initDiscussedFilter, initRandomFilter};
