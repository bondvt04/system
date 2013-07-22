// запоминает какой модуль послал запрос отдаёт ответ в него
// генерирует события
// до отравки аякс   - автоматом
// после получения аякс - автоматом сетит если не переназначен  в модуль отравитель


//TODO Если планируется не более одного запроса одновременно -должен быть флаг на уровне свойства объекта Modules
//TODO  таймеры количество попыток
//TODO  заголовки по умолчанию если не переустанавливаются в объекте настройки



Module.prototype.setAjaxOptons = function(options){

    if(Object.prototype.toString.call(options) == "[object Object]"){

        this.AjaxData = options;
    }
    else{

        throw('Error in ajax options') ;
    }
};

Module.prototype.getAjaxOptons = function(){

   return this.AjaxData;
};

Module.prototype.getServerResponse = function(event){

    if(!flagResponse){

        var ajaxData = this.AjaxData;

        if(this.beforeSendAjaxRequest){

            ajaxData.dataToSend =  this.beforeSendAjaxRequest(this._attributes);

            if(this.changeSendAjaxRequest){

                ajaxData.dataToSend =  this.changeSendAjaxRequest(ajaxData.dataToSend);
            }
        }

        if(event){
             if(event.dataForEvent){

                 ajaxData =  event.dataForEvent;
             }
        }

        var moduleName = this._moduleName;
        //var that = this;
        // счётчик здесь и таймер

        var count = 0;
        var timer;

        flagResponse = true;
        this.isGetRequest = false;



        function sendAjax(that){



            function setAjaxRequestObject(){

                var req;

                if (window.XMLHttpRequest){

                    req = new XMLHttpRequest();
                }
                else{

                    if (window.ActiveXObject){
                        try{
                            req = new ActiveXObject('Msxml2.XMLHTTP');
                        }
                        catch (e){
                            try{
                                req = new ActiveXObject('Microsoft.XMLHTTP');
                            }
                            catch (e){

                                return null;
                            }
                        }
                    }
                }

                return  req;
            }

            function setOnReadyState(){

                var response;

                if (requestObject.readyState == 4  &&  requestObject.status == 200)  {

                    if(that.afterGetAjaxResponse){
                        that.afterGetAjaxResponse();
                    }

                    response = requestObject.responseText;

                    clearTimeout(timer);
                    that.isGetRequest = true;

                    flagResponse = false;

                    if(ajaxRequests.length){

                        (Modules[ajaxRequests.turn.shift()]).getServerResponse();
                    }

                    response = that.afterGetNoErrorResponse(response);

                    if(response){
                        that.getResponse(response);
                    }

                    if(that.events.getServerResponse && that.events.getServerResponse.eventAfterEvent){

                        stackEvents.pushEvent({
                            eventType : this.events.getServerResponse.eventAfterEvent,
                            moduleName : that._moduleName
                        });
                    }
                    else{

                        return null;
                    }
                }

                if (requestObject.readyState == 4  &&  (requestObject.status > 400 && requestObject.status < 500))  {

                    if(that.afterGetAjaxResponse){
                        that.afterGetAjaxResponse();
                    }

                    response = requestObject.responseText;

                    clearTimeout(timer);
                    that.isGetRequest = true;

                    flagResponse = false;

                    if(ajaxRequests.length){

                        (Modules[ajaxRequests.turn.shift()]).getServerResponse();
                    }

                    if(that.getError400){

                        setTimeout(function(){that.getError400(response)},0);
                    }

                    if(that.events.getError400 && that.events.getError400.eventAfterEvent){

                        stackEvents.pushEvent({
                            eventType : this.events.getError400.eventAfterEvent,
                            moduleName : that._moduleName
                        });
                    }
                    else{

                        return null;
                    }
                }

                if (requestObject.readyState == 4  &&  requestObject.status > 500 )  {

                    if(that.afterGetAjaxResponse){
                        that.afterGetAjaxResponse();
                    }

                    response = requestObject.responseText;

                    clearTimeout(timer);
                    that.isGetRequest = true;

                    flagResponse = false;

                    if(ajaxRequests.length){

                        (Modules[ajaxRequests.turn.shift()]).getServerResponse();
                    }

                    if(that.getError500){

                        setTimeout(function(){that.getError400(response)},0);
                    }

                    if(that.events.getError500 && that.events.getError500.eventAfterEvent){

                        stackEvents.pushEvent({
                            eventType : this.events.getError500.eventAfterEvent,
                            moduleName : that._moduleName
                        });
                    }
                    else{

                        return null;
                    }
                }
            }

            var requestObj = setAjaxRequestObject();

            if(requestObj){

                if(ajaxData.requestType == 'POST'){

                    requestObject.onreadystatechange = setOnReadyState;

                    requestObject.open("POST", ajaxData.url, true);

                    //requestObject.setRequestHeader(that.AjaxData.Headers || "Content-Type", "application/x-www-form-urlencoded","Cache-Control: no-store, no-cache, must-revalidate");      //TODO подумать как обыграть

                    requestObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded","Cache-Control: no-store, no-cache, must-revalidate");
                    requestObject.send('data=' + ajaxData.dataToSend);

                    if(that.afterSendAjax){
                        that.afterSendAjax();
                    }

                }



                if(ajaxData.requestType == 'GET'){

                    //requestObject.open("GET", ajaxData.url +'?data=' + ajaxData.dataToSend , true);

                    requestObject.open("GET", ajaxData.url, true);

                    requestObject.onreadystatechange = setOnReadyState;
                    requestObject.send(null);

                    if(that.afterSendAjax){
                        that.afterSendAjax();
                    }
                }

            }

            flagResponse = true;
            isGetRequest = false;


            timer = setTimeout( function(){
                if(!that.isGetRequest  &&  count < 5){
                    flagResponse = false;   //??
                    requestObject.abort();
                    that.count++;
                    that.sendAjax(event);

                }
                else{
                    requestObject.abort();
                    count = 0;
                    flagResponse = false;
                    that.overNumberAttemptsAjaxRequest();

                    if(ajaxRequests.length){
                        (Modules[ajaxRequests.turn.shift()]).getServerResponse();
                    }


                }
            },10000);
        }

        sendAjax(this);

        if(event){

            if(this.events[event.eventType].eventAfterEvent){


                return {
                    eventType : this.events[event.eventType].eventAfterEvent,
                    moduleName : moduleName
                }

            }
            else{
                return null;
            }

            //TODO вернуть след событие если есть или null
        }

    }
    else{

        ajaxRequests.push(this._moduleName);

    }

};


