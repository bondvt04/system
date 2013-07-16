
Module.prototype.setTemplateUrl = function(urlHTML, urlCSS){

    this._template.urlHTML = urlHTML;

    this._template.textHTML = false;

    this._template.inWork= false;
    this._template.load= false;

    if(urlCSS){

        var css=document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", urlCSS);
        document.getElementsByTagName('head')[0].appendChild(css);
    }

    return this;
};// установка адресов шаблонов  при установке сброс загруженных

Module.prototype.preRender = function(type){

    this.loadTemplate(this.render, type);

};  // прелоадер , вызов лоад  , отрисовка






Module.prototype.loadTemplate = function( type){

    var that = this;

    var template = this._template;

    if(template.load){

        this.render(type);

        return null;
    }

    else {

        if(this._template.urlHTML){

            var elemHTML = document.createElement("script");

            elemHTML.onerror = function(){throw (template.urlHTML +' no shablon');};

            elemHTML.onload=function(){

                template.textHTML = getHTML();

                    template.load = true;

                    that.render(type);
                }
            }

            elemHTML.src = this._template.urlHTML;
           document.getElementsByTagName('head')[0].appendChild(elemHTML);
        }

    return null;
}; // подгрузка если не загружен

Module.prototype.render = function(type){


    // функция получает строку шаблона и объект данных делает замену и возвращает результат
    // для элемента  массива объектов или объекта - ка5к и было раньше получить свойства заменить в шаблоне на них

    function setDataToTemplate(template, data, that){

        var reg;
        for(var dataToInsert in data){
            reg = new RegExp("{\\$"+dataToInsert+"}", "g");
            template = template.replace(reg, data[dataToInsert]);
        }

       return (template.replace(new RegExp("{\\$this._moduleName}", "g"), that._moduleName));
    }


    var template = this._template.textHTML._template;
    var attributes;

    if(template){

        var childTemplates = template.match(/\{\{[^}]+\}\}/g);
        var nameChildTemplates;
        var templateLine;

        for(var lengthchildTemplates = childTemplates.length; lengthchildTemplates--; ){

            templateLine = '';
            nameChildTemplates = childTemplates[lengthchildTemplates].replace('{{','').replace('}}','');

            if(attributes = this._attributes[nameChildTemplates]){

                if(Object.prototype.toString.call(attributes) === "[object Array]"){

                    for( var num = 0, dataLength = attributes.length; num < dataLength; num++){

                        templateLine =  templateLine + setDataToTemplate( this._template.textHTML[nameChildTemplates], attributes[num], this);
                    }
                }
                else{

                    if(Object.prototype.toString.call(attributes) === "[object Object]"){

                        templateLine =  templateLine + setDataToTemplate( this._template.textHTML[nameChildTemplates], attributes, this);
                    }
                    else{

                        var reg = new RegExp("{\\$"+nameChildTemplates+"}", "g");
                        templateLine =  this._template.textHTML[nameChildTemplates].replace(reg ,attributes).replace('{$this._moduleName}', this._moduleName);
                    }
                }
            }

            template =  template.replace(childTemplates[lengthchildTemplates], templateLine);
        }

        alert(template);
        // пройтись по каждому заменяя данные и выстраивая строку какой будет заменено совпадение

    }

    // получить шаблон
    // найти замены участка шаблона-сложить в массив

    //тип изменять стиль -стоит свойство шаблона -функцию написать
    // просто отрендерить вставить в родительский если есть он , иначе в контейнер ?


    // если тип брать из родителя найти соответсвие используемым заменителям в шаблоне и данных верхнего уровня

    // либо из переданных заполнять ??
    // если данных массив повторять шаблон

    //TODO   результат рендеринга получает шаблон родитель и всавляет в точку вставки данного потомка
};