import { homePageHTML } from "./pages/home";
import { selectPageHTML } from "./pages/select";
import { Setting } from "./setting";
import { data, DataToy } from "./data";
import { Module } from "./module";

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
        start: [Setting.filters.count[0], Setting.filters.count[1]],
        step: 1,
        connect: true,
        range: {
          'min': 1,
          'max': 12
        },
      });

      if (sliderCount.noUiSlider) {
        sliderCount.noUiSlider.on('update', (el) => {
          Setting.filters.count = [+el[0], +el[1]];

          this.showToys(Module.filterAll());
          document.querySelector('.select__count .select__text.start')!.textContent = `${Math.round(+el[0])}`;
          document.querySelector('.select__count .select__text.end')!.textContent = `${Math.round(+el[1])}`;

        });
      }
    }
    if (sliderYear) {
      noUiSlider.create(sliderYear, {
        start: [Setting.filters.year[0], Setting.filters.year[1]],
        step: 1,
        connect: true,
        range: {
          'min': 1940,
          'max': 2020
        }
      });

      if (sliderYear.noUiSlider) {
        sliderYear.noUiSlider.on('update', (el) => {
          Setting.filters.year = [+el[0], +el[1]];
          this.showToys(Module.filterAll());

          document.querySelector('.select__year .select__text.start')!.textContent = `${Math.round(+el[0])}`;
          document.querySelector('.select__year .select__text.end')!.textContent = `${Math.round(+el[1])}`;

        });
      }
    }

    renderSelectPageFilters();

    function renderSelectPageFilters(): void {

      const chkbox = document.querySelector('#sort-metod') as HTMLElement & { value: string };
      chkbox.value = Setting.filters.sort;

      const forms = document.querySelectorAll('.select__form .form');
      forms.forEach((el: Element) => {
        const target = el as HTMLElement & { dataset: Record<string, string> };
        const { form } = target.dataset;

        if (form === 'ball' && Setting.filters.form['ball']) el.classList.add('active');
        if (form === 'bell' && Setting.filters.form['bell']) el.classList.add('active');
        if (form === 'cone' && Setting.filters.form['cone']) el.classList.add('active');
        if (form === 'star' && Setting.filters.form['star']) el.classList.add('active');
        if (form === 'figure' && Setting.filters.form['figure']) el.classList.add('active');

      });

      const colors = document.querySelectorAll('.select__color .color');
      colors.forEach((el: Element) => {
        const target = el as HTMLElement & { dataset: Record<string, string> };
        const { color } = target.dataset;

        if (color === 'white' && Setting.filters.color['white']) el.classList.add('active');
        if (color === 'yellow' && Setting.filters.color['yellow']) el.classList.add('active');
        if (color === 'red' && Setting.filters.color['red']) el.classList.add('active');
        if (color === 'blue' && Setting.filters.color['blue']) el.classList.add('active');
        if (color === 'green' && Setting.filters.color['green']) el.classList.add('active');

      });

      const sizes = document.querySelectorAll('.select__size .size');
      sizes.forEach((el: Element) => {
        const target = el as HTMLElement & { dataset: Record<string, string> };
        const { size } = target.dataset;

        if (size === 'big' && Setting.filters.size['big']) el.classList.add('active');
        if (size === 'medium' && Setting.filters.size['medium']) el.classList.add('active');
        if (size === 'small' && Setting.filters.size['small']) el.classList.add('active');

      });

      const favoriteX = document.querySelector('#chbx-favor');

      if (favoriteX && Setting.filters.favorite) {
        const target = favoriteX as HTMLElement & { checked: boolean }
        console.dir(favoriteX);
        target.checked = true;
      }

    }

    const forms = document.querySelectorAll('.select__form .form');
    forms.forEach((el: Element) => {

      el.addEventListener('click', (ev: Event) => {

        const target = ev.target as HTMLElement & { dataset: Record<string, string> };
        const { form } = target.dataset;
        target.classList.toggle('active');
        if (form === 'ball') Setting.filters.form['ball'] = Setting.filters.form['ball'] ? false : true;
        if (form === 'bell') Setting.filters.form['bell'] = Setting.filters.form['bell'] ? false : true;
        if (form === 'cone') Setting.filters.form['cone'] = Setting.filters.form['cone'] ? false : true;
        if (form === 'star') Setting.filters.form['star'] = Setting.filters.form['star'] ? false : true;
        if (form === 'figure') Setting.filters.form['figure'] = Setting.filters.form['figure'] ? false : true;

        this.showToys(Module.filterAll());
      });
    });

    const colors = document.querySelectorAll('.select__color .color');
    colors.forEach((el: Element) => {
      // console.log(el);
      el.addEventListener('click', (ev: Event) => {

        const target = ev.target as HTMLElement & { dataset: Record<string, string> };
        const { color } = target.dataset;
        target.classList.toggle('active');
        if (color === 'white') Setting.filters.color['white'] = Setting.filters.color['white'] ? false : true;
        if (color === 'yellow') Setting.filters.color['yellow'] = Setting.filters.color['yellow'] ? false : true;
        if (color === 'red') Setting.filters.color['red'] = Setting.filters.color['red'] ? false : true;
        if (color === 'blue') Setting.filters.color['blue'] = Setting.filters.color['blue'] ? false : true;
        if (color === 'green') Setting.filters.color['green'] = Setting.filters.color['green'] ? false : true;

        this.showToys(Module.filterAll());
      });
    });

    const sizes = document.querySelectorAll('.select__size .size');

    sizes.forEach((el: Element) => {
      // console.log(el);
      el.addEventListener('click', (ev: Event) => {

        const target = ev.target as HTMLElement & { dataset: Record<string, string> };
        const { size } = target.dataset;
        target.classList.toggle('active');
        if (size === 'big') Setting.filters.size['big'] = Setting.filters.size['big'] ? false : true;
        if (size === 'medium') Setting.filters.size['medium'] = Setting.filters.size['medium'] ? false : true;
        if (size === 'small') Setting.filters.size['small'] = Setting.filters.size['small'] ? false : true;

        this.showToys(Module.filterAll());
      });
    });

    const favoriteX = document.querySelector('#chbx-favor');

    if (favoriteX) {
      favoriteX.addEventListener('click', (ev: Event) => {
        const target = ev.target as HTMLElement & { checked: string };
        Setting.filters.favorite = Boolean(target.checked);
        this.showToys(Module.filterAll());
      });
    };

    document.querySelector('.select__reset')?.addEventListener('click', (el) => {
      const sort = Setting.filters.sort;
      Setting.filters = Setting.filtersDefault;
      Setting.filters.sort = sort;
      View.renderSelectPage();
    })

    document.querySelector('#sort-metod')?.addEventListener('change', (el) => {

      const target = el.target as HTMLElement & { value: "name-up" | "name-down" | "count-up" | "count-down" };
      console.log(target.value);
      Setting.filters.sort = target.value;
      this.showToys(Module.filterAll());
    })

    this.showToys(Module.filterAll());

    document.querySelector('.select__toys')?.addEventListener('click', (el) => {

      const target = el as Event & { path: HTMLElement[] };
      target.path.forEach((el) => {
        if (el.classList?.contains('select__card')) {
          const { num } = el.dataset;

          // Module.selected.push(el.dataset);
          if (num) {
            if (Module.selected.includes(num)) {
              Module.selected.splice(Module.selected.indexOf(num), 1);
              el.classList?.remove('active');
            } else if (Module.selected.length <= 19) {
              Module.selected.push(num);
              el.classList?.add('active');
            } else if (Module.selected.length >= 20) {

              alert('Все слоты заполнены');
            }
          }
          if (document.querySelector('.header__count-toys')) document.querySelector('.header__count-toys')!.textContent = String(Module.selected.length);
        }
      })
    })
  }

  static showToys(data: DataToy[]): void {
    const container: HTMLElement | null = document.querySelector('.select__toys');

    if (container) {
      container.innerHTML = '';
      if (data.length === 0) {
        console.log('Извините, совпадений не обнаружено');
        container.innerHTML = `
        <div class="text-no-select-toys">Извините, совпадений не обнаружено</div>
        `;
      }
      data.forEach((el: DataToy) => {
        container.innerHTML += `
        <div class="select__card${Module.selected.includes(el.num) ? ' active' : ''}" data-num="${el.num}">
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

export { View };


