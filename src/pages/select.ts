const selectPageHTML: string = `
<div class="container select">
<div class="select__setting">
    <div class="container select__sort">
        <p>Сортировка</p>
        <select name="select__sort-metod" id="sort-metod">
        <option value="a-to-z">По названию от "А" до "Я"</option>
        <option value="z-to-a">По названию от "Я" до "А"</option>
        <option value="count-to-bigger">По количеству по возрастанию</option>
        <option value="count-to-smaller">По количеству по убыванию</option>
    </select>
    </div>
    <div class="container select__form">
        <p>Форма:</p>
        <div class="form ball active"></div>
        <div class="form bell"></div>
        <div class="form cone"></div>
        <div class="form star"></div>
        <div class="form figure"></div>
    </div>
    <div class="container select__color">
        <p>Цвет:</p>
        <div class="color white"></div>
        <div class="color yellow active"></div>
        <div class="color red"></div>
        <div class="color blue"></div>
        <div class="color green"></div>
    </div>
    <div class="container select__size">
        <p>Размер:</p>
        <div class="size big active"></div>
        <div class="size medium"></div>
        <div class="size small"></div>
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
    <div class="select__card">
        <div class="select__card-name">Зеленый шар с цветами</div>
        <div class="container">
            <div class="select__card-img">
                <img src="/assets/toys/1.png" alt="picture">
            </div>
            <div class="select__card-text">
                <p>Количество: 5</p>
                <p>Год покупки: 2000</p>
                <p>Форма: шар</p>
                <p>Цвет: зеленый</p>
                <p>Размер: большой</p>
                <p>Любимая: нет</p>
            </div>

        </div>
    </div>
    <div class="select__card active">
        <div class="select__card-name">Зеленый шар с цветами</div>
        <div class="container">
            <div class="select__card-img">
                <img src="/assets/toys/1.png" alt="picture">
            </div>
            <div class="select__card-text">
                <p>Количество: 5</p>
                <p>Год покупки: 2000</p>
                <p>Форма: шар</p>
                <p>Цвет: зеленый</p>
                <p>Размер: большой</p>
                <p>Любимая: нет</p>
            </div>

        </div>
    </div>
</div>
</div>
`;

export { selectPageHTML };