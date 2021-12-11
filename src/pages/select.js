const selectPage = `
<div class="select">
<div class="select__setting">
    <div class="select__sort">
        <p>Сортировка</p>
        <select name="select__sort-metod" id="sort-metod">
            <option value="a-to-z">По названию от "А" до "Я"</option>
            <option value="z-to-a">По названию от "Я" до "А"</option>
            <option value="count-to-bigger">По количеству по возрастанию</option>
            <option value="count-to-smaller">По количеству по убыванию</option>
        </select>
    </div>
    <div class="select__form">
        <p>Форма:</p>
        <div class="form ball"></div>
        <div class="form bell"></div>
        <div class="form cone"></div>
        <div class="form star"></div>
        <div class="form figure"></div>
    </div>
    <div class="select__color">
        <p>Цвет:</p>
        <div class="color white"></div>
        <div class="color yellow"></div>
        <div class="color red"></div>
        <div class="color blue"></div>
        <div class="color green"></div>
    </div>
    <div class="select__size">
        <p>Размер:</p>
        <div class="size big"></div>
        <div class="size medium"></div>
        <div class="size small"></div>
    </div>
    <div class="select__favorite">
        <p>Только любимые:</p>
        <input type="checkbox">
    </div>
    <div class="select__count">
        <p>Количество экземпляров:</p>
        <div class="select__range range-count"></div>
    </div>
    <div class="select__year">
        <p>Год приобретения:</p>
        <div class="select__range range-year"></div>
    </div>
    <div class="select__reset"></div>

</div>
<div class="select__toys"></div>
</div>
`;