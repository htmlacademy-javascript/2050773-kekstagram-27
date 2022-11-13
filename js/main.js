import {createPreviews} from './create-previews.js';
import {initForm, closeEditForm, initFormSubmit} from './form.js';
import {initEffects} from './effects.js';
import {initScale} from './scale.js';
import {getData} from './api.js';


initForm();
initEffects();
initScale();

getData((photos) => createPreviews(photos));

initFormSubmit(closeEditForm);
