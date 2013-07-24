
Modules.startFunctions = [];
Modules.closeFunctions = [];




function load(){

    for(var lengthArg = Modules.startFunctions.length; lengthArg--;){

        Modules.startFunctions[lengthArg]();
    }

    // проверить поддерживает ли фонегап , да навесить слушатели событий на кнопки

    if(document.deviceready){

        document.addEventListener("deviceready", onDeviceReady, false);
    }
    else{

        stackEvents.pushEvent({
            eventType : 'loaded',
            moduleName: 'document'
        });
    }
};
// онлоад

function onDeviceReady(){

    document.addEventListener("pause", yourCallbackFunction, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("online", yourCallbackFunction, false);

    document.addEventListener("offline", yourCallbackFunction, false);
    document.addEventListener("backbutton", yourCallbackFunction, false);

    window.addEventListener("batterycritical", yourCallbackFunction, false);
    window.addEventListener("batterystatus", yourCallbackFunction, false);

    document.addEventListener("menubutton", yourCallbackFunction, false);

    document.addEventListener("searchbutton", yourCallbackFunction, false);
    document.addEventListener("startcallbutton", yourCallbackFunction, false);

    document.addEventListener("endcallbutton", yourCallbackFunction, false);
    document.addEventListener("volumedownbutton", yourCallbackFunction, false);

    document.addEventListener("volumeupbutton", yourCallbackFunction, false);











    stackEvents.pushEvent({
        eventType : 'loaded',
        moduleName: 'document'
    });
}

function onbeforeunload(){

    var stringExit = false;

    for(var lengthArg = Modules.closeFunctions.length; lengthArg--;){

        stringExit = Modules.closeFunctions[lengthArg]();

        if(typeof stringExit == 'string'){

            return  stringExit;
        }
    }


};
// выгрузка



// TODO это модуль слушающий самого себя по событиям и в каком можно переназначать функции на события взамен тех что по умолчанию   точнее функции обработчики событий вызывающие события для модуля документ
