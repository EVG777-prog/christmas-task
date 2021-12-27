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
  static reset = false;

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
  static saveData(): void {
    localStorage.setItem('data', JSON.stringify(Module.data));
  }
  static loadData(): void {
    const data = localStorage.getItem('data');
    if (data) Module.data = JSON.parse(data);
  }
  static saveCurrentTree(): void {
    localStorage.setItem('currentTree', JSON.stringify(Module.currentTreeSection));
  }
  static loadCurrentTree(): void {
    const tree = localStorage.getItem('currentTree');
    if (tree) Module.currentTreeSection = JSON.parse(tree);
  }
  static saveAll(): void {
    this.saveSelectedToys();
    this.saveFilters();
    this.saveData();
    this.saveCurrentTree();
  }
  static loadAll(): void {
    this.loadSelectedToys();
    this.loadFilters();
    this.loadData();
    this.loadCurrentTree();
  }

  static resetAll(): void {
    localStorage.clear();
    Setting.reset = true;
    location.reload();
  }

}




export { Filters, Setting };