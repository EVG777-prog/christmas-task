import { Module } from "./module";
import { data } from "./data";
import { Router } from "./router";
import { View } from "./view";
import { Setting } from "./setting";

import { homePageHTML } from "./pages/home";

const router = new Router();

View.renderHomePage();

Setting.loadFilters();

window.addEventListener('beforeunload', () => {
  Setting.saveFilters();
})

document.querySelector('.header__search')?.addEventListener('input', (el) => {

  const target = el.target as HTMLElement & { value: string };

  if (window.location.hash !== '#select') View.renderSelectPage();

  View.showToys(Module.searchNameToys(target.value));
})

console.log(`
Доброго времени суток!
`)