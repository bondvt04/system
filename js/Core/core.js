var Modules = {};
function Module(){};

function createNewModule(defaultSettings){

    function NewModule() {};
    NewModule.prototype = new Module();

    if(defaultSettings){
        NewModule.prototype.default =  defaultSettings ;
    }
    var newModule = new NewModule();

    if(newModule.events.beforeCreate){
        newModule.events.beforeCreate();
    }

    if(defaultSettings){

        for (var prop in defaultSettings){

            newModule[prop] =  defaultSettings[prop];
        }
    }
    newModule._listeningsModules = [];

    if(newModule.events.afterCreate){
        newModule.events.afterCreate();
    }

    return  newModule;
};

Module.prototype.createCloneModule = function (module){

    if(this.events.beforeCreate){
        this.events.beforeCreate();
    }
    if(this.events.beforeClone){
        this.events.beforeClone();
    }

    function clone(o) {

        if(!o || "object" !== typeof o)  {
            return o;
        }
        var c = "function" === typeof o.pop ? [] : {};
        var p, v;
        for(p in o) {
            if(o.hasOwnProperty(p)) {
                v = o[p];
                if(v && "object" === typeof v) {
                    c[p] = clone(v);
                }
                else c[p] = v;
            }
        }
        return c;
    }

    var newProps = clone(module);

    if(newProps.events.afterCreateClone){
        newProps.events.afterCreateClone();
    }


    function AuxiliaryObj(){};
    AuxiliaryObj.prototype =Module.prototype;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

        returnObj[prop] =  newProps[prop];
    }

    //TODO skopirovat clushateli
    returnObj._listeningsModules = [];

    if(returnObj.events.afterCreate){
        returnObj.events.afterCreate();
    }
    if(returnObj.events.afterClone){
        returnObj.events.afterClone();
    }

    return  returnObj;
};

Module.prototype.createCloneModuleWithAuditions = function (module){

    if(this.events.beforeCreate){
        this.events.beforeCreate();
    }
    if(this.events.beforeClone){
        this.events.beforeClone();
    }

    function clone(o) {

        if(!o || "object" !== typeof o)  {
            return o;
        }
        var c = "function" === typeof o.pop ? [] : {};
        var p, v;
        for(p in o) {
            if(o.hasOwnProperty(p)) {
                v = o[p];
                if(v && "object" === typeof v) {
                    c[p] = clone(v);
                }
                else c[p] = v;
            }
        }
        return c;
    }

    var newProps = clone(module);

    if(newProps.events.afterCreateClone){
        newProps.events.afterCreateClone();
    }

    function AuxiliaryObj(){};
    AuxiliaryObj.prototype =Module.prototype;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

            returnObj[prop] =  newProps[prop];
    }

    if(returnObj.events.afterCreate){
        returnObj.events.afterCreate();
    }
    if(returnObj.events.afterClone){
        returnObj.events.afterClone();
    }

    return  returnObj;
};


Module.prototype.extend = function(newProps){

    if(this.events.beforeCreate){
        this.events.beforeCreate();
    }
    if(this.events.beforeExtend){
        this.events.beforeExtend();
    }


    function AuxiliaryObj(){};
    AuxiliaryObj.prototype =this;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

        returnObj[prop] =  newProps[prop];
    }

    if(returnObj.events.beforeClearAuditions){
        returnObj.events.beforeClearAuditions();
    }

    returnObj._listeningsModules = [];

    if(returnObj.events.afterClearAuditions){
        returnObj.events.afterClearAuditions();
    }

    if(returnObj.events.afterCreate){
        returnObj.events.afterCreate();
    }
    if(returnObj.events.afterExtend){
        returnObj.events.afterExtend();
    }

    return  returnObj;
};

Module.prototype.extendWithSaveAuditions = function(newProps){

    if(this.events.beforeCreate){
        this.events.beforeCreate();
    }
    if(this.events.beforeExtend){
        this.events.beforeExtend();
    }

    function AuxiliaryObj(){};
    AuxiliaryObj.prototype =this;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

         returnObj[prop] =  newProps[prop];

    }

    if(returnObj.events.beforeCopyAuditions){
        returnObj.events.beforeCopyAuditions();
    }

    returnObj._listeningsModules = [];

    for (var lengthAuditions = newProps._listeningsModules.length; lengthAuditions--;) {

        returnObj._listeningsModules.push(newProps._listeningsModules[lengthAuditions]);
    }

    if(returnObj.events.afterCopyAuditions){
        returnObj.events.afterCopyAuditions();
    }

    if(returnObj.events.afterCreate){
        returnObj.events.afterCreate();
    }
    if(returnObj.events.afterExtend){
        returnObj.events.afterExtend();
    }

    return  returnObj;
};


