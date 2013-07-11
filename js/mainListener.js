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
	modulesInAnyEvents : _modulesInAnyEvents, 
	
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
	modules : _modules,
	
	/**
 	* @private
	* @param {Object} event Объект события 
	* @description Метод получает объект события. Определяет есть ли у модуля обработчик данного события, если да объект события предаётся на обработчик события 
	* @description Если обработчик генерирует событие оно помещается в очередь событий:	stackEvents.pushEvent(newEvent)
 	*/   
	ListenToTheEvent : function(event){
		var eventType = event.eventType;

		console.log(event.moduleName +'  '+  event.eventType )

		if(pageModules.modules[event.moduleName] && pageModules.modules[event.moduleName].listeners[eventType]){
			var newEvent = pageModules.modules[event.moduleName].listeners[eventType](event);
			if(newEvent){				
				stackEvents.pushEvent(newEvent);
			}
		}
	}		
};
	
	/** Назначить слушатели событий */
	if(document.attachEvent){
		document.attachEvent('onclick', getEvents, false);
        //document.attachEvent('onload', getEvents ,false);
        //document.attachEvent('onunload', getEvents ,false);
	}
	else{
		document.addEventListener('click', getEvents ,false);
        //document.addEventListener('load', getEvents ,false);
        //document.addEventListener('unload', getEvents ,false);
	}
	window.onload = function(){getEvents({type : 'load'})};
	window.onbeforeunload = function(){getEvents({type : 'beforeunload'})};;
	
	/**
	* @ inner
	* @private 
 	* @event
 	* @param {Object} event Объект события 
	* @description Обрабатывает пользовательские события.
	* @description Если событие произошло на элементе помеченном как, элемент возбуждающий событие модуля,
	* @description в модуль предаётся событие 'generateEvent' и объект события
 	*/
	function getEvents(event){
		event = event || window.event;
		var target=event.target || event.srcElement;
		/** Если элемент действия помечен как элемент модуля возбуждающий событие */
		var moduleName;		
		if(target && target.getAttribute){				
			moduleName = target.getAttribute('data-moduleName');
		}
		else{
			moduleName = false;
		}
		if(moduleName){
			/** Передать на генератор событий модуля событие: "генерация события" */
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
//})();

