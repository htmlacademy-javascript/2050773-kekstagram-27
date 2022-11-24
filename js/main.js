import {createPreviews, initDefaultFilter, initDiscussedFilter, initRandomFilter} from './create-previews.js';
import {initForm, closeEditForm, initFormSubmit} from './form.js';
import {initEffects} from './effects.js';
import {initScale} from './scale.js';
import {getData} from './api.js';
import {initUploadPicture} from './upload-picture.js';

initForm();
initEffects();
initScale();

getData((photos) => {
  createPreviews(photos);
  initDefaultFilter(photos, () => createPreviews(photos));
  initDiscussedFilter(photos, (sortedPhotos) => createPreviews(sortedPhotos));
  initRandomFilter(photos, (sortedPhotos) => createPreviews(sortedPhotos));
});

initUploadPicture();


initFormSubmit(closeEditForm);
