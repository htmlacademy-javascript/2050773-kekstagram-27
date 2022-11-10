import {createPreviews} from './create-previews.js';
import {initForm, closeEditForm, setFormSubmit} from './form.js';
import {initEffects} from './effects.js';
import {initScale} from './scale.js';
import {getData} from './api.js';
// import {showSuccessMessage, showErrorMessage} from './upload-messages.js';


initForm();
initEffects();
initScale();

getData((photos) => createPreviews(photos));

setFormSubmit(closeEditForm);

// const onSendDataSuccess = () => {
//   showSuccessMessage();
// };

// setFormSubmit(async (data) => {
//   await sendData(onSendDataSuccess,showErrorMessage, data);
// });
