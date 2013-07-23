Module.prototype.addEventListener = function(nameEvent, functionToEvent, eventAfterEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];

    this.doEvent('beforeAddEvent');
    this.doEventAfterStandartEvent('beforeAddEvent');

    if(!events.that){

        events.that = this;
    }


    if(newEvent){

        eventsAfterEvent && (newEvent.eventsAfterEvent = eventsAfterEvent);
        functionToEvent && (newEvent.functionToEvent = functionToEvent);
        newEvent.that = this;
    }
    else{
        events[nameEvent] = {
            'functionToEvent' : functionToEvent,
            'eventsAfterEvent' : eventAfterEvent,
            'that': this
        };
    }

    this.doEvent('afterAddEvent');
    this.doEventAfterStandartEvent('afterAddEvent');

    return this;
};

Module.prototype.removeEventListener = function(nameEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];

    this.doEvent('beforeRemoveEvent');
    this.doEventAfterStandartEvent('beforeRemoveEvent');

    if(!newEvent){
        throw("event '"+ nameEvent +"'  is not exist");
        return this;
    }

    delete newEvent;

    this.doEvent('afterRemoveEvent');
    this.doEventAfterStandartEvent('afterRemoveEvent');

    return this;

};

Module.prototype.changeEventListener = function(nameEvent, functionToEvent, eventAfterEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];

    this.doEvent('beforeChangeEvent');
    this.doEventAfterStandartEvent('beforeChangeEvent');

    if(!newEvent){

        throw("event '"+ nameEvent +"'  is not exist");

        return this;
    }

    eventsAfterEvent && (newEvent.eventsAfterEvent = eventsAfterEvent);
    functionToEvent && (newEvent.functionToEvent = functionToEvent);
    newEvent.that = this;

    this.doEvent('afterChangeEvent');
    this.doEventAfterStandartEvent('afterChangeEvent');

    return this;
};

Module.prototype.hasEventListener = function(EventName){

    return  (this.events[EventName] ? true  :false);

};

Module.prototype.getEventListener = function(EventName){

    var event = this.events[EventName];

    if(!event){

        return null;
    }

    return {
        'eventName' :  EventName,
        'eventsAfterEvent' :  event.eventsAfterEvent,
        'functionForEvent' :  event.functionToEvent
    };

};

Module.prototype.getAllEventsListeners = function(){

    var event = this.events;
    var returnObj = {};
    var moduleEvent;

    for(var name in event){

        moduleEvent = event[name];

        if (moduleEvent!= this && name != 'userEventsTable'){

            returnObj[name] = {
                'eventName' :  name,
                'eventsAfterEvent' :  moduleEvent.eventsAfterEvent,
                'functionForEvent' :  moduleEvent.functionToEvent
            };
        }
    }

   return returnObj;
};

Module.prototype.getAllListenersName = function(){

    var elements =  this.events;
    var returnObj = {};

    for (var name in elements) {

        if(elements[name] != this){

            returnObj[name] = name;
        }
    }

    return returnObj;
};



