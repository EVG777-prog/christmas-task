import { Filters, settingFilters } from "./index";

import { DataToy } from "./data";

class Module {

  data: Array<DataToy>;

  constructor(data: Array<DataToy>) {
    this.data = data;
  }

  filterCount(data: Array<DataToy>, numStart: number, numEnd: number): Array<DataToy> {
    return data.filter((el: DataToy) => {
      +el.count >= numStart && +el.count <= numEnd;
    });
  }

  filterYear(data: Array<DataToy>, yearStart: number, yearEnd: number): Array<DataToy> {
    return data.filter((el: DataToy) => {
      +el.year >= yearStart && +el.year <= yearEnd;
    });
  }

  filterShape(data: Array<DataToy>,): Array<DataToy> {

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