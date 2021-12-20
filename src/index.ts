

import { Module } from "./module";
import { data } from "./data";
import { Router } from "./router";
import { View } from "./view";

import { homePageHTML } from "./pages/home";

const router = new Router();

View.renderHomePage();






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





export { Filters, settingFilters };

console.log(`
Доброго времени суток!
Фильтры пока работают только по форме, количеству и году.
Пока не работает сортировка, частично фильтры и поиск, если получится, проверте попозже, заранее благодарен!
`)