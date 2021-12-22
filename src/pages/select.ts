const selectPageHTML: string = `
<div class="container select">
<div class="select__setting">
    <div class="container select__sort">
        <p>Сортировка</p>
        <select name="select__sort-metod" id="sort-metod">
        <option value="name-up">По названию от "А" до "Я"</option>
        <option value="name-down">По названию от "Я" до "А"</option>
        <option value="count-up">По количеству по возрастанию</option>
        <option value="count-down">По количеству по убыванию</option>
    </select>
    </div>
    <div class="container select__form">
        <p>Форма:</p>
        <div class="form ball" data-form="ball"></div>
        <div class="form bell" data-form="bell"></div>
        <div class="form cone" data-form="cone"></div>
        <div class="form star" data-form="star"></div>
        <div class="form figure" data-form="figure"></div>
    </div>
    <div class="container select__color">
        <p>Цвет:</p>
        <div class="color white" data-color="white"></div>
        <div class="color yellow" data-color="yellow"></div>
        <div class="color red" data-color="red"></div>
        <div class="color blue" data-color="blue"></div>
        <div class="color green" data-color="green"></div>
    </div>
    <div class="container select__size">
        <p>Размер:</p>
        <div class="size big" data-size="big"></div>
        <div class="size medium" data-size="medium"></div>
        <div class="size small" data-size="small"></div>
    </div>
    <div class="container select__favorite">
        <p>Только любимые:</p>
        <input id="chbx-favor" class="checkbox-favorite" type="checkbox">
        <label for="chbx-favor"></label>
    </div>
    <div class="container select__count">
        <p>Количество экземпляров:</p>
        <div class="container select__count-line">
            <div class="select__text start">1</div>
            <div id="range-count" class="select__range range-count"></div>
            <div class="select__text end">12</div>
        </div>

    </div>
    <div class="container select__year">
        <p>Год приобретения:</p>
        <div class="container select__count-line">
            <div class="select__text start">1940</div>
            <div id="range-year" class="select__range range-year"></div>
            <div class="select__text end">2020</div>
        </div>

    </div>
    <div class="container select__reset">Сброс фильтров</div>

</div>
<div class="container select__toys">
 
</div>
</div>
`;

export { selectPageHTML };