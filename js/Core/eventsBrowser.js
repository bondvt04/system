
Modules.startFunctions = [];
Modules.closeFunctions = [];


function doEvent(event){

    if(Modules.document.events[event]){

        Modules.document.events[event]();
    }
    return this;
}   // выполнить событие для этого модуля

function load(){

    // проверить поддерживает ли фонегап , да навесить слушатели событий на кнопки

    if('deviceready' in document){

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
}
// онлоад

function onDeviceReady(){

    document.addEventListener("pause", function(){doEvent("pause")}, false);

    document.addEventListener("resume", function(){doEvent("resume")}, false);

    document.addEventListener("online", function(){doEvent("online")}, false);

    document.addEventListener("offline", function(){doEvent("offline")}, false);

    document.addEventListener("backbutton", function(){doEvent("backbutton")}, false);

    window.addEventListener("batterycritical", function(){doEvent("batterycritical")}, false);

    window.addEventListener("batterystatus", function(){doEvent("batterystatus")}, false);

    document.addEventListener("menubutton", function(){doEvent("menubutton")}, false);

    document.addEventListener("searchbutton", function(){doEvent("searchbutton")}, false);

    document.addEventListener("startcallbutton", function(){doEvent("startcallbutton")}, false);

    document.addEventListener("endcallbutton", function(){doEvent("endcallbutton")}, false);

    document.addEventListener("volumedownbutton", function(){doEvent("volumedownbutton")}, false);

    document.addEventListener("volumeupbutton", function(){doEvent("volumeupbutton")}, false);

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

}
// выгрузка



// TODO это модуль слушающий самого себя по событиям и в каком можно переназначать функции на события взамен тех что по умолчанию   точнее функции обработчики событий вызывающие события для модуля документ
