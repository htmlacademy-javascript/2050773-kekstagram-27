import {createPreviews, setLikesClick, setRandomClick} from './create-previews.js';
import {initForm, closeEditForm, initFormSubmit} from './form.js';
import {initEffects} from './effects.js';
import {initScale} from './scale.js';
import {getData} from './api.js';


initForm();
initEffects();
initScale();

getData((photos) => {
  createPreviews(photos);
  setLikesClick(photos, (sortedPhotos) => createPreviews(sortedPhotos));
  setRandomClick(photos, (sortedPhotos) => createPreviews(sortedPhotos));
});
// getData((photos) => createPreviews(SortDataByLikes(photos)));

initFormSubmit(closeEditForm);
