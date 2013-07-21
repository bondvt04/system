// запоминает какой модуль послал запрос отдаёт ответ в него
// генерирует события
// до отравки аякс   - автоматом
// после получения аякс - автоматом сетит если не переназначен  в модуль отравитель


//TODO Если планируется не более одного запроса одновременно -должен быть флаг на уровне свойства объекта Modules

Module.prototype.getServerResponse = function(){

    var ajaxData = this.getAjaxData;

    if(this.beforeSendAjaxRequest){

        ajaxData.dataToSend =  this.beforeSendAjaxRequest(this._attributes);
    }


    var moduleName = this._moduleName;
    //var that = this;
    // счётчик здесь и таймер

    var count = 0;
    var timer;



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

        var requestObj = setAjaxRequestObject();

        if(requestObj){

            if(ajaxData.requestType == 'POST'){



                requestObject.onreadystatechange = function() {

                    if (requestObject.readyState == 4  &&  requestObject.status == 200)  {

                        var response = requestObject.responseText;

                        clearTimeout(timer);

                        response = that.afterSendAjaxRequest(response);

                        if(response){
                            that.getResponse(response);
                        }

                        return;
                    }

                    if (requestObject.readyState == 4  &&  (requestObject.status > 400 && requestObject.status < 500))  {

                        var response = requestObject.responseText;

                        clearTimeout(timer);

                        if(that.getError400){

                            setTimeout(function(){that.getError400(response)},0);
                        }

                        return;
                    }

                    if (requestObject.readyState == 4  &&  requestObject.status > 500 )  {

                        var response = requestObject.responseText;

                        clearTimeout(timer);

                        if(that.getError500){

                            setTimeout(function(){that.getError400(response)},0);
                        }

                        return;
                    }
                }

            }



            if(ajaxData.requestType == 'GET'){

            }

        }
    }

    sendAjax(this);

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

Module.prototype.afterSendAjaxRequest = function(data){

    return data;
};


//TODO  вынести функции обработки ответа в отдельные функции чтоб при гете можно было ссылаться
//TODO  События запрос отравился, запрос пришел -чтоб не загаживать обработчики ответа прелоадерами   усановкой их и снятием
//TODO один запрос одновременно
/**
 * @land Ajax
 * @description Методы для работы с Ajax
 */
