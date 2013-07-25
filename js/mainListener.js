/**
 * @function
 * @description Функция модуль
 */

//(function (){

function forkEvent(obj){
    var clone ={};
    for(var prop in obj){
        clone[prop] = obj[prop];
    }
    return clone;
}

/**
 * @lends stackEvents 
 * @description Объект для работы с очередью
 * @description Обдает методами: для постоновки объкта события в очередь(pushEvent) и получением объекта из неё(getEvent)
 * @description        свойствами: очередь (stack) массив
*/
var stackEvents = {
	/**
 	* @private
	* @type Array
 	* @description Очередь событий
 	*/
	stack : [], 
	
	/**
 	* @private
	* @param {Object} eventObj Объект события
 	* @description Метод ставит объект события в конец очереди
 	*/
    pushEvent : function(eventObj){
		this.stack.push(eventObj);
		setTimeout(stackEvents.getEvent, 0);
	},
	
	/**
 	* @private
	* @description Метод получает объект события из начала очереди. 
	* @description Передаёт на обработку методу modulesStudents.getModuleDevelopments.
	* @description Получет первый элемент события из очереди, если он существует
 	*/
	getEvent : function (){

		var event = stackEvents.stack.shift();
		if(event){			
			modulesStudents.getModuleDevelopments(event);						  
			setTimeout(stackEvents.getEvent, 0);
			
		}
	}
};

/**
 * @lends modulesStudents 
 * @description Определяет есть ли модули подписанные на события модуля в каком произошло событие.
 * @description В случае если есть, передаёт каждому из подписанных событие
 * @description Обдает методами: Определения модулей подписанных на событе модуля, и передачи события ему(getModuleDevelopments)
 * @description свойствами: таблица слушателей событий модуля, с ключам по именам модулей
*/
var modulesStudents = {
	
	/**
 	* @private
	* @type Object
 	* @description Таблица слушателей событий модуля, с ключами по имени модуля
	* @description Ссылается на внешний объект        
 	*/
	modulesInAnyEvents : modulesForAudition,
	
	/**
 	* @private
	* @description Метод получает список модулей слущающих события модуля в каком произошло событие.
	* @description Если есть слушатели данного модуля, предаёт каждому из слушателей объект события pageModules.ListenToTheEvent	
 	*/
	getModuleDevelopments : function(event){  
		var moduleName = event.moduleName;
		if(this.modulesInAnyEvents[moduleName]){

			for(var countListModulesForEvent = this.modulesInAnyEvents[moduleName].length; countListModulesForEvent--;){
				event.moduleName = this.modulesInAnyEvents[moduleName][countListModulesForEvent];  
				pageModules.ListenToTheEvent(event );
			}
		}
	}
};

// Модули страницы
/**
 * @lends pageModules 
 * @description Определяет есть ли у модуля слушателя обработчик данного события, и если есть предаёт объект события на него.
 * @description Если обработчик генерирует событие оно помещается в очередь событий stackEvents
 * @description Обдает методами: Определения подписанн ли модуль на прослушивание данного события(ListenToTheEvent)
 * @description        свойствами: таблица модулей с методами слушателями, свойствами и служебными методами модуля 
*/
var pageModules = {
	/**
 	* @private
	* @type Object
 	* @description Таблица модулей с методами слушателями, свойствами и служебными методами модуля, с ключами по имени модуля
	* @description Ссылается на внешний объект        
 	*/
	modules : Modules,
	
	/**
 	* @private
	* @param {Object} event Объект события 
	* @description Метод получает объект события. Определяет есть ли у модуля обработчик данного события, если да объект события предаётся на обработчик события 
	* @description Если обработчик генерирует событие оно помещается в очередь событий:	stackEvents.pushEvent(newEvent)
 	*/   
	ListenToTheEvent : function(event){

		var eventType = event.eventType;
        var module =  event.moduleName;
        var viewElement = event.viewElement;


		console.log(event.moduleName +'  '+  event.eventType ) ;



		if(pageModules.modules[module] && pageModules.modules[module].events.userEventsTable[viewElement][eventType]){

           var eventModule =  pageModules.modules[module].events.userEventsTable[viewElement][eventType];

           var newEvent = pageModules.modules[module].events[eventModule].functionToEvent(forkEvent(event));

			if(newEvent){			// нужны ли автозапуски если есть генерация событий ?
				stackEvents.pushEvent(newEvent);
			}
		}
	}


};


	
	/** Назначить слушатели событий */
	if(document.attachEvent){

            document.attachEvent('onmousedown', getEvents);
            document.attachEvent('onmouseup', getEvents);
            document.attachEvent('onmousemove', getEvents);

            document.getElementById('scrollpage').attachEvent("onDOMMouseScroll",getEvents,false);    //?
            document.getElementById('scrollpage').attachEvent("onmousewheel",getEvents,false);

    }
	else{


        if('ontouchstart' in document){

            document.addEventListener('touchstart', getEvents ,false);
            document.addEventListener('touchmove', getEvents ,false);
            document.addEventListener('touchend', getEvents ,false);
        }
        else{

            document.addEventListener('mousedown', getEvents ,false);
            document.addEventListener('mouseup', getEvents ,false);
            document.addEventListener('mousemove', getEvents ,false);

            document.getElementById('scrollpage').addEventListener("DOMMouseScroll",getEvents ,false);
            document.getElementById('scrollpage').addEventListener("mousewheel",getEvents,false);
        }
	}

    window.onload = load;
	window.onbeforeunload = onbeforeunload;
	


