import {createDescriptionList} from './create-description-list.js';
import {createPreviews} from './create-previews.js';
import {initForm} from './form.js';
// import './effects.js';


const descriptions = createDescriptionList();

createPreviews(descriptions);
initForm();
