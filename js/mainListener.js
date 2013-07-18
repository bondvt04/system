/**
 * @function
 * @description Функция модуль
 */

//(function (){

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

			var newEvent = pageModules.modules[module].events[eventModule].functionToEvent(event);


			if(newEvent){			// нужны ли автозапуски если есть генерация событий ?
				stackEvents.pushEvent(newEvent);
			}
		}
	}		
};
	
	/** Назначить слушатели событий */
	if(document.attachEvent){
		document.attachEvent('onclick', getEvents);
        //document.attachEvent('onload', getEvents ,false);
        //document.attachEvent('onunload', getEvents ,false);
	}
	else{
		document.addEventListener('mousedown', getEvents ,false);
        document.addEventListener('mouseup', getEvents ,false);
        document.addEventListener('mousemove', getEvents ,false);
        //document.addEventListener('load', getEvents ,false);
        //document.addEventListener('unload', getEvents ,false);
	}
	window.onload = function(){getEvents({type : 'load'})};
	window.onbeforeunload = function(){getEvents({type : 'beforeunload'})};
	
	/**
	* @ inner
	* @private 
 	* @event
 	* @param {Object} event Объект события 
	* @description Обрабатывает пользовательские события.
	* @description Если событие произошло на элементе помеченном как, элемент возбуждающий событие модуля,
	* @description в модуль предаётся событие 'generateEvent' и объект события
 	*/


    /*
	function getEvents(event){
		event = event || window.event;
		var target=event.target || event.srcElement;
		// Если элемент действия помечен как элемент модуля возбуждающий событие
		var moduleName;		
		if(target && target.getAttribute){				
			moduleName = target.getAttribute('data-moduleName');
		}
		else{
			moduleName = false;
		}
		if(moduleName){
			//Передать на генератор событий модуля событие: "генерация события"
			event.eventType = 'generateEvent';
			event.moduleName = moduleName;					
			//pageModules.ListenToTheEvent(event);

            stackEvents.pushEvent(event);
		}
		
        else {
			if(event.type == 'load' ){			
            	event.eventType = 'generateEvent';
            	event.moduleName = 'document';			
            	pageModules.ListenToTheEvent(event);
        	}
			if( event.type == 'beforeunload'){			
            	event.eventType = 'documentUnload';
            	event.moduleName = 'document';			
            	//pageModules.ListenToTheEvent(event);

                stackEvents.pushEvent(event);
        	}
		}
	}
		*/

var eventObj = {};  //TODO Получать размеры родителя в объект если это свап блок и т.д .// логику для скролов в модуль оболочку скрола , там же данные для работы логики как динамические так и статичные

function getEvents(event){

    var button=false;
    event = event || window.event;

    if (event.which == null){

        button= (event.button < 2);
    }
    else{
        button= (event.which < 2);
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


        if(container.getAttribute){
            eventObj.typeContainer = container.getAttribute('data-Container');               // както должно учитыватся при действиях мова толи это слайд толи скрол или элемент будет сам поднимать зная свои настройки?
            eventObj.moduleContainer = container.getAttribute('data-moduleName');
            eventObj.moduleContainerViewElement = container.getAttribute('data-actionElem');

        }
        eventObj.startX = event.clientX;
        eventObj.startY = event.clientY;

        eventObj.oldMove = new Date();

        eventObj.canClick = true;

    }


    if ((event.type == 'mousemove' || event.type == 'touchmove') && (eventObj.moduleName || eventObj.moduleContainer) ){

        eventObj.clientX = event.clientX;
        eventObj.clientY = event.clientY;
        eventObj.eventType = 'move';

        if((Math.abs(eventObj.startX - event.clientX)> 30 ||  Math.abs(eventObj.startY - event.clientY) >30)) {

            if(eventObj.timer){
                clearTimeout(eventObj.timer);
                eventObj.timer = false;
            }

            eventObj.canClick = false;

            eventObj.eventType = 'scroll';
            eventObj.moduleName = eventObj.moduleContainer;
            eventObj.viewElement =  eventObj.moduleContainerViewElement;

            pageModules.ListenToTheEvent(eventObj);      // форк сдеклать      // определять какой скрол (верт/гор) его направление

            eventObj.startX = event.clientX;
            eventObj.startY = event.clientY;
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



        if((Math.abs(eventObj.startX - event.clientX) < 7 || Math.abs(eventObj.startY - event.clientY) < 7) && eventObj.canClick ) {

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

