import { Setting } from "./setting";

import { data, DataToy } from "./data";

interface ToyPosition {
  numberToy: string,
  position: [number, number]
}
interface TreeSection {
  bgImage: string,
  tree: string,
  toys: ToyPosition[];
}

class Module {
  static selected: string[] = [];
  static currentTreeSection: TreeSection = {
    bgImage: '5',
    tree: '5',
    toys: [
      //   {
      //   numberToy: '5',
      //   position: [200, 200]
      // }
    ],
  };
  data: Array<DataToy>;

  constructor(data: Array<DataToy>) {
    this.data = data;
  }

  static filterAll(): Array<DataToy> {
    let result: DataToy[] = data;

    result = this.filterCount(result, Setting.filters.count);
    result = this.filterYear(result, Setting.filters.year);
    result = this.filterShape(result);
    result = this.filterColor(result);
    result = this.filterSize(result);
    result = this.filterFavorite(result);

    result = this.sort(result, Setting.filters.sort);

    return result;
  }

  static searchNameToys(name: string): Array<DataToy> {
    let result: DataToy[] = Module.filterAll().filter((el: DataToy) => el.name.toLowerCase().includes(name.toLowerCase()));
    return result;
  }

  static filterCount(data: Array<DataToy>, count: number[]): Array<DataToy> {
    const numStart: number = count[0];
    const numEnd: number = count[1];

    const result: DataToy[] = data.filter((el: DataToy) => {
      return (+el.count >= numStart) && (+el.count <= numEnd);
    });

    return result;
  }

  static filterYear(data: Array<DataToy>, year: number[]): Array<DataToy> {
    const yearStart: number = year[0];
    const yearEnd: number = year[1];

    return data.filter((el: DataToy) => {
      return (+el.year >= yearStart) && (+el.year <= yearEnd);
    });
  }

  static filterShape(data: Array<DataToy>): Array<DataToy> {

    let result: DataToy[] = [];

    if (Object.values(Setting.filters.form).includes(true)) {
      if (Setting.filters.form.ball) result = result.concat(data.filter((el: DataToy) => el.shape === 'шар'));
      if (Setting.filters.form.bell) result = result.concat(data.filter((el: DataToy) => el.shape === 'колокольчик'));
      if (Setting.filters.form.star) result = result.concat(data.filter((el: DataToy) => el.shape === 'снежинка'));
      if (Setting.filters.form.figure) result = result.concat(data.filter((el: DataToy) => el.shape === 'фигурка'));
      if (Setting.filters.form.cone) result = result.concat(data.filter((el: DataToy) => el.shape === 'шишка'));
    } else {
      result = data;
    }

    return result;
  }

  static filterColor(data: Array<DataToy>): Array<DataToy> {

    let result: DataToy[] = [];

    if (Object.values(Setting.filters.color).includes(true)) {
      if (Setting.filters.color.white) result = result.concat(data.filter((el: DataToy) => el.color === 'белый'));
      if (Setting.filters.color.yellow) result = result.concat(data.filter((el: DataToy) => el.color === 'желтый'));
      if (Setting.filters.color.red) result = result.concat(data.filter((el: DataToy) => el.color === 'красный'));
      if (Setting.filters.color.blue) result = result.concat(data.filter((el: DataToy) => el.color === 'синий'));
      if (Setting.filters.color.green) result = result.concat(data.filter((el: DataToy) => el.color === 'зелёный'));
    } else {
      result = data;
    }
    return result;
  }

  static filterSize(data: Array<DataToy>): Array<DataToy> {

    let result: DataToy[] = [];

    if (Object.values(Setting.filters.size).includes(true)) {
      if (Setting.filters.size.big) result = result.concat(data.filter((el: DataToy) => el.size === 'большой'));
      if (Setting.filters.size.medium) result = result.concat(data.filter((el: DataToy) => el.size === 'средний'));
      if (Setting.filters.size.small) result = result.concat(data.filter((el: DataToy) => el.size === 'малый'));

    } else {
      result = data;
    }
    return result;
  }

  static filterFavorite(data: Array<DataToy>): Array<DataToy> {

    let result: DataToy[] = [];

    if (Setting.filters.favorite) {
      result = data.filter((el: DataToy) => el.favorite === true);
    } else {
      result = data;
    }
    return result;
  }

  static sort(data: Array<DataToy>, sort: string): Array<DataToy> {

    let result: DataToy[] = [...data];

    switch (sort) {
      case "name-up":
        result = result.sort(function (a: DataToy, b: DataToy) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        });
        break;
      case "name-down":
        result = result.sort(function (a: DataToy, b: DataToy) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        }).reverse();
        break;
      case "count-up":
        result = result.sort((a: DataToy, b: DataToy) => {
          return +a.count - +b.count;
        });
        break;
      case "count-down":
        result = result.sort((a: DataToy, b: DataToy) => {
          return +b.count - +a.count;
        });
        break;
    }

    return result;
  }
}


export { Module };