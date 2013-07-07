//Module.prototype._listeningsModules = [];
// TODO dobavit v massiv slushateley moduley ccilku na massiv podpisanni

/**
 *
 * @param modules
 */
Module.prototype.addModulesToAudition = function(modules){

    var listenersArray = this._listeningsModules;

    if (!listenersArray){
        listenersArray = [];
    }
    var listenerIsset = false;

    if (Object.prototype.toString.call(modules) == "[object Array]"){


        for (var lengthModules = modules.length; lengthModules --;){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                if( listenersArray[lenghtListenersArray] == modules[lengthModules]){

                    listenerIsset = true;
                    break;
                }
            }

            if(!listenerIsset){

                listenerIsset = false;
                listenersArray.push(modules[lengthModules]);
            }
        }

        return;
    }
    else{

        for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

            if( listenersArray[lenghtListenersArray] == modules[length]){

                listenerIsset = true;
                break;
            }
        }

        if(!listenerIsset){

            listenersArray.push(modules);
        }

    }
};


Module.prototype.removeModulesFomAudition = function(modules){

    var listenersArray = this._listeningsModules;
    var index;

    if (Object.prototype.toString.call(modules) == "[object Array]"){
        for (var lengthModules = modules.length; lengthModules --;){

            if (listenersArray){

                for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                    if( listenersArray[lenghtListenersArray] == modules[lengthModules]){

                        listenersArray.splice(lenghtListenersArray, 1);
                        break;
                    }
                }
            }
        }
        return;
    }
    else{

        if (listenersArray){

            for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                if( listenersArray[lenghtListenersArray] == modules){

                    listenersArray.splice(lenghtListenersArray, 1);
                    break;
                }
            }
        }
    }
};

Module.prototype.removeListenerFromModules = function(modules){

    var listenersArray;

    if (Object.prototype.toString.call(modules) == "[object Array]"){

        for (var lengthModules = modules.length; lengthModules --;){

            listenersArray = modules[lengthModules]._listeningsModules;

            if (listenersArray){

                for (var lenghtListenersArray = listenersArray.length; lenghtListenersArray --;) {

                    if( listenersArray[lenghtListenersArray] == this){

                        listenersArray.splice(lenghtListenersArray, 1);
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

                    listenersArray.splice(lenghtListenersArray, 1);
                    break;
                }
            }
        }
    }
};




//    Modules.mod2.addModulesToAudition( module | array modules);
//    Modules.mod2.removeModulesFomAudition( module | array modules);


//    Modules.mod2.removeListenerFromModules( module | array modules);


// слушать события дочерних модулей 
// слушать события родительских модулей
// слушать события первого дочернего
// слушать события первого потомка 