Module.prototype.addViewEventListener = function(eLement, userEvent, moduleEvent){

        var events = this.events;
        var userEventsTable = events.userEventsTable;

            this.doEvent('beforeAddViewEvent');
            this.doEventAfterStandartEvent('beforeAddViewEvent');

            var elementOfView = userEventsTable[eLement];

            if(!elementOfView){

                    elementOfView =userEventsTable[eLement] = {};
                elementOfView.that = this;
            }

            if(elementOfView[userEvent]){
                throw("event for element'"+ eLement +"' '"+userEvent+"'  is exist");
                return this;
            }

            elementOfView[userEvent] = moduleEvent;

            this.doEvent('afterAddViewEvent');
            this.doEventAfterStandartEvent('afterAddViewEvent');

            return this;
    };

    Module.prototype.removeViewEventListenerFromElement = function(eLement, userEvent){

        var events = this.events;
        var userEventsTable = events.userEventsTable;

        this.doEvent('beforeRemoveViewEvent');
        this.doEventAfterStandartEvent('beforeRemoveViewEvent');

            if(!userEventsTable){

                throw('Module has not any users event');
                return this;
            }

            var elementOfView = userEventsTable[eLement];

            if(!elementOfView){

                throw('Module has not any events for this element');
                return this;
            }

            var event = elementOfView[userEvent];

            if(!elementOfView){

                throw('Module has not this events for this element');
                return this;
            }

            delete event;

        this.doEvent('afterRemoveViewEvent');
        this.doEventAfterStandartEvent('afterRemoveViewEvent');

        };

    Module.prototype.removeViewAllEventListenersFromElement = function(eLement){

        var events = this.events;
        var userEventsTable = events.userEventsTable;

        this.doEvent('beforeRemoveViewAllEvents');
        this.doEventAfterStandartEvent('beforeRemoveViewAllEvents');

        if(!userEventsTable){

            throw('Module has not any users event');
            return this;
        }

        var elementOfView = userEventsTable[eLement];

        if(!elementOfView){

            throw('Module has not any events for this element');
            return this;
        }

        delete elementOfView;

        this.doEvent('afterRemoveViewAllEvents');
        this.doEventAfterStandartEvent('afterRemoveViewAllEvents');

    };


    Module.prototype.changeViewEventListener = function(eLement, userEvent, moduleEvent){

        var events = this.events;
        var userEventsTable = events.userEventsTable;

        this.doEvent('beforeChangeViewEvent');
        this.doEventAfterStandartEvent('beforeChangeViewEvent');

        if(!(events || events.userEventsTable || events.userEventsTable[eLement] || events.userEventsTable[eLement][userEvent])){

            throw("event for element'"+ eLement +"'   '"+userEvent+"'  is not exist");

            return this;
        }

        events.userEventsTable[eLement][userEvent]  = moduleEvent;

        this.doEvent('afterChangeViewEvent');
        this.doEventAfterStandartEvent('afterChangeViewEvent');

        return this;
    };

    Module.prototype.hasViewEventForElement =function(eLement, userEvent){

        return  this.events || this.events.userEventsTable || this.events.userEventsTable[eLement] || this.events.userEventsTable[eLement][userEvent ] ? true : false;

    };

    Module.prototype.getViewEventListenerForElement = function(eLement){

        var elementListeners = this.events || this.events.userEventsTable || this.events.userEventsTable[eLement];

        if (elementListeners){

            var returnObj = {};

            for (var name in elementListeners) {

                if(elementListeners[name] != this){

                    returnObj[name] = elementListeners[name];
                }
            }

            return  returnObj;
        }
        else{

            return null;
        }
    };



Module.prototype.createEvent= function(event, data, moduleNameGenerateEvent){

    stackEvents.pushEvent({
        eventType : event,
        eventData : data ? data : null,
        moduleName: moduleNameGenerateEvent ? moduleNameGenerateEvent : this._moduleName
    });

    return this;
};   // в стек событий

Module.prototype.doEventForAuditionNow= function(event, data, moduleNameGenerateEvent){

    modulesStudents.getModuleDevelopments({
        eventType : event,
        eventData : data ? data : null,
        moduleName: moduleNameGenerateEvent ? moduleNameGenerateEvent : this._moduleName
    });

    return this;

};   // запустить событие для подписанных модулей

Module.prototype.doEvent= function(event, data){

    if(this.events[event]){

        this.events[event]({
            eventType : event,
            moduleName : this._moduleName  || null,
            eventData : data ? data : null
        });
    }
    return this;
};   // выполнить событие для этого модуля

Module.prototype.doEventForOtherModule= function(module, event,data){

    if(module.events[event]){

        module.events[event]({
            eventType : event,
            moduleName : this._moduleName  || null,
            eventData : data ? data : null
        });
    }
    return this;
};   // выполнить событие для другого модуля


Module.prototype.doEventAfterStandartEvent = function(event, data){

    if(this.events[event] && this.events[event].eventAfterEvent){

        stackEvents.pushEvent({
            eventType : this.events[event].eventAfterEvent,
            moduleName : this._moduleName  || null,
            eventData : data ? data : null
        });
    }

}; // выполнить событие подвязаное после этого события

// события -до установки слушателя события -после       beforeAddModuleEvent    afterAddModuleEvent     beforeAddUserEvent  afterAddUserEvent
// события -до удаления слушателя события -после     beforeRemoveModuleEvent  afterRemoveModuleEvent    beforeRemoveUserEvent    afterRemoveUserEvent
// события -до изменения слушателя события -после   beforeChangeModuleEvent   afterChangeModuleEvent   beforeChangeUserEvent   afterChangeUserEvent


/*
   events{
         name events1{
                      function
                      evensAfterDone
          } ,

         .....

        userEventsTable {
                        'element1':{
                                'typeUserEvent' : 'nameModuleEvent'
                        }

                        .....
        }
   }

*/
