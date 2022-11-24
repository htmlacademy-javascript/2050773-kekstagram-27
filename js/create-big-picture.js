const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentsCountCurrent = bigPicture.querySelector('.comments-count-current');

const SHOW_COMMENTS_AMOUNT = 5;

let comments;

const createComment = (data) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
};

const showMoreComments = function() {
  let currentNumber = Number(commentsCountCurrent.textContent);

  const fragment = document.createDocumentFragment();

  if ((comments.length - currentNumber) > SHOW_COMMENTS_AMOUNT) {
    comments.slice(currentNumber, currentNumber + SHOW_COMMENTS_AMOUNT).forEach((comment) => {
      const commentElement = createComment(comment);
      fragment.append(commentElement);
    });

    currentNumber += SHOW_COMMENTS_AMOUNT;

  } else {
    comments.slice(currentNumber).forEach((comment) => {
      const commentElement = createComment(comment);
      fragment.append(commentElement);
    });
    commentsLoader.classList.add('hidden');

    currentNumber += (comments.length - currentNumber);
  }

  commentsCountCurrent.textContent = currentNumber;
  commentsList.append(fragment);
};

// eslint-disable-next-line no-shadow
const createComments = (comments) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  if (comments.length <= SHOW_COMMENTS_AMOUNT) {
    commentsLoader.classList.add('hidden');
    commentsCountCurrent.textContent = comments.length;

    comments.forEach((comment) => {
      const commentElement = createComment(comment);
      fragment.append(commentElement);
    });
  }

  else {
    commentsCountCurrent.textContent = SHOW_COMMENTS_AMOUNT;

    comments.slice(0, SHOW_COMMENTS_AMOUNT).forEach((comment) => {
      const commentElement = createComment(comment);
      fragment.append(commentElement);
    });

    commentsLoader.addEventListener('click', showMoreComments);
  }
  commentsList.append(fragment);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', showMoreComments);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    evt.preventDefault();
    hideBigPicture();
  }
}

const createBigPictureDetails = (data) => {
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.big-picture__img img').alt = '';
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  createBigPictureDetails(data);
  createComments(data.comments);

  comments = data.comments;

  cancelButton.addEventListener('click', hideBigPicture);
};


export {showBigPicture};
