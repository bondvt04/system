Module.prototype.addEventListener = function(nameEvent, functionToEvent, eventAfterEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];

    if(events.beforeAddModuleEvent){
        events.beforeAddModuleEvent();
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

    if(events.afterAddModuleEvent){
        events.afterAddModuleEvent();
    }

    return this;
};

Module.prototype.removeEventListener = function(nameEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];

    if(events.beforeRemoveModuleEvent){
        events.beforeRemoveModuleEvent();
    }

    if(!newEvent){
        console.log("event '"+ nameEvent +"'  is not exist");
        return this;
    }

    delete newEvent;

    if(events.afterRemoveModuleEvent){
        events.afterRemoveModuleEvent();
    }

    return this;

};

Module.prototype.changeEventListener = function(nameEvent, functionToEvent, eventAfterEvent){

    var events = this.events;
    var newEvent =  events[nameEvent];

    if(events.beforeChangeModuleEvent){
        events.beforeChangeModuleEvent();
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

    if(events.afterChangeModuleEvent){
        events.afterChangeModuleEvent();
    }

    return this;
};

Module.prototype.hasEventListener = function(userEventName){

    return  (this.events[userEventName] ? true  :false);

};

Module.prototype.getEventListener = function(userEventName){

    var event = this.events[userEventName];

    if(!event){

        return null;
    }

    return {
        'eventName' :  userEventName,
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



Module.prototype.addUserEventListener = function(eLement, userEvent, moduleEvent){

    var events = this.events;
    var userEventsTable = events.userEventsTable;

    if(events.beforeAddUserEvent){
        events.beforeAddUserEvent();
    }

    if(!userEventsTable){

        userEventsTable ={};
        userEventsTable.that = this;
    }

    var elementOfView = userEventsTable[eLement];

    if(!elementOfView){

        elementOfView ={};
        elementOfView.that = this;
    }

    var newUserEvent =  elementOfView[userEvent];

    if(newUserEvent){
        console.log("event for element'"+ eLement +"' '"+userEvent+"'  is exist");
        return this;
    }

    newUserEvent = moduleEvent;

    if(events.afterAddUserEvent){
        events.afterAddUserEvent();
    }

    return this;
};

Module.prototype.removeUserEventListenerFromElement = function(eLement, userEvent){

    var events = this.events;
    var userEventsTable = events.userEventsTable;

    if(events.beforeRemoveUserEvent){
        events.beforeRemoveUserEvent();
    }

    if(!userEventsTable){

        console.log('Module has not any users event');
        return this;
    }

    var elementOfView = userEventsTable[eLement];

    if(!elementOfView){

        console.log('Module has not any events for this element');
        return this;
    }

    var event = elementOfView[userEvent];

    if(!elementOfView){

        console.log('Module has not this events for this element');
        return this;
    }

    delete event;

    if(events.afterRemoveUserEvent){
        events.afterRemoveUserEvent();
    }

};

Module.prototype.removeUserAllEventListenersFromElement = function(eLement){

    var events = this.events;
    var userEventsTable = events.userEventsTable;

    if(events.beforeRemoveUserEvent){
        events.beforeRemoveUserEvent();
    }

    if(!userEventsTable){

        console.log('Module has not any users event');
        return this;
    }

    var elementOfView = userEventsTable[eLement];

    if(!elementOfView){

        console.log('Module has not any events for this element');
        return this;
    }

    delete elementOfView;

    if(events.afterRemoveUserEvent){
        events.afterRemoveUserEvent();
    }

};


Module.prototype.changeUserEventListener = function(eLement, userEvent, moduleEvent){

    var events = this.events;
    var userEventsTable = events.userEventsTable;

    if(events.beforeChangeUserEvent){
        events.beforeChangeUserEvent();
    }

    if(!(events || events.userEventsTable || events.userEventsTable[eLement] || events.userEventsTable[eLement][userEvent])){
        console.log("event for element'"+ eLement +"'   '"+userEvent+"'  is not exist");
        return this;
    }

    events.userEventsTable[eLement][userEvent]  = moduleEvent;

    if(events.afterChangeUserEvent){
        events.afterChangeUserEvent();
    }

    return this;
};

Module.prototype.hasUserEventForElement =function(eLement, userEvent){

    return  this.events || this.events.userEventsTable || this.events.userEventsTable[eLement] || this.events.userEventsTable[eLement][userEvent ] ? true : false;

};

Module.prototype.getUserEventListenerForElement = function(eLement){

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
    else {
        return null;
    }
};

Module.prototype.getAllListenersElements = function(){

    var elements =  this.events.userEventsTable;
    var returnObj = {};

    for (var name in elements) {

        if(elements[name] != this){

            returnObj[name] = name;
        }
    }

    return returnObj;
};



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
