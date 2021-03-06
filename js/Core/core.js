function clone(o) {

    if(!o || "object" !== typeof o)  {
        return o;
    }
    var c = "function" === typeof o.pop ? [] : {};
    var p, v;
    for(p in o) {



        if(p != 'that'){

            v = o[p];
            if(v && "object" === typeof v) {
                c[p] = clone(v);
            }
            else c[p] = v;
        }
        else{
            c[p] = 'that';
        }
    }
    return c;
}

function normaizeAfterClone(obj, that){

    for(var name in obj){

        if(typeof obj[name] == "object"){

            obj[name] = normaizeAfterClone(obj[name], that);
        }

        if(name == 'that'){

            obj[name] =  that;
        }

    }

    return obj;
}

var Modules = {};
Modules.Pages = {};


window.Modules = Modules;

var modulesForAudition = {};


var flagResponse = false;  // TODO флаг запроса аякс
var ajaxRequests = [];    // TODO очередь аякс запросов . становяться в очередь если выполняется запрос в это время


function Module(){
    this.events = {
        rendered : function(){

             if(this.that.container){
                 //console.log(this.that._template.render)
                 document.getElementById(this.that.container).innerHTML = this.that._template.render;
             }
        },
        beforeInsertToTemplate : function (data, context){

           return data;
        }
    };

    this.events.userEventsTable = {};      //

    this.container = false; // ид контейнера

    this._familyTree = {


        parent: null,
        children: []
    };

    this._attributes ={


    };

    this._attributes.changed ={


    };

    this._attributes.old ={};

    this._validatoinFunctions ={};

    this._settings = {

        rendering : 'renderingAll'     // свойство отвечающее за рендер данного модуля
    };                                 // nonRendering - не рендерить ни его ни детей
                                       // thisRendering - не рендерить только его -данные детей взять из ранее рендеённых если они есть
                                        // getSave - отдать ранее сохранённое , если оно есть

    this._template = {

        urlHTML : false,
        urlCSS : false,

        textCss : false,
        textHTML : false,

        inWork : false,
        load : false

    };
}

Modules.extendCore = function(extend){

    for (var name in extend) {

        Module.prototype[name] = extend[name];
    }

};

Modules.createNewModule = function(defaultSettings){

    function NewModule() {}
    NewModule.prototype = new Module();

    if(defaultSettings){
        NewModule.prototype.default =  defaultSettings ;
    }
    var newModule = new NewModule();

    var newModuleEvents = newModule.events;

    newModule.doEvent('beforeCreate');
    newModule.doEventAfterStandartEvent('beforeCreate');

    if(defaultSettings){

        for (var prop in defaultSettings){

            newModule[prop] =  defaultSettings[prop];
        }
    }
    newModule._listeningsModules = [];

    newModule.doEvent('afterCreate');
    newModule.doEventAfterStandartEvent('afterCreate');

    return  newModule;
};

Module.prototype.createCloneModule = function (){



    this.doEvent('beforeCreate');
    this.doEventAfterStandartEvent('beforeCreate');


    this.doEvent('beforeClone');
    this.doEventAfterStandartEvent('beforeClone');



    var returnObj = clone(this);

    normaizeAfterClone(returnObj, returnObj);

    returnObj.doEvent('afterCreate');
    returnObj.doEventAfterStandartEvent('afterCreate');

    returnObj.doEvent('afterClone');
    returnObj.doEventAfterStandartEvent('afterClone');

    return  returnObj;
};



Module.prototype.createCloneModuleWithOutAuditions = function (){

    var events = this.events;

    this.doEvent('beforeCreate');
    this.doEventAfterStandartEvent('beforeCreate');


    this.doEvent('beforeClone');
    this.doEventAfterStandartEvent('beforeClone');


    var returnObj = clone(this);
    normaizeAfterClone(returnObj, returnObj);

    returnObj.doEvent('afterCreate');
    returnObj.doEventAfterStandartEvent('afterCreate');

    returnObj._listeningsModules = [];

    var returnEvents = returnObj.events;

    returnObj.doEvent('afterClone');
    returnObj.doEventAfterStandartEvent('afterClone');

    return  returnObj;
};


