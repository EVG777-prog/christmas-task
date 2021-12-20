import { homePageHTML } from "./pages/home";
import { selectPageHTML } from "./pages/select";
import { Filters, settingFilters } from "./index";
import { data, DataToy } from "./data";

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

class View {

  static renderHomePage(): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) main.innerHTML = homePageHTML;

    document.querySelector('.home-page__btn-start')?.addEventListener('click', (el) => {
      console.log('START!');
      window.location.hash = '#select';
    });
  }

  static renderSelectPage(): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) main.innerHTML = selectPageHTML;

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
          // console.log(el);
          document.querySelector('.select__year .select__text.start')!.textContent = `${Math.round(+el[0])}`;
          document.querySelector('.select__year .select__text.end')!.textContent = `${Math.round(+el[1])}`;

        });
      }
    }

    const forms = document.querySelectorAll('.select__form .form');

    forms.forEach((el: Element) => {
      // console.log(el);
      el.addEventListener('click', (ev: Event) => {
        // console.log('XXX');
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

    showToys(data);

    function showToys(data: DataToy[]): void {
      const container: HTMLElement | null = document.querySelector('.select__toys');

      if (container) {
        container.innerHTML = '';
        data.forEach((el: DataToy) => {
          container.innerHTML += `
          <div class="select__card">
            <div class="select__card-name">${el.name}</div>
                <div class="container">
                   <div class="select__card-img">
                       <img src="/assets/toys/${el.num}.png" alt="picture">
                   </div>
                   <div class="select__card-text">
                     <p>Количество: ${el.count}</p>
                     <p>Год покупки: ${el.year}</p>
                     <p>Форма: ${el.shape}</p>
                     <p>Цвет: ${el.color}</p>
                     <p>Размер: ${el.size}</p>
                     <p>Любимая: ${el.favorite ? 'да' : 'нет'}</p>
                   </div>
            </div>
        </div>
          `
        });
      }
    }
  }
}

export { View };