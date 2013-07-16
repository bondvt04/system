
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
    }

    this._template.render = template;        // нужно ли хранить забивать память?

    if (this._familyTree.parent){            //  TODO если событие подписано .

        Modules[this._familyTree.parent].events.childRendered(template);
    }

    this.events.Rendered();

    //TODO   результат рендеринга получает шаблон родитель и всавляет в точку вставки данного потомка

    //TODO  наверно нужно и имя модуля отдавать, а в род метки с этим именем чтоб понимать на что заменять , когда все замененены шаблон готов ,

    //TODO разные типы распространения событий этот и вниз изменить шаблоны, только этот , этот и вверх , все на входящие в раздел пейдж...

    //TODO способ получения всегда из текущего -будет событе после получения данных, обработать , распределить по модулям , событийную пользовать

    //TODO может даже рендер запускать с указанного  а там уже генерить события для родительских и родительский генерит события -изменись плотомок , если событие не подписано потомок не генерит ничего

    //TODO модуль получает событие перегенерись , говорит потомкам перегенеритесь, потомки подписанные опускают на макс глубину подписанных своих потомков , затем потомки снизу начинают говорить родителям -мы перегенерились
      //TODO и включают в себя данные потомков , генерят свои и так пока не дойдут до модуля какой первым сказал перегенеритесь , у него на это событие событие какоето другое запускается -например убери прелоадер, и поакажись -2 события
};

//TODO связать с потомками , хотя и из шаблона можно понимать что потомок нужен
//TODO запросить потомка -вставить возврат т.е выйдет рекурсия и пока все потомки не отрисуются шаблон предку не уйдёт -если это запустить на предке он не отрисуется пока данные не вернутся

//TODO а вот на событику можно вешать или компилить  или брать скомпилённую или остановить распространение , или пропустить отдать дальше потомкам