Module.prototype.extend = function(newProps){

    var events = this.events;

    this.doEvent('beforeCreate');
    this.doEventAfterStandartEvent('beforeCreate');

    this.doEvent('beforeExtend');
    this.doEventAfterStandartEvent('beforeExtend');

    function AuxiliaryObj(){};
    AuxiliaryObj.prototype =this;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

        returnObj[prop] =  newProps[prop];
    }

    var returnEvents = returnObj.events;

    returnObj.doEvent('beforeClearAuditions');
    returnObj.doEventAfterStandartEvent('beforeClearAuditions');

    returnObj._listeningsModules = [];

    returnObj.doEvent('afterClearAuditions');
    returnObj.doEventAfterStandartEvent('afterClearAuditions');

    returnObj.doEvent('afterCreate');
    returnObj.doEventAfterStandartEvent('afterCreate');

    returnObj.doEvent('afterExtend');
    returnObj.doEventAfterStandartEvent('afterExtend');

    return  returnObj;
};

Module.prototype.extendWithSaveAuditions = function(newProps){

    var events = this.events;

    this.doEvent('beforeCreate');
    this.doEventAfterStandartEvent('beforeCreate');

    this.doEvent('beforeExtend');
    this.doEventAfterStandartEvent('beforeExtend');

    function AuxiliaryObj(){}
    AuxiliaryObj.prototype =this;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

         returnObj[prop] =  newProps[prop];

    }

    var returnEvents = returnObj.events;


    this.doEvent('beforeCopyAuditions');
    this.doEventAfterStandartEvent('beforeCopyAuditions');


    returnObj._listeningsModules = [];

    var returnObjListeningsModules = returnObj._listeningsModules;
    var newPropsListeningsModules =  newProps._listeningsModules;


    for (var lengthAuditions = newPropsListeningsModules.length; lengthAuditions--;) {

        returnObjListeningsModules.push(newPropsListeningsModules[lengthAuditions]);
    }

    returnObj.doEvent('afterCopyAuditions');
    returnObj.doEventAfterStandartEvent('afterCopyAuditions');

    returnObj.doEvent('afterCreate');
    returnObj.doEventAfterStandartEvent('afterCreate');

    returnObj.doEvent('afterExtend');
    returnObj.doEventAfterStandartEvent('afterExtend');

    return  returnObj;
};


// TODO говнокод пересмотреть
Module.prototype.extendExpanding = function(newProps){

    var events = this.events;

    this.doEvent('beforeCreate');
    this.doEventAfterStandartEvent('beforeCreate');

    this.doEvent('beforeExtend');
    this.doEventAfterStandartEvent('beforeExtend');

    function AuxiliaryObj(){}
    AuxiliaryObj.prototype =this;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

        if (Object.prototype.toString.call(newProps[prop]) == "[object Array]"){

            if(returnObj[prop]){

                returnObj[prop]= newProps[prop].concat(returnObj[prop]);
            }
            else{
                returnObj[prop]= newProps[prop];
            }
        }
        else if(Object.prototype.toString.call(newProps[prop]) == "[object Object]"){

            if(returnObj[prop]){

                for (var propObj in newProps[prop]){

                     returnObj[prop][propObj] =  newProps[prop][propObj];
                }
            }
            else{
                returnObj[prop] =  newProps[prop];
            }
        }
        else{

            returnObj[prop] =  newProps[prop];
        }
    }

    var returnEvents = returnObj.events;

    returnObj.doEvent('beforeClearAuditions');
    returnObj.doEventAfterStandartEvent('beforeClearAuditions');

    returnObj._listeningsModules = [];


    returnObj.doEvent('afterClearAuditions');
    returnObj.doEventAfterStandartEvent('afterClearAuditions');

    returnObj.doEvent('afterCreate');
    returnObj.doEventAfterStandartEvent('afterCreate');

    returnObj.doEvent('afterExtend');
    returnObj.doEventAfterStandartEvent('afterExtend');

    return  returnObj;
};

