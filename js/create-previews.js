const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPreviews = function(data) {
  const similarUserFragment = document.createDocumentFragment();

  data.forEach(({url, likes, comments, description}) => {
    const userPicture = pictureTemplate.cloneNode(true);

    userPicture.querySelector('.picture__img').src = url;
    userPicture.querySelector('.picture__img').alt = description;
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;

    similarUserFragment.appendChild(userPicture);
  });
  picturesList.appendChild(similarUserFragment);
};

export {createPreviews};
