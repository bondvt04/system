
Module.prototype.setTemplateUrl = function(urlHTML, urlCSS){

    this._template.urlHTML = urlHTML;

    this._template.textHTML = false;

    this._template.inWork= false;
    this._template.load= false;

    if(urlCSS){

        var css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", urlCSS);

        document.getElementsByTagName('head')[0].appendChild(css);
    }

    return this;
};// установка адресов шаблонов  при установке сброс загруженных



Module.prototype.loadTemplate = function(type){

    var that = this;
    var templatesLength = 1;

    function loadTemplates(module){

        var template = module._template;

        if(template.load){
            templatesLength--;

            if(!templatesLength){
                that.renderWithOutEventRendered(type);
            }

            return null;
        }

        else {

            if(module._template.urlHTML){

                var elemHTML = document.createElement("script");

                elemHTML.onerror = function(){throw (template.urlHTML +' no shablon');templatesLength--;};

                elemHTML.onload=function(){

                    template.textHTML = getHTML();

                        templatesLength--;
                        template.load = true;

                    if(!templatesLength){

                        that.renderWithOutEventRendered(type);
                    }
                }
            }

            elemHTML.src = module._template.urlHTML;
            document.getElementsByTagName('head')[0].appendChild(elemHTML);
        }
    }

    function getChildren(module){

        var children = module._familyTree.children;

        for (var lengthChildren = children.length; lengthChildren--;) {

            templatesLength++;

            childName = children[lengthChildren];
            loadTemplates(Modules[childName]);
            getChildren(Modules[childName]);
        }
    }

    getChildren(this);
    loadTemplates(this);

    return null;
}; // подгрузка если не загружен

Module.prototype.render = function(){

    this.loadTemplate('top');
};

Module.prototype.renderWithOutEventRendered= function(type){

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

    if ( this._settings.rendering == 'nonRendering'){

        return '';
    }

    if ( this._settings.rendering == 'getSave' && this._template.render){

        return this._template.render;
    }


    if(template && (this._settings.rendering == 'renderingAll' || this._settings.rendering == 'thisRendering')){

        var childTemplates = template.match(/\{\{[^}]+\}\}/g);
        var nameChildTemplates;
        var templateLine;
        var dataToInsert;

        for(var lengthchildTemplates = childTemplates.length; lengthchildTemplates--; ){

            templateLine = '';
            nameChildTemplates = childTemplates[lengthchildTemplates].replace('{{','').replace('}}','');

            if(attributes = this._attributes[nameChildTemplates]){

                if(Object.prototype.toString.call(attributes) === "[object Array]"){

                    for( var num = 0, dataLength = attributes.length; num < dataLength; num++){

                        dataToInsert = attributes[num];

                        if(this.events.beforeInsertToTemplate){

                            dataToInsert = this.events.beforeInsertToTemplate(dataToInsert, this);
                        }

                        templateLine =  templateLine + setDataToTemplate( this._template.textHTML[nameChildTemplates], dataToInsert, this);
                    }
                }
                else{

                    if(Object.prototype.toString.call(attributes) === "[object Object]"){

                        dataToInsert = attributes;

                        if(this.events.beforeInsertToTemplate){

                            dataToInsert = this.events.beforeInsertToTemplate(dataToInsert, this);
                        }

                        templateLine =  templateLine + setDataToTemplate( this._template.textHTML[nameChildTemplates], dataToInsert, this);
                    }
                    else{

                        var reg = new RegExp("{\\$"+nameChildTemplates+"}", "g");

                        dataToInsert = attributes;

                        if(this.events.beforeInsertToTemplate){

                            dataToInsert = this.events.beforeInsertToTemplate(dataToInsert, this);
                        }

                        templateLine =  this._template.textHTML[nameChildTemplates].replace(reg ,dataToInsert).replace('{$this._moduleName}', this._moduleName);
                    }
                }
            }

            template =  template.replace(childTemplates[lengthchildTemplates], templateLine);
        }
    }


    var childrenTemplates = template.match(/\{!child_[^}]+\}/g);
    var nameChildrenTemplates;
    var templateFromChild;
    var indexChild;

    if(childrenTemplates && this._settings.rendering != 'thisRendering'){

        for(var lengthChildrenTemplates = childrenTemplates.length; lengthChildrenTemplates--; ){

            templateFromChild = '';

            nameChildrenTemplates =  childrenTemplates[lengthChildrenTemplates].replace('{!child_','').replace('}','');

            indexChild = this._familyTree.children.indexOf(nameChildrenTemplates);

            if(indexChild != -1){

                templateFromChild = Modules[this._familyTree.children[indexChild]].renderWithOutEventRendered('noTop');

                template =  template.replace(childrenTemplates[lengthChildrenTemplates], templateFromChild);
            }
            else{

               throw (this._moduleName + ' has not child module ' + nameChildrenTemplates +'');
            }

        }
    }

    this._template.render = template;        // нужно ли хранить забивать память?

    if(type == 'top'){
        if (this.events.rendered){

            this.events.rendered(this._template.render);    //TODO а вот его можно преопределить обработчик этого события что дальше делать
        }
    }

    return template;

};


Module.prototype.setContainer = function(id){

    this.container = id;

    return this;
};

Module.prototype.removeContainer = function(id){

    delete this.container;

    return this;
};

Module.prototype.setRenderAttribute = function(attr){

    if (attr =='renderingAll' || attr =='nonRendering' || attr =='thisRendering' || attr =='getSave' ) {

        this._settings.rendering = attr;
    }
    else {
        throw('unknow type render attribute ');
    }

    return this;
};

//TODO при измении данных запускается рендер на модуле установленном в свойстве относительно какого модуля делать полный рендер   или его можно запускать в событии после измения всех данных
//TODO связать с потомками , хотя и из шаблона можно понимать что потомок нужен
//TODO запросить потомка -вставить возврат т.е выйдет рекурсия и пока все потомки не отрисуются шаблон предку не уйдёт -если это запустить на предке он не отрисуется пока данные не вернутся
//TODO а вот на событику можно вешать или компилить  или брать скомпилённую или остановить распространение , или пропустить отдать дальше потомкам
//TODO   результат рендеринга получает шаблон родитель и всавляет в точку вставки данного потомка
//TODO  наверно нужно и имя модуля отдавать, а в род метки с этим именем чтоб понимать на что заменять , когда все замененены шаблон готов ,
//TODO разные типы распространения событий этот и вниз изменить шаблоны, только этот , этот и вверх , все на входящие в раздел пейдж...
//TODO способ получения всегда из текущего -будет событе после получения данных, обработать , распределить по модулям , событийную пользовать
//TODO может даже рендер запускать с указанного  а там уже генерить события для родительских и родительский генерит события -изменись плотомок , если событие не подписано потомок не генерит ничего
//TODO модуль получает событие перегенерись , говорит потомкам перегенеритесь, потомки подписанные опускают на макс глубину подписанных своих потомков , затем потомки снизу начинают говорить родителям -мы перегенерились
//TODO и включают в себя данные потомков , генерят свои и так пока не дойдут до модуля какой первым сказал перегенеритесь , у него на это событие событие какоето другое запускается -например убери прелоадер, и поакажись -2 события