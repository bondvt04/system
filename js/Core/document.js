function forkEventToAllModules(eventType){
    // пройти по всем вызывать форк кидать всем форк
}







Modules.document = {};
// TODO свой навесчик событий при выполнении бросит либо генератор бросает событие в очередь при возникновении события




Modules.document.userData = {

};

Modules.document.setUserData = function(name, value){

    Modules.document.userData[name] = value;
};

Modules.document.getUserData = function(name){

    return Modules.document.userData[name];
};

Modules.document.removeUserData = function(){

    for (var argumentsLength = arguments.length; argumentsLength--;){

        delete Modules.document.userData[arguments[argumentsLength]];
    }
};

Modules.document.userFunctions = {

};

Modules.document.setUserFunctions = function(name, _arguments ,body){

    Modules.document.userFunctions[name] =  new Function(_arguments, body);
};

Modules.document.removeUserFunctions = function(){

    for (var argumentsLength = arguments.length; argumentsLength--;){

        delete Modules.document.userFunctions[arguments[argumentsLength]];
    }
};



Modules.document.event = {

    pause: function (){forkEventToAllModules('pause');},

    resume: function (){forkEventToAllModules('resume');},

    online: function (){forkEventToAllModules('online');},

    offline: function (){forkEventToAllModules('offline');},

    backbutton: function (){forkEventToAllModules('backbutton');},

    batterycritical: function (){forkEventToAllModules('batterycritical');},

    batterystatus: function (){forkEventToAllModules('batterystatus');},

    menubutton: function (){forkEventToAllModules('menubutton');},

    searchbutton: function (){forkEventToAllModules('searchbutton');},

    startcallbutton: function (){forkEventToAllModules('startcallbutton');},

    endcallbutton: function (){forkEventToAllModules('endcallbutton');},

    volumedownbutton: function (){forkEventToAllModules('volumedownbutton');},

    volumeupbutton: function (){forkEventToAllModules('volumeupbutton');}

};
// события после событий

Modules.document._systemData = {

};