// TODO говнокод пересмотреть
Module.prototype.extendExpandingAndSaveAuditions= function(newProps){

    var events = this.events;

    this.doEvent('beforeCreate');
    this.doEventAfterStandartEvent('beforeCreate');

    this.doEvent('beforeExtend');
    this.doEventAfterStandartEvent('beforeExtend');

    function AuxiliaryObj(){}
    AuxiliaryObj.prototype =this;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

        if (Object.prototype.toString.call(newProps[prop]) == "[object Array]"){

            if(returnObj[prop]){

                returnObj[prop]= newProps[prop].concat(returnObj[prop]);
            }
            else{
                returnObj[prop]= newProps[prop];
            }
        }
        else if(Object.prototype.toString.call(newProps[prop]) == "[object Object]"){

            if(returnObj[prop]){

                    for (var propObj in newProps[prop]){

                        returnObj[prop][propObj] =  newProps[prop][propObj];
                    }

            }
            else{
                returnObj[prop] =  newProps[prop];
            }
        }
        else{

            returnObj[prop] =  newProps[prop];
        }
    }

    var returnEvents = returnObj.events;

    returnObj.doEvent('beforeCopyAuditions');
    returnObj.doEventAfterStandartEvent('beforeCopyAuditions');


    returnObj._listeningsModules = [];

    var returnObjListeningsModules = returnObj._listeningsModules;

    var thisListeningsModules = this._listeningsModules;

    for (var lengthAuditions = thisListeningsModules.length; lengthAuditions--;) {

        returnObjListeningsModules.push(thisListeningsModules[lengthAuditions]);
    }

    returnObj.doEvent('afterCopyAuditions');
    returnObj.doEventAfterStandartEvent('afterCopyAuditions');

    returnObj.doEvent('afterCreate');
    returnObj.doEventAfterStandartEvent('afterCreate');

    returnObj.doEvent('afterExtend');
    returnObj.doEventAfterStandartEvent('afterExtend');

    return  returnObj;
};

Module.prototype.removeModule = function(){

    var events = this.events;

    this.doEvent('beforeRemove');
    this.doEventAfterStandartEvent('beforeRemove');

    for(var module in Modules){
        if(Modules[module] == this){

            delete Modules[module];
            delete Modules.Pages[this._moduleName];

            this.removeAuditionFromAllModulesListeners();

            return;
        }
    }

};

//TODO должен быть метод удалить модуль и его потомков  , или нет?

Modules.removeModules = function(modules){
    for(var length = modules.length; length -- ;){

        this.doEvent('beforeRemove');
        this.doEventAfterStandartEvent('beforeRemove');


        delete this[modules[length]];
        delete Modules.Pages[modules[length]._moduleName];

        this[modules[length]].removeAuditionFromAllModulesListeners();
    }
};

Module.prototype.setAllDefaultSettings = function(){

    var events = this.events;


    this.doEvent('beforeSetDefaultSettings');
    this.doEventAfterStandartEvent('beforeSetDefaultSettings');


    for (var name in this){

        delete this[name];
    }
    this._listeningsModules = [];

    if(this.default){

        for (var prop in this.default){

            this.doEvent('beforeSetOneDefaultSetting');
            this.doEventAfterStandartEvent('beforeSetOneDefaultSetting');

            this[prop] =  this.default[prop];

            this.doEvent('afterSetOneDefaultSetting');
            this.doEventAfterStandartEvent('afterSetOneDefaultSetting');
        }
    }

    this.doEvent('beforeSetDefaultSettings');
    this.doEventAfterStandartEvent('beforeSetDefaultSettings');

    return this;
};

Module.prototype.setDefaultSettings = function(nameSettings){

    var events = this.events;
    var defaultSetting;
    var defaultProp;

    this.doEvent('beforeSetDefaultSettings');
    this.doEventAfterStandartEvent('beforeSetDefaultSettings');

    if(this.default){

        for (var lengthDefaultSettings = nameSettings.length; lengthDefaultSettings--; ){

            defaultSetting =  nameSettings[lengthDefaultSettings];

            if(events.beforeSetOneDefaultSetting){
                events.beforeSetOneDefaultSetting( );
            }

            this[defaultSetting] =  this.default[defaultSetting];

            if(events.afterSetOneDefaultSetting){
                events.afterSetOneDefaultSetting( );
            }
        }
    }

    this.doEvent('afterSetDefaultSettings');
    this.doEventAfterStandartEvent('afterSetDefaultSettings');

    return this;
};

