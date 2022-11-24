import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const initClickOnScreen = () => {
  document.addEventListener( 'click', (e) => {
    const messageElement = document.querySelector('.success__inner');
    const withinBoundaries = e.composedPath().includes(messageElement);

    if (!withinBoundaries && messageElement) {
      hideMessage();
    }
  });
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  document.addEventListener('keydown', onDocumentKeydown);
  successButton.addEventListener('click', hideMessage);
  body.append(successMessage);
  initClickOnScreen();
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  document.addEventListener('keydown', onDocumentKeydown);
  initClickOnScreen();
  errorButton.addEventListener('click', hideMessage);
  body.append(errorMessage);
};

function hideMessage () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {showSuccessMessage, showErrorMessage};
