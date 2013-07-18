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



    moduleEvents &&moduleEvents.beforeChange && moduleEvents.beforeChange();


   brothers = this.getAllBrotherlyModules();

   if( brothers){
        for(var lengthBrothers = brothers.length; lengthBrothers-- ;){

            brothers[lengthBrothers].events && brothers[lengthBrothers].events.afterChangeBrotherly && brothers[lengthBrothers].events.afterChangeBrotherly();
        }
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

       parentEvents &&parentEvents.afterChildChange && parentEvents.afterChildChange();

       moduleEvents &&moduleEvents.afterChange && moduleEvents.afterChange();


       brothers = this.getAllBrotherlyModules();

       if(brothers){

           for(lengthBrothers = brothers.length; lengthBrothers-- ;){

               brothers[lengthBrothers].events && brothers[lengthBrothers].events.afterChangeBrotherly && brothers[lengthBrothers].events.afterChangeBrotherly();
           }
       }

   }

   return this;

};// вызывает событие модуль изменился

Module.prototype.has = function(name){

     return !!this._attributes[name];
};

Module.prototype.get = function(data){

    data = {data:true} || this._attributes;

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

Module.prototype.setWithValidate = function(data){

    if(this.validate(data) ){

        this.set(data);
    }

    return this;
 } ;

Module.prototype.setWithValidateAndSelective= function(data, selector){

    if(this.validate(data, selector) ){

        this.set(data);
    }
    return this;
} ;

Module.prototype.Validate = function(data, selectors){


    var events = this.events;
    events.beforeValidation && events.beforeValidation(data);



    var validateData = selectors  ? selectors : this._attributes;
    var validateFunctions = this._validatoinFunctions;
    var validationSuccess = true;

    for (var name in data){

        if(validateData[name] && validateFunctions[name]){

            events['beforeValidation_'+name] && events['beforeValidation_'+name]();

            if(validateFunctions[name](data[name])){

                events['SuссessValidation_'+name] && events['SuссessValidation_'+name]();

                events['afterValidation_'+name] && events['afterValidation_'+name]();
            }
            else{

                validationSuccess = false;
                events['ErrorValidation_'+name] && events['ErrorValidation_'+name]();
            }

        }
    }

    if(validationSuccess) {

        events.SuссessValidation && events.SuссessValidation();
    }
    else{

        events.ErrorValidation && events.ErrorValidation();
    }

    events.afterValidation && events.afterValidation(data);


   return  validationSuccess;

};


Module.prototype.addValidateFunction = function(name, functionToValidate){

    this._validatoinFunctions[name] = functionToValidate;

    return this;
};

Module.prototype.removeValidateFunction = function(name){

    delete this._validatoinFunctions[name];

    return this;
};
