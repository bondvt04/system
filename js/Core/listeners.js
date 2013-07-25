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
    var _module;
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
            _module =  modules[lengthModules];

            this.doEvent('beforeAddAuditionModule');
            this.doEventAfterStandartEvent('beforeAddAuditionModule');

            _module.doEvent('beforeAddAuditionModuleToOtherModule');
            _module.doEventAfterStandartEvent('beforeAddAuditionModuleToOtherModule');

            listenersArray.push(module);

            this.addAuditionToList(module);

            _module.doEvent('afterAddAuditionModuleToOtherModule');
            _module.doEventAfterStandartEvent('afterAddAuditionModuleToOtherModule');

            this.doEvent('afterAddAuditionModule');
            this.doEventAfterStandartEvent('afterAddAuditionModule');
        }
    }

    return this;
};

Module.prototype.removeModulesFomAudition = function(){

    var events = this.events;
    var listenersArray = this._listeningsModules;
    var index;

    var module;

    var modules = arguments;

    for (var lengthModules = modules.length; lengthModules --;){

        module =  modules[lengthModules];

        if (listenersArray){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                if( listenersArray[lenghtListenersArray] == module){

                    this.doEvent('beforeRemoveModuleFromAudition');
                    this.doEventAfterStandartEvent('beforeRemoveModuleFromAudition');

                    module.doEvent('beforeRemoveModuleFromAuditionOtherModule');
                    module.doEventAfterStandartEvent('beforeRemoveModuleFromAuditionOtherModule');

                    this.removeAuditionFromList(module);

                    listenersArray.splice(lenghtListenersArray, 1);

                    module.doEvent('afterRemoveModuleFromAuditionOtherModule');
                    module.doEventAfterStandartEvent('afterRemoveModuleFromAuditionOtherModule');

                    this.doEvent('afterRemoveModuleFromAudition');
                    this.doEventAfterStandartEvent('afterRemoveModuleFromAudition');


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

    var module;

    var modules = arguments;

    for (var lengthModules = modules.length; lengthModules --;){

        module =  modules[lengthModules];

        listenersArray = module._listeningsModules;

        if (listenersArray){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                if( listenersArray[lenghtListenersArray] == this){

                    this.doEvent('beforeRemoveModuleFromAuditionOtherModule');
                    this.doEventAfterStandartEvent('beforeRemoveModuleFromAuditionOtherModule');

                    module.doEvent('beforeRemoveModuleFromAudition');
                    module.doEventAfterStandartEvent('beforeRemoveModuleFromAudition');

                    module.removeAuditionFromList(this);

                    listenersArray.splice(lenghtListenersArray, 1);

                    module.doEvent('afterRemoveModuleFromAudition');
                    module.doEventAfterStandartEvent('afterRemoveModuleFromAudition');

                    this.doEvent('afterRemoveModuleFromAuditionOtherModule');
                    this.doEventAfterStandartEvent('afterRemoveModuleFromAuditionOtherModule');

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
    var _module;
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
                _module =  modules[lengthModules];

                this.doEvent('beforeAddModuleToAuditionOtherModules');
                this.doEventAfterStandartEvent('beforeAddModuleToAuditionOtherModules');

                _module.doEvent('beforeAddModuleToAudition');
                _module.doEventAfterStandartEvent('beforeAddModuleToAudition');

                listenersArray.push(this);

                listenersModule.addAuditionToList(this);

                _module.doEvent('afterAddModuleToAudition');
                _module.doEventAfterStandartEvent('afterAddModuleToAudition');

                this.doEvent('afterAddModuleToAuditionOtherModules');
                this.doEventAfterStandartEvent('afterAddModuleToAuditionOtherModules');
            }
        }
    }

    return this;
};

Module.prototype.removeAllAuditions = function(){

    var events = this.events;

    var listenersArray = this._listeningsModules;
    var _module;

    for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

        _module =  listenersArray[lenghtListenersArray];

        this.doEvent('beforeRemoveModuleFomAuditionOtherModule');
        this.doEventAfterStandartEvent('beforeRemoveModuleFomAuditionOtherModule');

        _module.doEvent('beforeRemoveModuleFromAudition');
        _module.doEventAfterStandartEvent('beforeRemoveModuleFromAudition');


        listenersArray.splice(lenghtListenersArray, 1);

        _module.doEvent('afterRemoveModuleFromAudition');
        _module.doEventAfterStandartEvent('afterRemoveModuleFromAudition');

        this.doEvent('afterRemoveModuleFomAuditionOtherModule');
        this.doEventAfterStandartEvent('afterRemoveModuleFomAuditionOtherModule');
    }

    delete modulesForAudition[this._moduleName];

    return this;
};

Module.prototype.addModuleToAuditionAllModules = function(){

    addName(this);

    var events = this.events;

    this.doEvent('beforeAddAuditionAllModules');
    this.doEventAfterStandartEvent('beforeAddAuditionAllModules');

    this._listeningsModules = [];
    var listenersArray = this._listeningsModules;

    var module;


    for(var name in Modules){

        module =  Modules[name];


        addName(module);

        this.doEvent('beforeAddAuditionModule');
        this.doEventAfterStandartEvent('beforeAddAuditionModule');

        module.doEvent('beforeAddAuditionModuleToOtherModule');
        module.doEventAfterStandartEvent('beforeAddAuditionModuleToOtherModule');

        listenersArray.push(module);

        this.addAuditionToList(module);

        module.doEvent('afterAddAuditionModuleToOtherModule');
        module.doEventAfterStandartEvent('afterAddAuditionModuleToOtherModule');

        this.doEvent('afterAddAuditionModule');
        this.doEventAfterStandartEvent('afterAddAuditionModule');
    }

    this.doEvent('afterAddAuditionAllModules');
    this.doEventAfterStandartEvent('afterAddAuditionAllModules');

    return this;
};

Module.prototype.removeAuditionFromAllModulesListeners = function(){

    addName(this);

    var events = this.events;

    var listenersArray;


    for (var name in Modules ){                //TODO фильтровать поскольку есть ещё свойства свои и документ

        if(name != 'document' && name != 'Pages' && name != 'startFunctions' && name != 'closeFunctions'  && name != 'extendCore'  &&
            name != 'createNewModule' && name != 'removeModules'){

            module =  Modules[name];

            addName(module);

            listenersArray = module._listeningsModules;

            if (listenersArray){

                for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                    if( listenersArray[lenghtListenersArray] == this){

                        this.doEvent('beforeRemoveModuleFromAuditionOtherModule');
                        this.doEventAfterStandartEvent('beforeRemoveModuleFromAuditionOtherModule');

                        module.doEvent('beforeRemoveModuleFromAudition');
                        module.doEventAfterStandartEvent('beforeRemoveModuleFromAudition');

                        module.removeAuditionFromList(this);

                        listenersArray.splice(lenghtListenersArray, 1);

                        module.doEvent('afterRemoveModuleFromAudition');
                        module.doEventAfterStandartEvent('afterRemoveModuleFromAudition');

                        this.doEvent('afterRemoveModuleFromAuditionOtherModule');
                        this.doEventAfterStandartEvent('afterRemoveModuleFromAuditionOtherModule');

                        break;
                    }
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

    for (var name in Modules ){          //TODO фильтровать поскольку есть ещё свойства свои и документ

        if(name != 'document' && name != 'Pages' && name != 'startFunctions' && name != 'closeFunctions'  && name != 'extendCore'  &&
            name != 'createNewModule' && name != 'removeModules'){

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

                    this.doEvent('beforeAddModuleToAuditionOtherModules');
                    this.doEventAfterStandartEvent('beforeAddModuleToAuditionOtherModules');

                    module.doEvent('beforeAddModuleToAudition');
                    module.doEventAfterStandartEvent('beforeAddModuleToAudition');

                    listenersArray.push(this);

                    listenersModule.addAuditionToList(this);


                    module.doEvent('afterAddModuleToAudition');
                    module.doEventAfterStandartEvent('afterAddModuleToAudition');

                    this.doEvent('afterAddModuleToAuditionOtherModules');
                    this.doEventAfterStandartEvent('afterAddModuleToAuditionOtherModules');
                }
            }
        }
    }

    return this;

};