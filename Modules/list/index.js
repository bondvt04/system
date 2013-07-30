Modules.list =  Modules.createNewModule(); // создать модуль
Modules.list.addViewEventListener('body', 'move', 'moveContent');  // при клике на теле окна перекрывающем остальной контент закрыть окно . если другие элементы слушать на закрытие добавить их расширив клон
Modules.list.setTemplateUrl('./Modules/list/index.html', './Modules/list/style.css');    // подгрузить шаблон окна "возможно рюшечки нужны будут"

Modules.list.addEventListener('clickElement', function(){alert('click')}, ['afterClick']);

Modules.list.events.rendered = function(data){
    // добавить цсс

    /*
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", this._settings.templateCSS);
    document.getElementsByTagName('head')[0].appendChild(css);
    */



    // указатели на элементы
    document.getElementById(this.that.container).innerHTML = data;

    this.that._settings.list = document.getElementById(this.that.container).getElementsByClassName('list')[0];
    this.that._settings.list_wrapper = document.getElementById(this.that.container).getElementsByClassName('list-wrapper')[0];
    this.that._settings.list_conten = document.getElementById(this.that.container).getElementsByClassName('list-content')[0];
    this.that._settings.listVerticalScrollLine = document.getElementById(this.that.container).getElementsByClassName('listVerticalScrollLine')[0];
    this.that._settings.listVerticalScrollBar = document.getElementById(this.that.container).getElementsByClassName('listVerticalScrollBar')[0];


    this.that._settings.list.style.width = this.that._settings.windowWidth + 'px';
    this.that._settings.list.style.height = this.that._settings.windowHeight + 'px';

    this.that._settings.widthVerticalScrollLine = this.that._settings.listVerticalScrollLine.offsetWidth;
    this.that._settings.list_wrapper.style.width = this.that._settings.windowWidth - this.that._settings.widthVerticalScrollLine + 'px';

    this.that._settings.list_conten.style.width = this.that._settings.windowWidth - this.that._settings.widthVerticalScrollLine + 'px';

    if(this.that._settings.verticalScroll != 'none'){
        this.that._settings.listVerticalScrollLine.display = 'block';
        this.that._settings.heightVerticalScrollLine = this.that._settings.listVerticalScrollLine.offsetHeight;
        this.that._settings.listVerticalScrollLine.style.height = this.that._settings.heightVerticalScrollLine + 'px';
    }


    // вызвать метод заполнения

    // если ресайзебл  поменять размеры   иначе просто вычислить




    if(this.that._settings.verticalScroll == 'resizeable'){

        // узнать длинну массива массивов

    }


    // выравнивание скорости з счёт запоминания тайм стампов последних и подгонки смещения
};