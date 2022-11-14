import {isEscapeKey} from './utils.js';
import {scaleImage} from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './upload-messages.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const editForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const editFormClose = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');


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

function closeEditForm () {
  editForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  scaleImage();
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


const initForm = () => {
  uploadFile.addEventListener('change', showModal);
  editFormClose.addEventListener('click', closeEditForm);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const initFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        new FormData(evt.target),
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessMessage();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
      );
    }
  });
};

export {initForm, closeEditForm, initFormSubmit};
