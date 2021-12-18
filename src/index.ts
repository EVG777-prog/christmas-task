import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

console.log('I am working');



const sliderCount: noUiSlider.target = document.querySelector('.range-count')!;
const sliderYear: noUiSlider.target = document.querySelector('.range-year')!;



if (sliderCount) {
  noUiSlider.create(sliderCount, {
    start: [1, 12],
    step: 1,
    connect: true,
    range: {
      'min': 1,
      'max': 12
    },
  });

  if (sliderCount.noUiSlider) {
    sliderCount.noUiSlider.on('update', (el) => {
      console.log(el);
      document.querySelector('.select__count .select__text.start')!.textContent = `${Math.round(+el[0])}`;
      document.querySelector('.select__count .select__text.end')!.textContent = `${Math.round(+el[1])}`;

    });
  }
}
if (sliderYear) {
  noUiSlider.create(sliderYear, {
    start: [1940, 2020],
    step: 1,
    connect: true,
    range: {
      'min': 1940,
      'max': 2020
    }
  });

  if (sliderYear.noUiSlider) {
    sliderYear.noUiSlider.on('update', (el) => {
      console.log(el);
      document.querySelector('.select__year .select__text.start')!.textContent = `${Math.round(+el[0])}`;
      document.querySelector('.select__year .select__text.end')!.textContent = `${Math.round(+el[1])}`;

    });
  }
}


