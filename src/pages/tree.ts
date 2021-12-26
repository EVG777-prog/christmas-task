const treePageHTML: string = `
<div class="container tree">
<div class="container tree__setting">
    <div class="tree__select-tree_text">Выберите елку</div>
    <div class="tree__select-tree">
        <div class="tree-example num1" data-tree="1"></div>
        <div class="tree-example num2" data-tree="2"></div>
        <div class="tree-example num3" data-tree="3"></div>
        <div class="tree-example num4" data-tree="4"></div>
        <div class="tree-example num5" data-tree="5"></div>
        <div class="tree-example num6" data-tree="6"></div>
    </div>
    <div class="tree__select-tree_text">Выберите фон</div>
    <div class="tree__select-bg">
        <div class="bg num1" data-bg="1"></div>
        <div class="bg num2" data-bg="2"></div>
        <div class="bg num3" data-bg="3"></div>
        <div class="bg num4" data-bg="4"></div>
        <div class="bg num5" data-bg="5"></div>
        <div class="bg num6" data-bg="6"></div>
        <div class="bg num7" data-bg="7"></div>
        <div class="bg num8" data-bg="8"></div>
        <div class="bg num9" data-bg="9"></div>
        <div class="bg num10" data-bg="10"></div>
    </div>
    <div class="tree__select-tree_text">Гирлянда</div>
    <div class="tree__select-garland">
        <div class="garland num1"></div>
        <div class="garland num2"></div>
        <div class="garland num3"></div>
        <div class="garland num4"></div>
        <div class="garland num5"></div>
        <input type="checkbox">
    </div>
</div>
<div class="main-tree-container">
        
</div>

<div class="container tree__picture">
<!-- <map name="tree-map">
<area shape="poly" coords="365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664">
</map> -->
    <img id="tree-picture" src="assets/tree/3.png" class="main-tree" usemap="#tree-map" alt="tree">   
    <div class="tree__toys-on"></div>
</div>

<div class="container tree__toys">
    <div class="tree__select-tree_text">Игрушки</div>
    <div class="tree__toys-selected">
        
    </div>
    <div class="tree__select-tree_text">Вы нарядили</div>
    <div class="tree__decorate">
        <div class="tree-example num1"></div>
        <div class="tree-example num2"></div>
        <div class="tree-example num3"></div>
        <div class="tree-example num4"></div>
        <div class="tree-example num5"></div>
        <div class="tree-example num6"></div>
    </div>
</div>
</div>
`;

export { treePageHTML };