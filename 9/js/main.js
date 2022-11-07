import {createDescriptionList} from './create-description-list.js';
import {createPreviews} from './create-previews.js';
import {initForm} from './form.js';
import {initEffects} from './effects.js';
import {initScale} from './scale.js';

const descriptions = createDescriptionList();

createPreviews(descriptions);
initForm();
initEffects();
initScale();
