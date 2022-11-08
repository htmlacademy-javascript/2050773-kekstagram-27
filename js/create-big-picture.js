const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');


const createComment = (data) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
};

const SHOW_COMMENTS_AMOUNT = 5;

const showMoreComments = function(comments) {
  let currentNumber = Number(bigPicture.querySelector('.comments-count-current').textContent);
  const fragment = document.createDocumentFragment();

  if (comments.length > SHOW_COMMENTS_AMOUNT) {
    currentNumber += 5;
    for(let i = 0; i < SHOW_COMMENTS_AMOUNT; i++) {
      const commentElement = createComment(comments.shift(i));
      fragment.append(commentElement);
    }
  } else {
    currentNumber += comments.length;
    comments.forEach((comment, index) => {

      const commentElement = createComment(comments.shift(index));
      fragment.append(commentElement);
    });
  }
  bigPicture.querySelector('.comments-count-current').textContent = currentNumber;
  commentsList.append(fragment);
};

const createComments = (comments) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  if (comments.length < SHOW_COMMENTS_AMOUNT) {

    bigPicture.querySelector('.comments-count-current').textContent = comments.length;

    for(let i = 0; i < comments.length; i++) {
      const commentElement = createComment(comments.shift());
      fragment.append(commentElement);
    }
  }
  else {
    bigPicture.querySelector('.comments-count-current').textContent = SHOW_COMMENTS_AMOUNT;

    for(let i = 0; i < SHOW_COMMENTS_AMOUNT; i++) {
      const commentElement = createComment(comments.shift(i));
      fragment.append(commentElement);
    }
    commentsLoader.addEventListener('click', () => showMoreComments(comments));
  }
  commentsList.append(fragment);
};


const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

function onEscKeyDown(evt) {
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
  document.addEventListener('keydown', onEscKeyDown);

  createBigPictureDetails(data);
  createComments(data.comments);

  cancelButton.addEventListener('click', hideBigPicture);
};


export {showBigPicture};
