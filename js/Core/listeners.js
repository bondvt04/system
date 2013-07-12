//Module.prototype._listeningsModules = [];
// TODO dobavit v massiv slushateley moduley ccilku na massiv podpisanni

/**
 *
 * @param modules
 */

function addName(module){

    if(!module._moduleName){

        module.setModuleName();
    }

}


Module.prototype.addModulesToAudition = function(modules){

    addName(this);

    var events = this.events;
    var listenersArray = this._listeningsModules;
    var moduleEvents;
    var listenerIsset = false;
    var module;

    if (!listenersArray){
        listenersArray = [];
    }



    if (Object.prototype.toString.call(modules) == "[object Array]"){

        for (var lengthModules = modules.length; lengthModules --;){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                module =  modules[lengthModules];

                if( listenersArray[lenghtListenersArray] == module){

                    addName(module);

                    listenerIsset = true;
                    break;
                }
            }

            if(!listenerIsset){

                listenerIsset = false;
                moduleEvents =  modules[lengthModules].events;

                if(events.beforeAddAuditionModule){
                    events.beforeAddAuditionModule();
                }

                if(moduleEvents.beforeAddAuditionModuleToOtherModule){
                    moduleEvents.beforeAddAuditionModuleToOtherModule();
                }

                listenersArray.push(module);

                this.addAuditionToList(module);

                if(moduleEvents.afterAddAuditionModuleToOtherModule){
                    moduleEvents.afterAddAuditionModuleToOtherModule();
                }
                if(events.afterAddAuditionModule){
                    events.afterAddAuditionModule();
                }
            }
        }
    }
    else{

        for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

            if( listenersArray[lenghtListenersArray] == modules){

                addName(modules);

                listenerIsset = true;
                break;
            }
        }

        if(!listenerIsset){

            moduleEvents = modules.events;

            if(events.beforeAddAuditionModule){
                events.beforeAddAuditionModule();
            }

            if(moduleEvents.beforeAddAuditionModuleToOtherModule){
                moduleEvents.beforeAddAuditionModuleToOtherModule();
            }

            listenersArray.push(modules);

            this.addAuditionToList(modules);

            if(moduleEvents.afterAddAuditionModuleToOtherModule){
                moduleEvents.afterAddAuditionModuleToOtherModule();
            }
            if(events.afterAddAuditionModule){
                events.afterAddAuditionModule();
            }
        }
    }


    return this;
};

Module.prototype.removeModulesFomAudition = function(modules){

    var events = this.events;
    var listenersArray = this._listeningsModules;
    var index;
    var moduleEvents;
    var module;



    if (Object.prototype.toString.call(modules) == "[object Array]"){
        for (var lengthModules = modules.length; lengthModules --;){

            module =  modules[lengthModules];

            if (listenersArray){

                for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                    if( listenersArray[lenghtListenersArray] == module){

                        moduleEvents = module.events;

                        if(events.beforeRemoveModuleFromAudition){
                            events.beforeRemoveModuleFromAudition();
                        }

                        if(moduleEvents.beforeRemoveModuleFromAuditionOtherModule){
                            moduleEvents.beforeRemoveModuleFromAuditionOtherModule();
                        }

                        this.removeAuditionFromList(module);

                        listenersArray.splice(lenghtListenersArray, 1);

                        if(moduleEvents.afterRemoveModuleFromAuditionOtherModule){
                            moduleEvents.afterRemoveModuleFromAuditionOtherModule();
                        }
                        break;
                    }
                }
            }
        }
    }
    else{

        if (listenersArray){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                if( listenersArray[lenghtListenersArray] == modules){

                    moduleEvents = modules.events;

                    if(events.beforeRemoveModuleFromAudition){
                        events.beforeRemoveModuleFromAudition();
                    }

                    if(moduleEvents.beforeRemoveModuleFromAuditionOtherModule){
                        moduleEvents.beforeRemoveModuleFromAuditionOtherModule();
                    }

                    this.removeAuditionFromList(modules);

                    listenersArray.splice(lenghtListenersArray, 1);

                    if(moduleEvents.afterRemoveModulerFomAuditionOtherModule){
                        moduleEvents.afterRemoveModuleFromAuditionOtherModule();
                    }

                    if(events.afterRemoveModuleFromAudition){
                        events.afterRemoveModuleFromAudition();
                    }
                    break;
                }
            }
        }
    }



    return this;
};

