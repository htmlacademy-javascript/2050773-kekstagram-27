import {createPreviews, initDefaultFilter, initDiscussedFilter, initRandomFilter} from './create-previews.js';
import {initForm, closeEditForm, initFormSubmit} from './form.js';
import {initEffects} from './effects.js';
import {initScale} from './scale.js';
import {getData} from './api.js';
import {debounce} from './utils.js';

const RERENDER_DELAY = 500;


initForm();
initEffects();
initScale();

getData((photos) => {
  createPreviews(photos);
  initDefaultFilter(photos, debounce(() => createPreviews(photos), RERENDER_DELAY));
  initDiscussedFilter(photos, debounce((sortedPhotos) => createPreviews(sortedPhotos), RERENDER_DELAY));
  initRandomFilter(photos, debounce((sortedPhotos) => createPreviews(sortedPhotos), RERENDER_DELAY));
});


initFormSubmit(closeEditForm);
