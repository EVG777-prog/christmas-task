import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import { Module } from "./module";
import { data } from "./data";

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



interface Filters {
  sort: 'nameUp' | 'nameDown' | 'countUp' | 'countDown',
  form: { 'ball': boolean, 'bell': boolean, 'cone': boolean, 'star': boolean, 'figure': boolean },
  color: { 'white': boolean, 'yellow': boolean, 'red': boolean, 'blue': boolean, 'green': boolean },
  size: { 'big': boolean, 'medium': boolean, 'small': boolean },
  favorite: boolean,
  count: [number, number],
  year: [number, number],
}

const settingFilters: Filters = {
  sort: 'nameUp',
  form: { 'ball': true, 'bell': false, 'cone': false, 'star': false, 'figure': false },
  color: { 'white': false, 'yellow': true, 'red': false, 'blue': false, 'green': false },
  size: { 'big': true, 'medium': false, 'small': false },
  favorite: false,
  count: [1, 12],
  year: [1940, 2020],
}

// const sortMetod = document.querySelector('#sort-metod');
const forms = document.querySelectorAll('.select__form .form');

forms.forEach((el: Element) => {
  console.log(el);
  el.addEventListener('click', (ev: Event) => {
    console.log('XXX');
    const target = ev.target as HTMLElement & { dataset: Record<string, string> };
    const { form } = target.dataset;
    target.classList.toggle('active');
    if (form === 'ball') settingFilters.form['ball'] = settingFilters.form['ball'] ? false : true;
    if (form === 'bell') settingFilters.form['bell'] = settingFilters.form['bell'] ? false : true;
    if (form === 'cone') settingFilters.form['cone'] = settingFilters.form['cone'] ? false : true;
    if (form === 'star') settingFilters.form['star'] = settingFilters.form['star'] ? false : true;
    if (form === 'figure') settingFilters.form['figure'] = settingFilters.form['figure'] ? false : true;
  });
});

function renderFilters(obj: Filters): void {

}

console.log(data);

export { Filters, settingFilters };