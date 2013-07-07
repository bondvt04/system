var Modules = {};
function Module(){};


//+
function createNewModule(){

    function NewModule() {};
    NewModule.prototype = new Module();
    var newModule = new NewModule();

    newModule._listeningsModules = [];

    return  newModule;
}

//+
Module.prototype.createCloneModule = function (module){
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

    function AuxiliaryObj(){};
    AuxiliaryObj.prototype =Module.prototype;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

        returnObj[prop] =  newProps[prop];
    }

    //TODO skopirovat clushateli
    returnObj._listeningsModules = [];

    return  returnObj;
}

//+
Module.prototype.extend = function(newProps){

    function AuxiliaryObj(){};
    AuxiliaryObj.prototype =this;

    var returnObj = new  AuxiliaryObj();

    for (var prop in newProps){

        returnObj[prop] =  newProps[prop];
    }

    //TODO skopirovat clushateli

    returnObj._listeningsModules = [];

    return  returnObj;
};

Module.prototype.removeModule = function(){
    for(var module in Modules){
        if(Modules[module] == this){
            delete Modules[module];
            return;
        }
    }
};


Modules.removeModules = function(modules){
    for(var length = modules.length; length -- ;){
        delete this[modules[length]];
    }

    // TODO delete from all listeners
};




//   Modules.mod =  createNewModule().extend({attributs : {a:10, b:20}});
//   Modules.mod1 =  Modules.mod.extend({attributs : {a:30, b:40}});
//   Modules.mod2 = Module.createCloneModule(Modules.mod1);

//    Modules.mod2.removeModule();
//    Modules.removeModules(array);

// естенд без замены объекта если он существует -а добавлением и заменой сойств


// полчать имя и дописывать . мож метод сет наме ?
// создать b get суе наме сделать?








