Module.prototype.removeListenerFromModules = function(modules){

    var events = this.events;



    var listenersArray;
    var moduleEvents;
    var module;


    if (Object.prototype.toString.call(modules) == "[object Array]"){

        for (var lengthModules = modules.length; lengthModules --;){

            module =  modules[lengthModules];

            listenersArray = module._listeningsModules;

            if (listenersArray){

                for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {


                    if( listenersArray[lenghtListenersArray] == this){

                        moduleEvents = module.events;

                        if(events.beforeRemoveModuleFromAuditionOtherModule){
                            events.beforeRemoveModuleFromAuditionOtherModule();
                        }

                        if(moduleEvents.beforeRemoveModuleFromAudition){
                            moduleEvents.events.beforeRemoveModuleFromAudition();
                        }

                        module.removeAuditionFromList(this);

                        listenersArray.splice(lenghtListenersArray, 1);

                        if(moduleEvents.afterRemoveModuleFromAudition){
                            moduleEvents.afterRemoveModuleFromAudition();
                        }
                        if(events.afterRemoveModuleFromAuditionOtherModule){
                            events.afterRemoveModuleFromAuditionOtherModule();
                        }

                        break;
                    }
                }
            }
        }
    }
    else{
        listenersArray = modules._listeningsModules;

        if (listenersArray){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                if( listenersArray[lenghtListenersArray] == this){

                    moduleEvents = modules.events;

                    if(events.beforeRemoveModuleFromAuditionOtherModule){
                        events.beforeRemoveModuleFromAuditionOtherModule();
                    }

                    if(moduleEvents.beforeRemoveModuleFromAudition){
                        moduleEvents.beforeRemoveModuleFromAudition();
                    }

                    modules.removeAuditionFromList(this);

                    listenersArray.splice(lenghtListenersArray, 1);

                    if(moduleEvents.afterRemoveModuleFromAudition){
                        moduleEvents.afterRemoveModuleFromAudition();
                    }
                    if(events.afterRemoveModuleFromAuditionOtherModule){
                        events.afterRemoveModuleFromAuditionOtherModule();
                    }
                    break;
                }
            }
        }
    }




    return this;
};

Module.prototype.addModuleToListenersOtherModule = function(modules){

    addName(this);

    var events = this.events;



    var listenersArray;
    var listenerIsset = false;
    var moduleEvents;
    var listenersModule;

    if (Object.prototype.toString.call(modules) == "[object Array]"){

        for (var lengthModules = modules.length; lengthModules --;){

            listenersArray = modules[lengthModules]._listeningsModules;

            if (listenersArray){

                for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                    listenersModule = listenersArray[lenghtListenersArray];

                    addName(listenersModule);

                    if( listenersModule == this){

                        listenerIsset = true;
                        break;
                    }
                }

                if(!listenerIsset){

                    listenerIsset = false;
                    moduleEvents =  modules[lengthModules].events;

                    if(events.beforeAddModuleToAuditionOtherModules){
                        events.beforeAddModuleToAuditionOtherModules();
                    }

                    if(moduleEvents.beforeAddModuleToAudition){
                        moduleEvents.beforeAddModuleToAudition();
                    }

                    listenersArray.push(this);

                    listenersModule.addAuditionToList(this);

                    if(moduleEvents.afterAddModuleToAudition){
                        moduleEvents.afterAddModuleToAudition();
                    }
                    if(events.afterAddModuleToAuditionOtherModules){
                        events.afterAddModuleToAuditionOtherModules();
                    }
                }
            }
        }
    }
    else{
        listenersArray = modules._listeningsModules;

        if (listenersArray){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                listenersModule = listenersArray[lenghtListenersArray];

                addName(listenersModule);

                if( listenersModule == this){

                    listenerIsset = true;
                    break;
                }
            }

            if(!listenerIsset){

                moduleEvents =  modules.events;

                if(events.beforeAddModuleToAuditionOtherModules){
                    events.beforeAddModuleToAuditionOtherModules();
                }
                if(moduleEvents.beforeAddModuleToAudition){
                    moduleEvents.beforeAddModuleToAudition();
                }

                listenersArray.push(this);

                listenersModule.addAuditionToList(this);

                if(moduleEvents.afterAddModuleToAudition){
                    moduleEvents.afterAddModuleToAudition();
                }
                if(events.afterAddModuleToAuditionOtherModules){
                    events.afterAddModuleToAuditionOtherModules();
                }

            }
        }
    }



    return this;
};

Module.prototype.removeAllAuditions = function(){

    var events = this.events;



    var listenersArray = this._listeningsModules;
    var moduleEvents;

    for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

        moduleEvents =  listenersArray[lenghtListenersArray].events;

        if(events.beforeAddModuleToAuditionOtherModules){
            events.beforeAddModuleToAuditionOtherModules();
        }

        if(events.beforeAddModuleToAuditionOtherModules){
            events.beforeAddModuleToAuditionOtherModules();
        }

        if(moduleEvents.beforeRemoveModuleFromAudition){
            moduleEvents.beforeRemoveModuleFromAudition();

        }

        listenersArray.splice(lenghtListenersArray, 1);

        if(moduleEvents.afterRemoveModuleFromAudition){
            moduleEvents.afterRemoveModuleFromAudition();
        }
        if(events.afterRemoveModuleFomAuditionOtherModule){
            events.afterRemoveModuleFomAuditionOtherModule();
        }
    }



    delete modulesForAudition[this._moduleName];

    return this;
};

