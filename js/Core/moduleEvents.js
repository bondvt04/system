Module.prototype.addEventListener = function(nameEvent, functionToEvent, eventAfterEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];

    if(events.beforeAddEvent){
        events.beforeAddEvent();
    }

    if(newEvent){
        console.log("event '"+ nameEvent +"'  is exist");
        return this;
    }

    if(!events.that){

        events.that = this;
    }

    newEvent = {
        'functionToEvent' : functionToEvent,
        'eventsAfterEvent' : eventAfterEvent,
        'that': this
    };

    if(events.afterAddEvent){
        events.afterAddEvent();
    }

    return this;
};

Module.prototype.removeEventListener = function(nameEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];

    if(events.beforeRemoveEvent){
        events.beforeRemoveEvent();
    }

    if(!newEvent){
        console.log("event '"+ nameEvent +"'  is not exist");
        return this;
    }

    delete newEvent;

    if(events.afterRemoveEvent){
        events.afterRemoveEvent();
    }

    return this;

};

Module.prototype.changeEventListener = function(nameEvent, functionToEvent, eventAfterEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];


    if(events.beforeChangeEvent){
        events.beforeChangeEvent();
    }

    if(!newEvent){
        console.log("event '"+ nameEvent +"'  is not exist");
        return this;
    }

    newEvent = {
        'functionToEvent' : functionToEvent,
        'eventAfterEvent' : eventAfterEvent,
        'that': this
    };

    if(events.afterChangeEvent){
        events.afterChangeEvent();
    }

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

Module.prototype.doEvent= function(event,data){

    if(this.events[event]){

        this.events[event]({
            eventType : event,
            eventData : data ? data : null
        });
    }
    return this;
};   // выполнить событие для этого модуля


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
