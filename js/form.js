import {isEscapeKey} from './utils.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const editForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const editFormClose = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;


const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeEditForm();
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const showModal = () => {
  editForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const onFileInputChange = () => {
  showModal();
};

function closeEditForm () {
  editForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onPopupEscKeydown);
}


const isValidTag = (tag) => VALID_HASHTAG.test(tag);
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtags = (value) => {
  const hashtags = value.trim().split(' ').filter((tag) => tag.trim().length);

  return hasValidCount(hashtags) && hasUniqueTags(hashtags) && hashtags.every(isValidTag);
};

pristine.addValidator(hashtagField, validateHashtags, 'хештег должен начинаться с # и быть короче 19 символов, не больше 5 хештегов');

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const initForm = function() {
  uploadFile.addEventListener('click', onFileInputChange);
  editFormClose.addEventListener('click', closeEditForm);
  uploadForm.addEventListener('submit',onFormSubmit);
};

export {initForm};
