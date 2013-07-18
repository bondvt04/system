//Module.prototype._listeningsModules = [];
// TODO dobavit v massiv slushateley moduley ccilku na massiv podpisanni

/**
 *
 * @param modules
 */

function addName(module){

    if(!module._moduleName){

       setModuleName(module);
    }

}


Module.prototype.addModulesToAudition = function(){

    addName(this);

    var events = this.events;
    var listenersArray = this._listeningsModules;
    var moduleEvents;
    var listenerIsset = false;
    var module;

    var modules = arguments;


    if (!listenersArray){
        listenersArray = this._listeningsModules = [];
    }

    for (var lengthModules = modules.length; lengthModules --;){

        module =  modules[lengthModules];
        addName(module);

        for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

            if( listenersArray[lenghtListenersArray] == module){

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

    return this;
};

Module.prototype.removeModulesFomAudition = function(){

    var events = this.events;
    var listenersArray = this._listeningsModules;
    var index;
    var moduleEvents;
    var module;

    var modules = arguments;

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

    return this;
};

Module.prototype.removeListenerFromModules = function(){

    var events = this.events;

    var listenersArray;
    var moduleEvents;
    var module;

    var modules = arguments;

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

    return this;
};

Module.prototype.addModuleToListenersOtherModule = function(){

    addName(this);

    var events = this.events;

    var listenersArray;
    var listenerIsset = false;
    var moduleEvents;
    var listenersModule;

    var modules = arguments;

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