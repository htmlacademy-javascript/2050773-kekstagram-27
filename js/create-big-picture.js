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

const UPLOAD_COMMENTS_AMOUNT = 5;

const showMoreComments = function(comments, moreComments) {

  const fragment = document.createDocumentFragment();

  if (comments.length > UPLOAD_COMMENTS_AMOUNT) {
    moreComments += UPLOAD_COMMENTS_AMOUNT;

    for(let i = 0; i < UPLOAD_COMMENTS_AMOUNT; i++) {
      const commentElement = createComment(comments.shift(i));
      fragment.append(commentElement);
    }
  } else {
    moreComments += comments.length;
    comments.forEach((comment, index) => {
      const commentElement = createComment(comments.shift(index));
      fragment.append(commentElement);
    });
  }
  commentsList.append(fragment);
  bigPicture.querySelector('.comments-count-current').textContent = moreComments;
};


const createComments = (comments) => {
  const moreComments = UPLOAD_COMMENTS_AMOUNT;
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  bigPicture.querySelector('.comments-count-current').textContent = moreComments;

  for(let i = 0; i < UPLOAD_COMMENTS_AMOUNT; i++) {
    const commentElement = createComment(comments.shift(i));
    fragment.append(commentElement);
  }
  commentsList.append(fragment);
  commentsLoader.addEventListener('click', () => showMoreComments(comments, moreComments));
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