borrowedMethods.Ajax = {

    /**
     * @land sendAjax
     * @param {Object} event Объект события
     * @description Отправляет Аякс запрос по укаазанному в модуле адресу и указанным способом
     * @description Если на момент действия есть активный запрос, ставит запрос вочередь
     * @description Генерирует событие получение Аякс ответа, если в очереди есть запросы отправляет первый из очереди
     * @description В случае ошибки отправляет запрос повторно, пока не исчерпается количество попыток для данного запроса
     * @return {Object} Возвращает в объекте собранную информацию событие "информация полученна с сервера ", какое пердаётся с полученной информацией на все подписанные модули
     */
    sendAjax : function(event){
        event = borrowedMethods.cloneEventObject(event);
        /** Если есть активный запрос поставить запрос с в очередь */
        if(borrowedMethods.Ajax.flagResponse){
            borrowedMethods.Ajax.putInTurn(event);
            return null;
        }

        var requestObject = borrowedMethods.Ajax.setAjaxRequestObject();
        /** Если XHR объект создан и количество попыток не превысило допустимое */
        if(requestObject){
            /** Если  количество попыток не превысило допустимое */
            if(borrowedMethods.Ajax.count<=5) {
                var dataRequest = JSON.stringify(event.information);
                var request = 'data=' + dataRequest;
                that = borrowedMethods.Ajax;

                if(event.typeRequest == 'POST'){
                    requestObject.onreadystatechange = function() {
                        if (requestObject.readyState == 4  &&  requestObject.status == 200)  {
                            event.answerCondition = 'takeAjaxRequest';
                            that.isGetRequest = true;
                            clearTimeout(borrowedMethods.Ajax.timeout_id);
                            that.count = 0;
                            that.flagResponse = false;
                            if(that.turn.length){
                                that.takeFromTurn();
                            }
                            that.processingResponseFunction(requestObject.responseText, event);
                            return;
                        }

                        if (requestObject.readyState == 4  &&  (requestObject.status > 400 && requestObject.status < 500))  {
                            event.answerCondition = 'noPagetError';
                            that.isGetRequest = true;
                            clearTimeout(borrowedMethods.Ajax.timeout_id);
                            that.count = 0;
                            that.flagResponse = false;
                            if(that.turn.length){
                                that.takeFromTurn();
                            }
                            that.processingResponseFunction(requestObject.responseText, event);
                            return;
                        }

                        if (requestObject.readyState == 4  &&  requestObject.status > 500 )  {
                            event.answerCondition = 'AjaxServerError';
                            that.isGetRequest = true;
                            clearTimeout(borrowedMethods.Ajax.timeout_id);
                            that.count = 0;
                            that.flagResponse = false;
                            if(that.turn.length){
                                that.takeFromTurn();
                            }
                            that.processingResponseFunction(requestObject.responseText, event);
                            return;
                        }


                    };

                    requestObject.open("POST", event.nameServerScript, true);
                    requestObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded","Cache-Control: no-store, no-cache, must-revalidate");
                    requestObject.send(request);

                    borrowedMethods.Ajax.flagResponse = true;
                    borrowedMethods.Ajax.isGetRequest = false;


                    borrowedMethods.Ajax.timeout_id = setTimeout( function(){
                        if(!that.isGetRequest  &&  that.count < 5){
                            that.flagResponse = false;
                            requestObject.abort();
                            that.count++;
                            that.sendAjax(event);

                        }
                        else{
                            requestObject.abort();
                            that.count = 0;
                            that.flagResponse = false;
                            event.answerCondition = 'exceededSendAjax';
                            that.processingResponseFunction("", event);
                            that.takeFromTurn();

                        }
                    },10000);
                }

                if(event.typeRequest == 'GET'){

                }
            }

            /**
             * Сбросить счётчик запросов
             * Сбросить флаг запросов
             * Сгенерировать событие ошибки
             * Отправить след. запрос из очереди если он существует
             */
            else{
                borrowedMethods.Ajax.count = 0;
                borrowedMethods.Ajax.flagResponse = true;
                borrowedMethods.Ajax.takeFromTurn();
                event.answerCondition = 'serverErrorAjax';
                that.processingResponseFunction("", event);
            }
        }
        else{
            /**
             * Сбросить счётчик запросов
             * Сбросить флаг запросов
             * Сгенерировать событие ошибки cоздания  XHR объекта
             */
            borrowedMethods.Ajax.count = 0;
            borrowedMethods.Ajax.flagResponse = true;
            event.answerCondition = 'errorCreateXHRObject';
            that.processingResponseFunction("", event);
        }
    },

    /**
     * @property turn
     * @description очередь
     */
    turn:[],

    /**
     * @property isGetRequest
     * @description указатель получения ответа
     */
    isGetRequest : false,

    /**
     * @property count
     * @description Счётчик неудачных попыток запроса
     */
    count:0,

    /**
     * @property flagResponse
     * @description Флаг состояния запроса
     */
    flagResponse:false,

    /**
     * @land putInTurn
     * @param {Object} event Объект события
     * @description Поставить Аякс запрос в очередь
     */
    putInTurn :function(event){
        /** Если массива очередь не существует созать его */
        if(!this.turn) this.turn = [];
        this.turn.push(event);
    },

    /**
     * @land takeFromTurn
     * @description Отправить первый запрос из очереди
     */
    takeFromTurn : function(){
        /** Если в очереди есть запросы отправить первый из них */
        if(this.turn ){
            var ajaxEvent = this.turn.shift();
            if(ajaxEvent){
                this.sendAjax(ajaxEvent);
            }
        }
    },

    /**
     * @land setAjaxRequestObject
     * @description  Создать XHR объект
     * @return {Object} Возвращает XHR объект , либо null в случае неудачи
     */
    setAjaxRequestObject : function(){
        var req;
        if (window.XMLHttpRequest) req = new XMLHttpRequest();
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
    },

    /**
     * @land processingResponseFunction
     * @description  Обрабатывает Аякс ответ, Передаёт ответ всем модулям слушающим события модуля какому пришел ответ
     */
    processingResponseFunction : function(response, event){
        event.eventType = 'getDataFromServer';
        event.information = response;
        modulesStudents.getModuleDevelopments(event);

    }
};