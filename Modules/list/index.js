Modules.list =  Modules.createNewModule(); // создать модуль
Modules.list.addViewEventListener('body', 'move', 'moveContent');  // при клике на теле окна перекрывающем остальной контент закрыть окно . если другие элементы слушать на закрытие добавить их расширив клон
Modules.list.setTemplateUrl('./Modules/list/index.html', './Modules/list/style.css');    // подгрузить шаблон окна "возможно рюшечки нужны будут"

Modules.list.addEventListener('clickElement', function(){alert('click')}, ['afterClick']);

// метод заполнения

Modules.list.changeVerticalScrollBar = function (){

    this.that._settings.scrollBarHeight =  (this.that._settings.windowHeight / this.that._settings.list_conten.offsetHeight())*this.that._settings.windowHeight;

    if(this.that._settings.scrollBarHeight < this.that._settings.windowHeight){
        this.that._settings.listVerticalScrollBar.style.top = this.that._settings.scrollBarHeight + 'px';
    }
    else{
        this.that._settings.listVerticalScrollBar.style.display = 'none';
    }
};
Modules.list.insertItems = function(){

    // получить шаблон
    var that = this;

    var elemHTML = document.createElement("script");

    elemHTML.onerror = function(){throw (template.urlHTML +' no shablon')};

    elemHTML.onload=function(){

        that._settings.Template = getHTML();

        that._settings.loadTemplate = true;

        // заполнять пока не станет больше чем  размер окна или не закончится -прерывания после каждого на отрисовку  -запомнить размер и поставит его жестко
        // запомнить счётчик
        // запомнить количество общее

    };

    elemHTML.src = this._settings.templateURL;
    document.getElementsByTagName('head')[0].appendChild(elemHTML);



};

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

    this.that._settings.list = document.getElementById(this.that.container).getElementsByClassName('list')[0];  // не нужен           -поставить жестко      высоту ширину
    this.that._settings.list_wrapper = document.getElementById(this.that.container).getElementsByClassName('list-wrapper')[0];     // не нужен         -поставить жестко      высоту ширину
    this.that._settings.list_conten = document.getElementById(this.that.container).getElementsByClassName('list-content')[0];      //  -поставить жестко      высоту ширину
    this.that._settings.listVerticalScrollLine = document.getElementById(this.that.container).getElementsByClassName('listVerticalScrollLine')[0]; // не нужен   -поставить жестко      высоту ширину
    this.that._settings.listVerticalScrollBar = document.getElementById(this.that.container).getElementsByClassName('listVerticalScrollBar')[0];  //  -поставить жестко      высоту ширину


    this.that._settings.list.style.width = this.that._settings.windowWidth;
    this.that._settings.list.style.height = this.that._settings.windowHeight;


    this.that._settings.list_wrapper.style.width = parseInt(this.that._settings.windowWidth) - parseInt(this.that._settings.verticalScrollWidth)  + 'px';

    this.that._settings.list_conten.style.width = this.that._settings.windowWidth - this.that._settings.widthVerticalScrollLine + 'px';




    if(this.that._settings.verticalScroll != 'none'){

        this.that._settings.listVerticalScrollLine.display = 'block';
        this.that._settings.heightVerticalScrollLine = parseInt(this.that._settings.windowHeight);

        this.that._settings.scrollHeight = this.that._settings.listVerticalScrollLine.offsetHeight();
        this.that._settings.scrollBarTop = 0;

    }


    // вызвать метод заполнения
    this.insertItems();

    //TODO всегда разрывать чтобы браузер мог отрисоваться с жесткими параметрами

    // если ресайзебл  поменять размеры   иначе просто вычислить
    if(this.that._settings.verticalScroll == 'resizeable'){

        this.changeVerticalScrollBar();
    }



};

// выравнивание скорости з счёт запоминания тайм стампов последних и подгонки смещения