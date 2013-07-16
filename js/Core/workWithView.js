
Module.prototype.setShablonUrl = function(urlHTML){

    this._shablon.urlHTML = urlHTML;

    this._shablon.textHTML = false;

    this._shablon.inWork= false;
    this._shablon.load= false;

    return this;
};// установка адресов шаблонов  при установке сброс загруженных

Module.prototype.preRender = function(type){

    this.loadShablon(this.render, type);

};  // прелоадер , вызов лоад  , отрисовка






Module.prototype.loadShablon = function(callback, type){

    var shablon = this._shablon;

    if(shablon.load){

        callback(type);

        return null;
    }

    else {

        if(this._shablon.urlHTML){

            var elemHTML = document.createElement("script");

            elemHTML.onerror = function(){throw (shablon.urlHTML +' no shablon');};

            elemHTML.onload=function(){

                shablon.textHTML = getHTML();

                    shablon.load = true;
                    callback(type);
                }
            }

            elemHTML.src = this._shablon.urlHTML;
           document.getElementsByTagName('head')[0].appendChild(elemHTML);
        }

    return null;
}; // подгрузка если не загружен

Module.prototype.render = function(type){

    //тип изменять стиль -стоит свойство шаблона -функцию написать
    // просто отрендерить вставить в родительский если есть он , иначе в контейнер ?


    // если тип брать из родителя найти соответсвие используемым заменителям в шаблоне и данных верхнего уровня

    // либо из переданных заполнять ??
    // если данных массив повторять шаблон
};