import { Filters, settingFilters } from "./index";

import { data, DataToy } from "./data";

class Module {

  data: Array<DataToy>;

  constructor(data: Array<DataToy>) {
    this.data = data;
  }

  static filterAll(): Array<DataToy> {
    let result: DataToy[] = data;

    result = this.filterCount(result, settingFilters.count);
    result = this.filterYear(result, settingFilters.year);
    result = this.filterShape(result);

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

    if (Object.values(settingFilters.form).includes(true)) {
      if (settingFilters.form.ball) result = result.concat(data.filter((el: DataToy) => el.shape === 'шар'));
      if (settingFilters.form.bell) result = result.concat(data.filter((el: DataToy) => el.shape === 'колокольчик'));
      if (settingFilters.form.star) result = result.concat(data.filter((el: DataToy) => el.shape === 'снежинка'));
      if (settingFilters.form.figure) result = result.concat(data.filter((el: DataToy) => el.shape === 'фигурка'));
      if (settingFilters.form.cone) result = result.concat(data.filter((el: DataToy) => el.shape === 'шишка'));
    } else {
      result = result.concat(data.filter((el: DataToy) => el.shape === 'шар'));
      result = result.concat(data.filter((el: DataToy) => el.shape === 'колокольчик'));
      result = result.concat(data.filter((el: DataToy) => el.shape === 'снежинка'));
      result = result.concat(data.filter((el: DataToy) => el.shape === 'фигурка'));
      result = result.concat(data.filter((el: DataToy) => el.shape === 'шишка'));
    }

    return result;
  }


}


export { Module };