var eventObj = {};  //TODO Получать размеры родителя в объект если это свап блок и т.д .// логику для скролов в модуль оболочку скрола , там же данные для работы логики как динамические так и статичные

function getEvents(event){

    var button=false;
    event = event || window.event;

    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }

    if (event.stopPropagation){
        event.stopPropagation();
    }
    else {
        event.cancelBubble=true;
    }

    if (event.which == null){

        button= (event.button < 2);
    }
    else{
        button= (event.which < 2);
    }

    if(event.type=='DOMMouseScroll' || event.type=='mousewheel' ){      // колесо мыши

        var delta;
        if (event.wheelDelta){// Opera и IE работают со свойством wheelDelta
            delta =-event.wheelDelta / 120;
        }
        else{
            if (event.detail){// В реализации Gecko получим свойство detail
                delta =event.detail / 3;
            }
        }


    }

    if ((event.type == 'mousedown' && button) || event.type == 'touchstart' ){                                   // количество пальцев учитывать чтоб определять зум ротейт  . зум и ротейт на ближайшем помеченном

        // флаг для либо клик на элементе , либо на контейнер прорвалось. без него пишей не должно быть ни при муве ни при отпускании

        var target=event.target || event.srcElement;

        eventObj.realEvent = event;
        eventObj.moduleName = target.getAttribute('data-moduleName');
        //alert(target.getAttribute('data-modulename'))


        eventObj.viewElement = target.getAttribute('data-actionElem');      // может не быть их -вверх по предкам пока не обнаружатся

        var container  = target;

        while (container.hasAttribute && !container.hasAttribute('data-Container')  ){
            container = container.parentNode;
        }

        eventObj.height = container.offsetHeight;
        eventObj.width = container.offsetWidth;


        eventObj.offsetY = container.offsetHeight*0.34;
        eventObj.offsetX = container.offsetWidth*0.34;

        if(container.getAttribute){

            eventObj.typeContainer = container.getAttribute('data-Container');               // както должно учитыватся при действиях мова толи это слайд толи скрол или элемент будет сам поднимать зная свои настройки?
            eventObj.moduleContainer = container.getAttribute('data-moduleName');
            eventObj.moduleContainerViewElement = container.getAttribute('data-actionElem');

        }

        eventObj.startX = event.clientX || event.targetTouches[0].pageX;
        eventObj.startY = event.clientY || event.targetTouches[0].pageY;



        eventObj.oldMove = new Date();

        eventObj.canClick = true;

    }


    if (event.type == 'mousemove' || event.type == 'touchmove'  ){

        eventObj.clientX = event.clientX || event.targetTouches[0].pageX;
        eventObj.clientY = event.clientY || event.targetTouches[0].pageY;
        eventObj.eventType = 'move';

        if((Math.abs(eventObj.startX -eventObj.clientX) >= eventObj.offsetX ||  Math.abs(eventObj.startY - eventObj.clientY) >= eventObj.offsetY) && (eventObj.moduleName || eventObj.moduleContainer)) {

            if(eventObj.timer){

                clearTimeout(eventObj.timer);
                eventObj.timer = false;
            }

            eventObj.canClick = false;

            if(Math.abs(eventObj.startX - eventObj.clientX) >= eventObj.offsetX){

                eventObj.eventType = 'scrollX';
            }
            if(Math.abs(eventObj.startY - eventObj.clientY) >= eventObj.offsetY){

                eventObj.eventType = 'scrollY';
            }
            //TODO в зависимости от типа скрол слайд

            //TODO в менять модуль в событии сейчас при скроле передаётся тотже -хотя можно скрол не усколлеров по умолчанию сделать предать в родителя пока не дойдёт до того какому предназначен
                //TODO -события по умолчанию с поведением кроме спец модулей
                //TODO -тогда можно и контейнер не определят

            //TODO  элемент можно закрыть и открыть с указанным эффектом  -функции для этого
            eventObj.moduleName = eventObj.moduleContainer;
            eventObj.viewElement =  eventObj.moduleContainerViewElement;

            pageModules.ListenToTheEvent(eventObj);      // форк сдеклать      // определять какой скрол (верт/гор) его направление

            eventObj.startX = eventObj.clientX;
            eventObj.startY = eventObj.clientY;
        }
        else{

            var time = Math.abs(30-(new Date() - eventObj.oldMove));

            if(!eventObj.timer){

                eventObj.timer = setTimeout( function(){
                    eventObj.timer = false;
                    eventObj.oldMove = new Date();
                    pageModules.ListenToTheEvent(eventObj);
                }, time);
            }
        }
    }

    //alert(eventObj.moduleName)
    if(((event.type == 'mouseup' && button)|| event.type == 'touchend') && (eventObj.moduleName || eventObj.moduleContainer)){

        eventObj.clientX = eventObj.clientX || eventObj.startX;
        eventObj.clientY = eventObj.clientY || eventObj.startY;


        if((Math.abs(eventObj.startX - eventObj.clientX) <= 10 || Math.abs(eventObj.startY - eventObj.clientY) <= 10) && eventObj.canClick ) {

            if(eventObj.timer){
                clearTimeout(eventObj.timer);
                eventObj.timer = false;
            }

            eventObj.eventType = 'click';
            eventObj.target = target;

            pageModules.ListenToTheEvent(eventObj);
        }

        eventObj = {};
    }
}

//})();

