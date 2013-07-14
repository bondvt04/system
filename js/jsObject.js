var eventObj = {};


function workWithEvent(event){

	var button=false;
	event = event || window.event;
		
	if (event.which == null){
	
		button= (event.button < 2);
	}
    else{
		button= (event.which < 2);
	}
    

    if ((event.type == 'mousedown' && button) || event.type == 'touchstart' ){                                   // количество пальцев учитывать чтоб определять зум ротейт  . зум и ротейт на ближайшем помеченном

        var target=event.target || event.srcElement;

        eventObj.realEvent = event;
        eventObj.moduleName = target.getAttribute('data-moduleName');

        var container  = target;

        while (!container.hasAttribute('data-Container')){
            container = container.parentNode;
        }

        eventObj.typeContainer = container.getAttribute('data-Container');               // както должно учитыватся при действиях мова толи это слайд толи скрол или элемент будет сам поднимать зная свои настройки?
        eventObj.moduleContainer = typeContainer.getAttribute('data-moduleName');

        eventObj.startX = event.clientX;
        eventObj.startY = event.clientY;

        eventObj.oldMove = new Date();

        eventObj.canClick = true;

    }


    if (event.type == 'mousemove' || event.type == 'touchmove' ){

        eventObj.clientX = event.clientX;
        eventObj.clientY = event.clientY;
        eventObj.typeEvent = 'move';

        if((Math.abs(eventObj.startX - event.clientX)> 30 ||  Math.abs(eventObj.startY - event.clientY) >30)) {
			
			if(eventObj.timer){
				clearTiomeout(eventObj.timer);
				eventObj.timer = false;
			}
			
            eventObj.canClick = false;
            eventObj.target = eventObj.moduleContainer;
            eventObj.typeEvent = 'scroll';

            stackEvents.pushEvent(eventObj);      // форк сдеклать      // определять какой скрол (верт/гор) его направление

            eventObj.startX = event.clientX;
            eventObj.startY = event.clientY;
        }
        else{

           var time = Math.abs(30-(new Date() - eventObj.oldMove));

           if(!eventObj.timer){

                eventObj.timer = setTimeout( function(){

                    eventObj.timer = false;
                    eventObj.oldMove = new Date();
                    stackEvents.pushEvent(eventObj);
                }, time);
           }
        }
    }

    if((event.type == 'mouseup' && button)|| event.type == 'touchend'){	

        if((Math.abs(eventObj.startX - event.clientX) < 7 || Math.abs(eventObj.startY - event.clientY) < 7) && eventObj.canClick ) {
		
			if(eventObj.timer){
				clearTiomeout(eventObj.timer);
				eventObj.timer = false;
			}

            eventObj.typeEvent = 'click';
            eventObj.target = target;
			
            stackEvents.pushEvent(eventObj);
        }
		
        eventObj = {};
    }
}
