//**    работа с атрибутами модели  (модуля)

Module.prototype.set = function(data){

    var moduleEvents = this.events;

    var parentEvents = this._familyTree.parent && this._familyTree.parent.events;

    this._attributes.changed = {};
    this._attributes.changed.that = this;

    var isChange = false;
    var brothers;
    var moduleAttributes =  this._attributes;

    parentEvents && parentEvents.beforeChange && parentEvents.beforeChange();

    parentEvents &&parentEvents.beforeChildChange && parentEvents.beforeChildChange();

    moduleEvents &&moduleEvents.beforeChange && moduleEvents.beforeChange();


   brothers = this.getAllBrotherlyModules();

    for(var lengthBrothers = brothers.length; lengthBrothers-- ;){

        brothers[lengthBrothers].events && brothers[lengthBrothers].events.afterChangeBrotherly && brothers[lengthBrothers].events.afterChangeBrotherly();
    }

    var att;

    for( var name in data){

        if(data.hasOwnProperty(name)){

            att =  data[name];

            if(moduleAttributes[name] != att){

                moduleAttributes.changed[name] = att;
                moduleAttributes.old[name] = att;
                isChange = true;
            }

            moduleAttributes[name] = att;
        }
    }

    if(isChange){

        parentEvents && parentEvents.afterChange && parentEvents.afterChange();

        parentEvents &&parentEvents.afterChildChange && parentEvents.afterChildChange();

        moduleEvents &&moduleEvents.afterChange && moduleEvents.afterChange();


        brothers = this.getAllBrotherlyModules();

        for(lengthBrothers = brothers.length; lengthBrothers-- ;){

            brothers[lengthBrothers].events && brothers[lengthBrothers].events.afterChangeBrotherly && brothers[lengthBrothers].events.afterChangeBrotherly();
        }

    }

};// вызывает событие модуль изменился

Module.prototype.has = function(name){

     return !!this._attributes[name];
};

Module.prototype.get = function(data){

    data = data || this._attributes;

    var returnObj = {};

    var att;
    var moduleAttributes =  this._attributes;

    for( var name in data){

        if(att != this && moduleAttributes.hasOwnProperty(name)) {

            att = moduleAttributes[name];

            returnObj[name] = att;
        }
    }

    return returnObj;
};

Module.prototype.getChanged = function(){

    var data = this._attributes.changed;
    var returnObj = {};
    var att;

    for( var name in data){

        att = data[name];

        if(att != this && data.hasOwnProperty(name)) {

            returnObj[name] = att;
        }
    }

    return returnObj;
};



Module.prototype.isChanged = function(){

    var data = this._attributes.changed;

    for( var name in data){

        if(data[name]!= this && data.hasOwnProperty(name)) {

            return true;
        }
    }

    return false;
};

Module.prototype.getOldData = function(){

    var data = this._attributes.old;
    var returnObj = {};
    var att;

    for( var name in data){

        att = data[name];

        if(att != this && data.hasOwnProperty(name)) {

            returnObj[name] = att;
        }
    }

    return returnObj;

};