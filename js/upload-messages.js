import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');


function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const initClickOnScreen = () => {document.addEventListener( 'click', (e) => {
  const messageElement = document.querySelector('.success__inner');
  const withinBoundaries = e.composedPath().includes(messageElement);

  if (!withinBoundaries) {
    hideMessage();
  }
});};


const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  document.addEventListener('keydown', onEscKeyDown);
  successButton.addEventListener('click', hideMessage);
  body.append(successMessage);
  initClickOnScreen();
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  document.addEventListener('keydown', onEscKeyDown);
  errorButton.addEventListener('click', hideMessage);
  body.append(errorMessage);
  initClickOnScreen();
};

function hideMessage () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onEscKeyDown);
}

export {showSuccessMessage, showErrorMessage};
