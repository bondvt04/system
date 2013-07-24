Modules.document = {};
var _startFunctions = [];
var _closeFunctions = [];

// сет куки
Modules.document.setCookie = function(cookies){

    var cookieString = '';

    for (var name in cookies){

        cookieString = cookieString + (name + '=' + cookies[name] + '; ');
    }
    document.cookie = cookieString;
};

// гет куки
Modules.document.getCookie = function(cookie_name) {

    var cookie = document.cookie, length = cookie.length;

    if(length) {

        var cookie_start = cookie.indexOf(cookie_name + "=");

        if(cookie_start != -1) {

            var cookie_end = cookie.indexOf(";", cookie_start);

            if(cookie_end == -1) {

                cookie_end = length;
            }
            cookie_start += cookie_name.length + 1;

            return cookie.substring(cookie_start, cookie_end);
        }
    }
    return null;
};

// ремове куки

Modules.document.removeCookies = function(){

    for(var lengthArg = arguments.length; lengthArg--;){

        document.cookie = arguments[lengthArg] + '=; max-age=0';
    }

};
// валидны ли куки -есть ли все и соответсвуют ли шаблонам


Modules.document.isValideCookies = function(cookie_name, template){

    var cookie =  Modules.document.getCookie(cookie_name);

    if(cookie){

        if (cookie.search(template) != -1){

            return true;
        }

    }

    return false;

};
// мов блоков в слайдере
// откат если нет скрола
// скрол

// бек
// мени

Modules.document.load = function(){

    for(var lengthArg = _startFunctions.length; lengthArg--;){

        _startFunctions[lengthArg]();
    }

    stackEvents.pushEvent({
        eventType : 'loaded',
        moduleName: 'document'
    });
};
// онлоад


Modules.document.onbeforeunload = function(){

    var stringExit = false;

    for(var lengthArg = _closeFunctions.length; lengthArg--;){

        stringExit = _closeFunctions[lengthArg]();

        if(typeof stringExit == 'string'){

           return  stringExit;
        }
    }


};
// выгрузка

// очередь показанных
// порядок показа -возможно в модуле содеоржащемм скрипт или здесь объект имён модулей каждый из которых массив поледовательнолстей

// запоминание в фрагмент , получение из него
// определение типа устройства браузера