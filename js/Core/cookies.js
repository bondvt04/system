// сет куки
Module.prototype.setCookie = function(cookies){

    var cookieString = '';

    for (var name in cookies){

        cookieString = cookieString + (name + '=' + cookies[name] + '; ');
    }
    document.cookie = cookieString;
};

// гет куки
Module.prototype.getCookie = function(cookie_name) {

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

Module.prototype.removeCookies = function(){

    for(var lengthArg = arguments.length; lengthArg--;){

        document.cookie = arguments[lengthArg] + '=; max-age=0';
    }

};

// валидны ли куки -есть ли все и соответсвуют ли шаблонам


Module.prototype.isValideCookies = function(cookie_name, template){

    var cookie =  Modules.document.getCookie(cookie_name);

    if(cookie){

        if (cookie.search(template) != -1){

            return true;
        }

    }

    return false;

};
