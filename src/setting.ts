import { Module } from "./module";

interface Filters {
  sort: 'name-up' | 'name-down' | 'count-up' | 'count-down',
  form: { 'ball': boolean, 'bell': boolean, 'cone': boolean, 'star': boolean, 'figure': boolean },
  color: { 'white': boolean, 'yellow': boolean, 'red': boolean, 'blue': boolean, 'green': boolean },
  size: { 'big': boolean, 'medium': boolean, 'small': boolean },
  favorite: boolean,
  count: [number, number],
  year: [number, number],
}

class Setting {
  static filters: Filters = {
    sort: 'name-up',
    form: { 'ball': false, 'bell': false, 'cone': false, 'star': false, 'figure': false },
    color: { 'white': false, 'yellow': false, 'red': false, 'blue': false, 'green': false },
    size: { 'big': false, 'medium': false, 'small': false },
    favorite: false,
    count: [1, 12],
    year: [1940, 2020],
  }
  static filtersDefault: Filters = {
    sort: 'name-up',
    form: { 'ball': false, 'bell': false, 'cone': false, 'star': false, 'figure': false },
    color: { 'white': false, 'yellow': false, 'red': false, 'blue': false, 'green': false },
    size: { 'big': false, 'medium': false, 'small': false },
    favorite: false,
    count: [1, 12],
    year: [1940, 2020],
  }

  static resetFilters(): void {
    this.filters = this.filtersDefault;
  }
  static saveFilters(): void {
    localStorage.setItem('filters', JSON.stringify(this.filters));
  }
  static loadFilters(): void {
    const filters = localStorage.getItem('filters');
    if (filters) this.filters = JSON.parse(filters);
  }
  static saveSelectedToys(): void {
    localStorage.setItem('selectedToys', JSON.stringify(Module.selected));
  }
  static loadSelectedToys(): void {
    const selectedToys = localStorage.getItem('selectedToys');
    if (selectedToys) Module.selected = JSON.parse(selectedToys);
  }
  static saveAll(): void {
    this.saveSelectedToys();
    this.saveFilters();
  }
  static loadAll(): void {
    this.loadSelectedToys();
    this.loadFilters();
  }

}




export { Filters, Setting };