Module.prototype.changeSendAjaxRequest = function(ajaxData){
    // Изменние параметров аякс запроса
    return  ajaxData;
};

Module.prototype.afterSendAjax = function(){
    // Допустим показать прелоадер чтоб не засерать другие события и разнести их по разгным узлам
};

Module.prototype.afterGetAjaxRequest = function(){
    // Допустим удалить прелоадер чтоб не засерать другие события и разнести их по разгным узлам
};

Module.prototype.overNumberAttemptsAjaxRequest = function(data){

     // закончилось количество попыток , ответ в означенное время ни разу не вернулся
};

Module.prototype.getError500 = function(data){

    /* if(аякс свойство не превысило попыток или окрасить , вывести чегото){

     }
     */
    // this.getServerResponse();
};

Module.prototype.getError400 = function(data){

   /* if(аякс свойство не превысило попыток или окрасить , вывести чегото){

    }
  */
  // this.getServerResponse();
};


Module.prototype.getResponse = function(data){

    this.set(data);
};

Module.prototype.getAjaxData = function(){

    return this.ajaxAttributes;

};

Module.prototype.setAjaxData = function(data){

    this.ajaxAttributes = data;

    return this;
};

Module.prototype.beforeSendAjaxRequest = function(data){

    return JSON.stringify(data);
};

Module.prototype.afterGetNoErrorResponse = function(data){

    return data;
};

//+
//TODO  вынести функции обработки ответа в отдельные функции чтоб при гете можно было ссылаться
//TODO  События запрос отравился, запрос пришел -чтоб не загаживать обработчики ответа прелоадерами   усановкой их и снятием
//TODO один запрос одновременно


//+
//TODO  метод должен быть чтобы прееопределять данные при запросах , возможно только гет. Т.е должен быть просто адрес -а сервер уже отдаёт данные , нипкаких параметров в гет запросе быть не должно
//TODO  т.е клик по ссылке действие переход , замена адреса в модуле в разделе данные аякс , посыл запроса
//TODO  показать соотв шаблон если он другой, записать в него  данные показать


//+
//TODO  Данные перед запросами организуются , выбираются , могут получатьсяи из объекта event  так и атрибутов либо другой информации. в методах "пред отравкой " и т.д вызываются методы по переорганизации данных

//+
//TODO  и их результат используетмся кк адрес , данные запроса и т.д по умолчанию они возвращают атрибуты и аякс настройки , но могут возвращать любые данные какие будут использоваться как атрибуты запроса, либо данные . 2 метода
//TODO один возвращает атрибуты запроса какие будут использоваться, не переопределяя обозначенные в методе(или преопределяя), второй возвращает отправ. данныые возвращает -по умолчанию атрибуты модуля

//______________________________________________________________________________________________________________________________________________
