
Module.prototype.setShablonUrl = function(urlHTML, urlCSS){

    this._shablon.urlHTML = urlHTML;
    this._shablon.urlCSS = urlCSS;

    this._shablon.textHTML = false;
    this._shablon.textCSS = false;

    this._shablon.inWork= false;
    this._shablon.load= false;

    return this;
};// установка адресов шаблонов  при установке сброс загруженных

Model.prototype.preRender = function(type){

    this.loadShablon(this.render, type);

};  // прелоадер , вызов лоад  , отрисовка






Module.prototype.loadShablon = function(callback, type){

    var shablon = this._shablon;

    if(shablon.load){

        callback(type);

        return null;
    }

    else {

        var lengthShablons;

        if(this._shablon.urlHTML && this._shablon.urlCSS){

            lengthShablons =2;
        }
        else if(this._shablon.urlHTML || this._shablon.urlCSS){

            lengthShablons =1;
        }

        if(this._shablon.urlHTML){



            var elemHTML = document.createElement("script");

            elemHTML.onerror = function(){ throw (shablon.urlHTML +' no shablon');};

            elemHTML.onload=function(){

                shablon.textHTML = elemHTML.text;

                lengthShablons--;

                if(!lengthShablons){

                    shablon.load = true;
                    callback(type);
                }
            };
            elemHTML.type = 'text';
            elemHTML.src = this._shablon.urlHTML;
        }

        if(this._shablon.urlCSS){

            var elemCSS = document.createElement("script");

            elemCSS.onerror=function(){ throw (shablon.urlCSS +' no shablon');};

            elemCSS.onload=function(){

                urlCss.textCSS = elemCSS.text;

                lengthShablons--;

                if(!lengthShablons){

                    shablon.load = true;
                    callback(type);
                }
            };
            elemCSS.type = 'text';
            elemCSS.src = shablon.urlCss;
        }

        //document.getElementsByTagName('head')[0].appendChild(elem);
    }

    return null;
}; // подгрузка если не загружен

Model.prototype.Render = function(type){


    // если тип брать из родителя найти соответсвие используемым заменителям в шаблоне и данных верхнего уровня

    // либо из переданных заполнять ??
    // если данных массив повторять шаблон
};