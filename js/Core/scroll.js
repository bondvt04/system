//опрелделяет границы скрола -скролит   скрол только вертикальный

/// контейнер в каком контейнер со скролом какой сразу позициониру  шире родителя . при позиционировании берётся ширина родителя -ширина его скрола
 // или компонент вставляется шаблоном .....


// как ширина и высота и настройки вида скрола если он клонируется ?
//шаблон редактировать?  -в общей таблице стилей пренастраивается поскольку css грузить не будем а родитель есть при превом обращении поднимет в модуль если их тапм нет и будет с ними работать

 //TODO a я ведь стили могу подписывать зменять ... т.е каждому экземпляру клона я могу назначить свой стиль

// настраивается -ширина , высота , шаблон внешний для него в диве релятив , див с абсолютом
// подготавливается несколько для вставки в дом элементов
// настройка его содержит будет ли скройлер , будут ли размеры изменяемыми , его ширина и высота

// возможно формирование его динамически ?



Modules.scroll =  Modules.createNewModule(); // создать модуль
Modules.scroll.addViewEventListener('body', 'move', 'moveContent');  // при клике на теле окна перекрывающем остальной контент закрыть окно . если другие элементы слушать на закрытие добавить их расширив клон

Modules.scroll.setTemplateUrl('./serviceModules/window/index.html', './serviceModules/window/index.css');    // подгрузить шаблон окна "возможно рюшечки нужны будут"








Modules.scroll.events.rendered = function(){
    // добавить цсс
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", this._settings.templateCSS);
    document.getElementsByTagName('head')[0].appendChild(css);

    // изменить скролы
    // получить шаблон заполнить нужным количеством элементов   -пока  меньше по ширине и высоте родителя заполнять

    // могут быть не пикселы а проценты обработать умножить на размеры родителя записать пикселы  в эти свойства

    document.getElementById('scroller').style.width = this._settings.windowWidth + 'px';
    document.getElementById('scroller').style.height = this._settings.windowHeight + 'px';

    this._settings.widthVerticalScrollLine = document.getElementById('VerticalScrollLine').offsetWidth;
    this._settings.heightHorizontScrollLine = document.getElementById('HorizontScrollLine').offsetHeight;

    document.getElementById('scroller-wrapper').style.width = this._settings.windowWidth - this._settings.widthVerticalScrollLine + 'px';
    document.getElementById('scroller-wrapper').style.height = this._settings.windowHeight - this._settings.heightHorizontScrollLine + 'px';

    document.getElementById('scroller-content').style.width = this._settings.windowWidth - this._settings.widthVerticalScrollLine + 'px';
    document.getElementById('scroller-content').style.height = this._settings.windowHeight - this._settings.heightHorizontScrollLine + 'px';



    if(this._settings.verticalScroll != 'none'){
        document.getElementById('VerticalScrollLine').display = 'block';
        this._settings.heightVerticalScrollLine = document.getElementById('VerticalScrollLine').offsetHeight;
        document.getElementById('VerticalScrollLine').style.height = this._settings.heightVerticalScrollLine + 'px';
    }

    if(this._settings.horizontScroll != 'none'){
        document.getElementById('HorizontScrollLine').display = 'block';
        this._settings.widthHorizontScrollLine = this._settings.windowWidth - document.getElementById('VerticalScrollLine').offsetWidth;
        document.getElementById('HorizontScrollLine').style.width = this._settings.widthHorizontScrollLine + 'px';
    }

    // вызвать метод заполнения

    // если ресайзебл  поменять размеры   иначе просто вычислить


    if(this._settings.horizontScroll == 'resizeable'){

        // узнать максимальную ширину массива в массиве массивов

    }

    if(this._settings.verticalScroll == 'resizeable'){

        // узнать длинну массива массивов

    }

    //записать размеры  и положение скролбаров в сетиннгс

    // не ид должны быть , поскольку может быть несколько наследников селекторами стилей от родителя а в стилях классы
    // зная контейнер в нём искать по классу имени ? -посмотреть что элемент из них наследует из документа

    // данные записываются в клоне в данные
};

Modules.clone_scroll = Modules.scroll.createCloneModule ();  // наследник рендерится будет
Modules.clone_scroll.addModulesToAudition( Modules.clone_scroll);  // прослушивать свои события, если он будет слушать события других добавить их на прослушивание добавить их расширив клон


Modules.clone_scroll.setSettings({     // наследник получит

    verticalScroll : resizeable,  // none | nonResizeble
    horizontScroll : resizeabe,
    windowWidth : '200px',
    windowHeight : '200px',
    templateHTML: 'url',
    templateCSS: 'url'

});
Modules.clone_scroll.setContainer('kontainer');

Modules.clone_scroll.render();  // наследник рендерится будет
  /*

      <div id='scroller'>

       <div id='scroller-wrapper'>

            <div id='scroller-content'>четыре дива</div>
       </div>

       <div id='HorizontScrollLine'><div id='horizontScrollBar'></div></div>
       <div id='VerticalScrollLine'><div id='verticalScrollBar'></div></div>

      </div>


      #scroller{
            position:relative;
            top:0px;
            left:0px;

      }

      #scroller-wrapper{
                position:absolute;
                top:0px;
                left:0px;
                overflow: hidden;

      }

      #scroller-content{
            position:absolute;
            top:0px;
            left:0px;
            overflow: hidden;

      }

      #VerticalScrollLine{
            position:absolute;
            top:0px;
            right:0px;
            width: 10%;
            height: 100%;
            background-color:red;

      }

     #HorizontScrollLine{
            position:absolute;
            bottom:0px;
            left:0px;
            width: 100%;
            height: 10%;
            background-color:red;

   }

   #horizontScrollBar{
            position:absolute;
            bottom:0px;
            left:0px;
            width: 20px;
            height: 10px;
            background-color:blue;

   }
   #verticalScrollBar{
            position:absolute;
            top:0px;
            right:0px;
            width: 10px;
            height: 20px;
            background-color:blue;

   }

 */

// изображение
// стиль
//размеры скролов
// полоски под скролы изображения стили -наверное объекты описания элементов
//размеры окна

// настройки его  в сервис раздел   this._settings и затем применить при рендере

// отрендерить его

// получить настройки записать в стиль документа
// отрендерить его
// навесить обработчики на скойлеры.... дать им арибут контент


//Modules.mod.addEventListener('closeWindow', function(){alert('click')}, ['afterCloseWindow']);


//