// TODO говнокод пересмотреть
Module.prototype.extendExpanding = function(newProps){

    if(this.events.beforeCreate){
        this.events.beforeCreate();
    }
    if(this.events.beforeExtend){
        this.events.beforeExtend();
    }

    function AuxiliaryObj(){};
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

    if(returnObj.events.beforeCopyAuditions){
        returnObj.events.beforeCopyAuditions();
    }

    returnObj._listeningsModules = [];

    for (var lengthAuditions = newProps._listeningsModules.length; lengthAuditions--;) {

        returnObj._listeningsModules.push(newProps._listeningsModules[lengthAuditions]);
    }

    if(returnObj.events.afterCopyAuditions){
        returnObj.events.afterCopyAuditions();
    }

    if(returnObj.events.afterCreate){
        returnObj.events.afterCreate();
    }
    if(returnObj.events.afterExtend){
        returnObj.events.afterExtend();
    }

    return  returnObj;
};

// TODO говнокод пересмотреть
Module.prototype.extendExpandingAndSaveAuditions= function(newProps){

    if(this.events.beforeCreate){
        this.events.beforeCreate();
    }
    if(this.events.beforeExtend){
        this.events.beforeExtend();
    }

    function AuxiliaryObj(){};
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

    if(returnObj.events.beforeCopyAuditions){
        returnObj.events.beforeCopyAuditions();
    }

    returnObj._listeningsModules = [];


    for (var lengthAuditions = this._listeningsModules.length; lengthAuditions--;) {

        returnObj._listeningsModules.push(this._listeningsModules[lengthAuditions]);
    }

    if(returnObj.events.afterCopyAuditions){
        returnObj.events.afterCopyAuditions();
    }
    if(returnObj.events.afterCreate){
        returnObj.events.afterCreate();
    }
    if(returnObj.events.afterExtend){
        returnObj.events.afterExtend();
    }

    return  returnObj;
};

Module.prototype.removeModule = function(){

    if(this.events.beforeRemove){
        this.events.beforeRemove();
    }

    for(var module in Modules){
        if(Modules[module] == this){
            delete Modules[module];
            return;
        }
    }
    if(this.events.aftereRemove){
        this.events.afterRemove();
    }
};

Module.prototype.removeModules = function(modules){
    for(var length = modules.length; length -- ;){

        if(this.events.beforeRemove){
            this.events.beforeRemove();
        }

        delete this[modules[length]];

        if(this.events.aftereRemove){
            this.events.afterRemove();
        }
    }


};

Module.prototype.setAllDefaultSettings = function(){

    if(this.events.beforeSetDefaultSettings){
        this.events.beforeSetDefaultSettings();
    }

    for (var name in this){

        delete this[name];
    }
    this._listeningsModules = [];

    if(this.default){

        for (var prop in this.default){

            if(this.events.beforeSetOneDefaultSetting){
                this.events.beforeSetOneDefaultSetting( this.default[prop]);
            }

            this[prop] =  this.default[prop];

            if(this.events.afterSetOneDefaultSetting){
                this.events.afterSetOneDefaultSetting( this.default[prop]);
            }
        }
    }

    if(this.events.beforeSetDefaultSettings){
        this.events.beforeSetDefaultSettings();
    }
};

Module.prototype.setDefaultSettings = function(nameSettings){

    if(this.events.beforeSetDefaultSettings){
        this.events.beforeSetDefaultSettings();
    }

    if(this.default){

        for (var lengthDefaultSettings = nameSettings.length; lengthDefaultSettings--; ){

            if(this.events.beforeSetOneDefaultSetting){
                this.events.beforeSetOneDefaultSetting( this.default[prop]);
            }

            this[nameSettings[lengthDefaultSettings]] =  this.default[nameSettings[lengthDefaultSettings]];

            if(this.events.afterSetOneDefaultSetting){
                this.events.afterSetOneDefaultSetting( this.default[prop]);
            }
        }
    }

    if(this.events.beforeSetDefaultSettings){
        this.events.beforeSetDefaultSettings();
    }

};



//   Modules.mod =  createNewModule([{defaults}]);                        созздание нового модуля    +

//   Modules.mod =  createNewModule().extend({attributes : {a:10, b:20}});    расширение модуля с заменой одноименных свойств и методов   +

//   Modules.mod1 =  Modules.mod.extend({attributes : {a:30, b:40}});       расширение модуля с заменой одноименных свойств и методов    +

//  Modules.mod1 =  Modules.mod.extendExpanding({attributes : {a:30, b:40}});         c расширением существующих , если они объект или массив

//  Modules.mod1 =  Modules.mod.extendWithSaveAuditions({attributes : {a:30, b:40}}); с сохранением списка слушателей без расширения одноименнных  +

//  Modules.mod1 = Module.extendExpandingAndSaveAuditions({attributes : {a:30, b:40}})с расширением одноимённых и списка слушателей


//   Modules.mod2 = Module.createCloneModule(Modules.mod1);              создание клона модуля без сохранения списка прослушиваемых    +

//   Modules.mod2 = Module.createCloneModuleWithAuditions(Modules.mod1);   создание клона с сохранением списка прослушиваемых  +

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


// TODO Сделать вызов событий this.events.name();
// TODO Пересмотреть все методы -вынести повторяющийся функционал











































