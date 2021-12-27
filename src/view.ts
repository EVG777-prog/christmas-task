import { homePageHTML } from "./pages/home";
import { treePageHTML } from "./pages/tree";
import { selectPageHTML } from "./pages/select";
import { Setting } from "./setting";
import { DataToy } from "./data";
import { Module } from "./module";

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

class View {

  static renderHomePage(): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) main.innerHTML = homePageHTML;

    document.querySelector('.home-page__btn-start')?.addEventListener('click', (el) => {
      window.location.hash = '#select';
    });
  }

  static renderTreePage(): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) main.innerHTML = treePageHTML;

    renderSelectedToys();
    function renderSelectedToys(): void {
      // заполняем отобранными игрушками
      const treeToys: HTMLElement | null = document.querySelector('.tree__toys-selected');
      if (treeToys) treeToys.innerHTML = '';
      if (Module.selected.length > 0) {
        Module.selected.forEach((el) => {
          if (treeToys) treeToys.innerHTML += `
        <div class="toy-selected">
            <img src="../assets/toys/${el}.png" alt="pict" draggable="true" data-num="${el}">
            <div class="toy-selected__count">${Module.data[+el - 1].count}</div>
        </div>
        `;
        });
      } else {
        for (let i = 0; i < 20; i++) {
          if (treeToys) treeToys.innerHTML += `
        <div class="toy-selected">
            <img src="../assets/toys/${i + 1}.png" alt="pict" draggable="true" data-num="${i + 1}">
            <div class="toy-selected__count">${Module.data[i].count}</div>
        </div>
        `;
        }
      }
    }

    // отслеживаем начало перемещения (drag) игрушек на елку
    drag();
    function drag(): void {
      const toys = document.querySelectorAll('.toy-selected img');

      if (toys) {
        toys.forEach((el) => {
          el.addEventListener('dragstart', (el2) => {
            const item = el2 as DragEvent;
            const target = el2.target as EventTarget & { dataset: Record<string, string> };
            const { num } = target.dataset;
            if (item.dataTransfer) item.dataTransfer.setData('id', num);
            if (item.dataTransfer) item.dataTransfer.setData('out', 'true');
            if (item.dataTransfer) item.dataTransfer.setData('offsetX', String(item.offsetX));
            if (item.dataTransfer) item.dataTransfer.setData('offsetY', String(item.offsetY));
          });
        })
      }


    }

    // вешаем слушатели на выбор елки
    const selectTrees: NodeListOf<Element> | null = document.querySelectorAll('.tree__select-tree .tree-example');
    if (selectTrees) {
      selectTrees.forEach((el) => {
        el.addEventListener('click', (el2) => {
          const target = el2.target as HTMLElement & { dataset: Record<string, string> };
          const { tree } = target.dataset;
          Module.currentTreeSection.tree = tree;
          // if (document.querySelector('.tree__picture')) document.querySelector('.tree__picture')!.innerHTML = `
          // <img src="../assets/tree/${tree}.png" alt="Tree">
          // `;

          renderTreeSection();
        });
      });
    }
    // вешаем слушатели на выбор фона
    const selectBG: NodeListOf<Element> | null = document.querySelectorAll('.tree__select-bg .bg');
    if (selectBG) {
      selectBG.forEach((el) => {
        el.addEventListener('click', (el2) => {
          const target = el2.target as HTMLElement & { dataset: Record<string, string> };
          const { bg } = target.dataset;
          Module.currentTreeSection.bgImage = bg;
          renderTreeSection();
          // const target2 = document.querySelector('.tree__picture') as HTMLElement & { style: CSSStyleDeclaration };
          // target2.style.backgroundImage = `url("../assets/bg/${bg}.jpg")`;
        });
      });
    }

    // рендер секции с елкой, которую наряжаем
    renderTreeSection();
    function renderTreeSection(): void {
      // отображаем фон
      const treeContainer = document.querySelector('.tree__picture') as HTMLElement & { style: CSSStyleDeclaration };
      treeContainer.style.backgroundImage = `url("../assets/bg/${Module.currentTreeSection.bgImage}.jpg")`;

      // отображаем елку
      if (treeContainer) treeContainer.innerHTML = `
      <img id="tree-picture" src="../assets/tree/${Module.currentTreeSection.tree}.png" alt="Tree">
      <div class="tree__toys-on"></div>
      `;

      // отображаем игрушки
      if (Module.currentTreeSection.toys.length > 0) {
        const toyOn = document.querySelector('.tree__toys-on');

        if (toyOn) toyOn.innerHTML = '';
        Module.currentTreeSection.toys.forEach((el, i) => {

          toyOn!.innerHTML += `
            <img class="toy-on-tree" src="../assets/toys/${el.numberToy}.png" data-num="${el.numberToy}" data-numi="${i}" alt="pict" draggable="true" style="top: ${el.position[1]}px; left: ${el.position[0]}px;">
            `;
        });
      }

      // отслеживаем "бросания" (drop) на елку
      const tree = document.querySelector('#tree-picture');
      if (tree) tree.addEventListener('dragover', (ev) => {
        ev.preventDefault()
      })
      if (tree) tree.addEventListener('drop', (el) => {
        const target = el as DragEvent & { layerX: string, layerY: string };
        const outToy = target.dataTransfer?.getData('out');

        if (outToy == 'true') {
          const id: string | undefined = target.dataTransfer?.getData('id');
          if (id && +Module.data[+id - 1].count > 0) {
            Module.currentTreeSection.toys.push({
              numberToy: `${target.dataTransfer?.getData('id')}`,
              position: [+`${target.layerX}` - +target.dataTransfer!.getData('offsetX'), +`${target.layerY}` - +target.dataTransfer!.getData('offsetY')]
            });
            const oldCount: number = (+Module.data[+id - 1].count);
            Module.data[+id - 1].count = String(oldCount - 1);

          }
        } else if (outToy == 'false') {
          Module.currentTreeSection.toys[+target.dataTransfer?.getData('id')!].position = [+`${target.layerX}` - +target.dataTransfer!.getData('offsetX'), +`${target.layerY}` - +target.dataTransfer!.getData('offsetY')];
        }
        View.renderTreePage();
      });

      // отслеживаем начало перемещения игрушек с елки
      dragToy();
      function dragToy(): void {
        const toys = document.querySelectorAll('.toy-on-tree');
        if (toys) {
          toys.forEach((el) => {
            el.addEventListener('dragstart', (el2) => {
              const item = el2 as DragEvent;
              const target = el2.target as EventTarget & { dataset: Record<string, string> };
              const { numi } = target.dataset;

              if (item.dataTransfer) item.dataTransfer.setData('id', numi);
              if (item.dataTransfer) item.dataTransfer.setData('out', 'false');
              if (item.dataTransfer) item.dataTransfer.setData('offsetX', String(item.offsetX));
              if (item.dataTransfer) item.dataTransfer.setData('offsetY', String(item.offsetY));
              el.addEventListener('dragend', (el3) => {
                const target = el3 as DragEvent;
                if (target.dataTransfer?.dropEffect == 'none') {
                  const numToy: number = +Module.currentTreeSection.toys[+numi].numberToy;
                  Module.data[numToy - 1].count = String(+Module.data[numToy - 1].count + 1);
                  Module.currentTreeSection.toys.splice(+numi, 1);
                  View.renderTreePage();
                }
              })
            });
          })
        }
      }




    }
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

    document.querySelector('.select__reset.reset-filters')?.addEventListener('click', (el) => {
      const sort = Setting.filters.sort;
      Setting.filters = JSON.parse(JSON.stringify(Setting.filtersDefault));
      Setting.filters.sort = sort;
      View.renderSelectPage();
    })
    document.querySelector('.select__reset.reset-ls')?.addEventListener('click', (el) => {
      localStorage.clear();
      Module.selected = [];
      Setting.filters = JSON.parse(JSON.stringify(Setting.filtersDefault));
      if (document.querySelector('.header__count-toys')) {
        document.querySelector('.header__count-toys')!.textContent = String(Module.selected.length);
      }
      View.renderSelectPage();

    })

    document.querySelector('#sort-metod')?.addEventListener('change', (el) => {
      const target = el.target as HTMLElement & { value: "name-up" | "name-down" | "count-up" | "count-down" };
      Setting.filters.sort = target.value;
      this.showToys(Module.filterAll());
    })

    this.showToys(Module.filterAll());

    document.querySelector('.select__toys')?.addEventListener('click', (el) => {

      const target = el as Event & { path: HTMLElement[] };
      target.path.forEach((el) => {
        if (el.classList?.contains('select__card')) {
          const { num } = el.dataset;

          if (num) {
            if (Module.selected.includes(num)) {
              Module.selected.splice(Module.selected.indexOf(num), 1);
              el.classList?.remove('active');
            } else if (Module.selected.length <= 19) {
              Module.selected.push(num);
              el.classList?.add('active');
            } else if (Module.selected.length >= 20) {
              document.querySelector('.error-message')?.classList.add('active');
              setTimeout(() => {
                document.querySelector('.error-message')?.classList.remove('active');
              }, 2000);

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


