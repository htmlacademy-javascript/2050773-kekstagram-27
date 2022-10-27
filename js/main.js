import {createDescriptionList} from './create-description-list.js';
import {createPreviews} from './create-previews.js';
import './form.js';


const descriptions = createDescriptionList();

createPreviews(descriptions);
