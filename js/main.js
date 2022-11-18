import {createPreviews, initDefaultFilter, initDiscussedFilter, initRandomFilter} from './create-previews.js';
import {initForm, closeEditForm, initFormSubmit} from './form.js';
import {initEffects} from './effects.js';
import {initScale} from './scale.js';
import {getData} from './api.js';


initForm();
initEffects();
initScale();

getData((photos) => {
  createPreviews(photos);
  initDefaultFilter(photos, () => createPreviews(photos));
  initDiscussedFilter(photos, (sortedPhotos) => createPreviews(sortedPhotos));
  initRandomFilter(photos, (sortedPhotos) => createPreviews(sortedPhotos));
});
// getData((photos) => createPreviews(SortDataByLikes(photos)));

initFormSubmit(closeEditForm);
