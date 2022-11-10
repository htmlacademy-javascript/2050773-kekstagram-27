import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const errorButton = document.querySelector('#success').content.querySelector('.error__button');
const body = document.querySelector('body');


function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  document.addEventListener('keydown', onEscKeyDown);
  successButton.addEventListener('click', hideMessage);
  body.append(successMessage);
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.addEventListener('keydown', onEscKeyDown);
  errorButton.addEventListener('click', hideMessage);
  body.append(errorMessage);
};

function hideMessage () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onEscKeyDown);
  successButton.removeEventListener('click', hideMessage);
}

export {showSuccessMessage, showErrorMessage};
