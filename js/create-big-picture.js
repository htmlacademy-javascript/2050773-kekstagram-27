const body = document.querySelector('.body');
const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const createComment = ({avatar, name, message}) => {
  const comment = commentsList.createElement('li');

  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

function OnEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const createBigPictureDetails = ({url, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count img').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  for (let i = 0; i < comments.length; i++) {
    createComment(comments);
  }
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsList.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', OnEscKeyDown);

  createBigPictureDetails(data);
};

cancelButton.addEventListener('click', hideBigPicture);

export {showBigPicture};