Module.prototype.addModuleToAuditionAllModules = function(){

    addName(this);

    var events = this.events;

    if(events.beforeAddAuditionModule){
        events.beforeAddAuditionModule();
    }

    this._listeningsModules = [];
    var listenersArray = this._listeningsModules;

    var module;
    var moduleEvents;

    for(var name in Modules){

        module =  Modules[name];
        moduleEvents =  module.events;

        addName(module);

        if(events.beforeAddAuditionModule){
            events.beforeAddAuditionModule();
        }
        if(moduleEvents.beforeAddAuditionModuleToOtherModule){
            moduleEvents.beforeAddAuditionModuleToOtherModule();
        }

        listenersArray.push(module);

        this.addAuditionToList(module);

        if(moduleEvents.afterAddAuditionModuleToOtherModule){
            moduleEvents.afterAddAuditionModuleToOtherModule();
        }
        if(events.afterAddAuditionModule){
            events.afterAddAuditionModule();
        }
    }



    return this;
};

Module.prototype.removeAuditionFromAllModulesListeners = function(){

    addName(this);

    var events = this.events;



    var listenersArray;
    var moduleEvents;

    for (var name in Modules ){

        module =  Modules[name];

        addName(module);

        listenersArray = module._listeningsModules;

        if (listenersArray){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {


                if( listenersArray[lenghtListenersArray] == this){

                    moduleEvents = module.events;

                    if(events.beforeRemoveModuleFromAuditionOtherModule){
                        events.beforeRemoveModuleFromAuditionOtherModule();
                    }
                    if(moduleEvents.beforeRemoveModuleFromAudition){
                        moduleEvents.beforeRemoveModuleFromAudition();
                    }

                    module.removeAuditionFromList(this);

                    listenersArray.splice(lenghtListenersArray, 1);

                    if(moduleEvents.afterRemoveModuleFromAudition){
                        moduleEvents.afterRemoveModuleFromAudition();
                    }
                    if(events.afterRemoveModuleFromAuditionOtherModule){
                        events.afterRemoveModuleFromAuditionOtherModule();
                    }

                    break;
                }
            }
        }
    }



    return this;
};

Module.prototype.addAuditionToAllModulesListeners = function(){

    addName(this);

    var events = this.events;

    var listenerIsset = false;
    var module;
    var moduleEvents;
    var listenersModule;

    for (var name in Modules ){

        module =  Modules[name];

        listenersArray = module._listeningsModules;

        if (listenersArray){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                listenersModule =  listenersArray[lenghtListenersArray];

                addName(listenersModule);

                if( listenersModule == this){

                    listenerIsset = true;
                        break;
                }
            }

            if(!listenerIsset){

                moduleEvents =  module.events;
                listenerIsset = false;


                if(events.beforeAddModuleToAuditionOtherModules){
                    events.beforeAddModuleToAuditionOtherModules();
                }
                if(moduleEvents.beforeAddModuleToAudition){
                    moduleEvents.beforeAddModuleToAudition();
                }

                listenersArray.push(this);

                listenersModule.addAuditionToList(this);

                if(moduleEvents.afterAddModuleToAudition){
                    moduleEvents.afterAddModuleToAudition();
                }
                if(events.afterAddModuleToAuditionOtherModules){
                    events.afterAddModuleToAuditionOtherModules();
                }
            }
        }
    }



    return this;

};




//    Modules.mod2.addModulesToAudition( module | array modules);        +     // добавить модули на прослушивание
//    Modules.mod2.removeModulesFomAudition( module | array modules);   +      // удалить модули с прослушивания

//    Modules.mod2.addModuleToListenersOtherModule( module | array modules);   +    // добавить модуль на прослушивание модулям
//    Modules.mod2.removeListenerFromModules( module | array modules);         +   //   удалить модуль из прослушивания модулями

//    Modules.mod2.removeAllAuditions();+   // удалить все слушатели модулей из модуля

//    Modules.mod2.addModuleToAuditionAllModules();             // прослушивать все модули      +
//    Modules.mod2.addAuditionToAllModulesListeners();     // добавить прослушивание модуля во все модули  +
//    Modules.mod2.removeAuditionFromAllModulesListeners();     // удалить прослушивание из всех модулей +


//     beforeAddAuditionModules
//         beforeAddAuditionModuleToOtherModule
//         afterAddAuditionModuleToOtherModule
//     afterAddAuditionModules

//   beforeRemoveModulesFomAudition
//         beforeRemoveModuleFomAuditionOtherModule      -удаление модуля из других -внутренние становятся внешними
//         afterRemoveModuleFomAuditionOtherModule
//   afterRemoveModulesFomAudition

//     beforeAddModuleToAuditionOtherModules
//        beforeAddModulesToAudition
//        afterAddModulesToAudition
//     afterAddModuleFomAuditionOtherModule


// ������� ������� �������� ������� 
// ������� ������� ������������ �������
// ������� ������� ������� ���������
// ������� ������� ������� ������� 