function setModuleName(module){

    for (var name in Modules){
        if (Modules[name] == module){

            module._moduleName = name;
            break;
        }
    }
};

Module.prototype.addAuditionToList = function(auditionModule){

    var auditionList = modulesForAudition[this._moduleName];

    if(!auditionList){

        auditionList =  modulesForAudition[this._moduleName]=[];
    }

    auditionList.push(auditionModule._moduleName);

};

Module.prototype.removeAuditionFromList = function(auditionModule){

    var auditionList = modulesForAudition[this._moduleName];

    var index =  auditionModule._moduleName  in  auditionList;

    if (index != -1){

        auditionList.splice(index, 1);
    }

    if(auditionList.length == 0){

        delete auditionList;
    }
};


//    Modules.extendCore  - точка расширения ядра

//    Module.prototype.removeAuditionFromList()    удаляет модуль из хеша прослушиваемых модулей

//   Module.prototype.addAuditionToList()   добавляет прослушиваемый модуль в хеш прослушиваемых модулей

//   Module.prototype.setModuleName() назначает имя модулю

//   Modules.mod =  createNewModule([{defaults}]);                        созздание нового модуля    +

//   Modules.mod =  createNewModule().extend({attributes : {a:10, b:20}});    расширение модуля с заменой одноименных свойств и методов   +

//   Modules.mod1 =  Modules.mod.extend({attributes : {a:30, b:40}});       расширение модуля с заменой одноименных свойств и методов    +

//  Modules.mod1 =  Modules.mod.extendExpanding({attributes : {a:30, b:40}});         c расширением существующих , если они объект или массив

//  Modules.mod1 =  Modules.mod.extendWithSaveAuditions({attributes : {a:30, b:40}}); с сохранением списка слушателей без расширения одноименнных  +

//  Modules.mod1 = Module.extendExpandingAndSaveAuditions({attributes : {a:30, b:40}})с расширением одноимённых и списка слушателей


//   Modules.mod2 = Modules.mod1.createCloneModule();              создание клона модуля без сохранения списка прослушиваемых    +

//   Modules.mod2 = Modules.mod1.createCloneModuleWithOutAuditions();   создание клона без сохранения списка прослушиваемых  +

//    Modules.mod2.removeModule();  удаление модуля   +

//    Modules.removeModules(array);    удаление модулей   +

//    Modules.setAllDefaultSettings();   сброс к настройкам по умолчанию   +

//    Modules.setDefaultSettings([array]);   сброс указанных свойств по умолчанию  +


//    События если есть
//     afterCreate -после создания модуля  -в контексте созданного модуля оба имеют преимущество над бефоклон и афтер клон
//     beforeCreate - в контексте родителя

//     beforeClone   -в контексте родителя
//     afterCreateClone -в контексте клона полного родителя
//     afterClone    -в контексте клона


//  beforeExtend - перед расширением в контексте родителя
//  beforeCopyAuditions/beforeClearAuditions  перед копированием\очисткой прослушивателей в конитексте потомка
//  afterCopyAuditions/afterExtend  перед копированием\очисткой прослушивателей в конитексте потомка
//  afterExtend - перед расширением в контексте потомка


//  beforeRemove  в контексте удаляемого
//  afterRemove  в контексте удаляемого

//  beforeSetDefaultSettings
//  beforeSetOneDefaultSetting
//  afterSetOneDefaultSetting
//  beforeSetDefaultSettings



// TODO функция запуска событий после события, события стандартные через функцию вызывать

// TODO  ввести ссылку на модуль в свойства модуля that = this . Правильно сделать чтоб она указывала при клонировании , расширении на данный модуль. Поведения при расширении через прототип . Метод один сделать чтоб определять









































