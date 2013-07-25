
Modules.startFunctions = [];
Modules.closeFunctions = [];


function doEvent(event){

    if(Modules.document.events[event]){

        Modules.document.events[event]();
    }
    return this;
};   // выполнить событие для этого модуля

function load(){

    // проверить поддерживает ли фонегап , да навесить слушатели событий на кнопки

    if(document.deviceready){

        document.addEventListener("deviceready", onDeviceReady, false);
    }
    else{

        for(var lengthArg = Modules.startFunctions.length; lengthArg--;){

            Modules.startFunctions[lengthArg]();
        }

        forkEventToAllModules('loaded');


        if(document.getElementById('startPage')){

            document.getElementById('startPage').style.display = 'none';
        }
    }
};
// онлоад

function onDeviceReady(){

    document.addEventListener("pause", doEvent("pause"), false);

    document.addEventListener("resume", doEvent("resume"), false);

    document.addEventListener("online", doEvent("online"), false);

    document.addEventListener("offline", doEvent("offline"), false)
    ;
    document.addEventListener("backbutton", doEvent("backbutton"), false);

    window.addEventListener("batterycritical", doEvent("batterycritical"), false);

    window.addEventListener("batterystatus", doEvent("batterystatus"), false);

    document.addEventListener("menubutton", doEvent("menubutton"), false);

    document.addEventListener("searchbutton", doEvent("searchbutton"), false);

    document.addEventListener("startcallbutton", doEvent("startcallbutton"), false);

    document.addEventListener("endcallbutton", doEvent("endcallbutton"), false);

    document.addEventListener("volumedownbutton", doEvent("volumedownbutton"), false);

    document.addEventListener("volumeupbutton", doEvent("volumeupbutton"), false);

    for(var lengthArg = Modules.startFunctions.length; lengthArg--;){

        Modules.startFunctions[lengthArg]();
    }

    forkEventToAllModules('loaded');

    if(document.getElementById('startPage')){

        document.getElementById('startPage').style.display = 'none';
    }
}

function onbeforeunload(){

    var stringExit = false;

    for(var lengthArg = Modules.closeFunctions.length; lengthArg--;){

        stringExit = Modules.closeFunctions[lengthArg]();

        if(typeof stringExit == 'string'){

            return  stringExit;
        }
    }

    forkEventToAllModules('beforeunload');

};
// выгрузка



// TODO это модуль слушающий самого себя по событиям и в каком можно переназначать функции на события взамен тех что по умолчанию   точнее функции обработчики событий вызывающие события для модуля документ
