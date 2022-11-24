const sliderElement = document.querySelector('.effect-level__slider');
const form = document.querySelector('.img-upload__form');
const effectLevel = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');

const effects = [
  {name: 'none', min: 0, max: 100, step: 1, scale: ''},
  {name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, scale: ''},
  {name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, scale: ''},
  {name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, scale: '%'},
  {name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, scale: 'px'},
  {name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, scale: ''}
];

const defaultEffect = effects[0];

let chosenEffect = defaultEffect;

const isDefault = () => chosenEffect === defaultEffect;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    sliderElement.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = effects.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  previewImage.style.filter = 'none';
  previewImage.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }

  const sliderValue = sliderElement.noUiSlider.get();
  previewImage.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.scale})`;
  previewImage.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevel.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = defaultEffect;
  updateSlider();
};

const initEffects = () => {
  chosenEffect = defaultEffect;

  noUiSlider.create(sliderElement, {
    range: {
      min: defaultEffect.min,
      max: defaultEffect.max,
    },
    start: defaultEffect.max,
    step: defaultEffect.step,
    connect: 'lower',
  });

  updateSlider();

  form.addEventListener('change', onFormChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};


export {initEffects, resetEffects};
