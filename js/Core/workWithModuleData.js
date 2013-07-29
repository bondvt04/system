//**    работа с атрибутами модели  (модуля)

Module.prototype.set = function(data){

    var moduleEvents = this.events;

    var parent = this._familyTree.parent;

    this._attributes.changed = {};
    this._attributes.changed.that = this;

    var isChange = false;
    var brothers;
    var moduleAttributes =  this._attributes;

    if(parent){
        parent.doEvent('beforeChildChange');
        parent.doEventAfterStandartEvent('beforeChildChange');
    }

    this.doEvent('beforeChange');
    this.doEventAfterStandartEvent('beforeChange');


   brothers = this.getAllBrotherlyModules();

   if( brothers){
        for(var lengthBrothers = brothers.length; lengthBrothers-- ;){

            brothers[lengthBrothers].doEvent('beforeChangeBrotherly');
            brothers[lengthBrothers].doEventAfterStandartEvent('beforeChangeBrotherly');
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

       if(parent){
           parent.doEvent('afterChildChange');
           parent.doEventAfterStandartEvent('afterChildChange');
       }

       this.doEvent('afterChange');
       this.doEventAfterStandartEvent('afterChange');

       brothers = this.getAllBrotherlyModules();

       if(brothers){

           for(lengthBrothers = brothers.length; lengthBrothers-- ;){

               brothers[lengthBrothers].doEvent('afterChangeBrotherly');
               brothers[lengthBrothers].doEventAfterStandartEvent('afterChangeBrotherly');
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

    this.doEvent('beforeValidation');
    this.doEventAfterStandartEvent('beforeValidation');


    var validateData = selectors  ? selectors : this._attributes;
    var validateFunctions = this._validatoinFunctions;
    var validationSuccess = true;

    for (var name in data){

        if(validateData[name] && validateFunctions[name]){

            this.doEvent('beforeValidation_'+name);
            this.doEventAfterStandartEvent('beforeValidation_'+name);

            if(validateFunctions[name](data[name])){

                this.doEvent('SuссessValidation_'+name);
                this.doEventAfterStandartEvent('SuссessValidation_'+name);

                this.doEvent('afterValidation_'+name);
                this.doEventAfterStandartEvent('afterValidation_'+name);
            }
            else{

                validationSuccess = false;

                this.doEvent('ErrorValidation_'+name);
                this.doEventAfterStandartEvent('ErrorValidation_'+name);
            }

        }
    }

    if(validationSuccess) {

        this.doEvent('SuсessValidation');
        this.doEventAfterStandartEvent('SuссessValidation');
    }
    else{

        this.doEvent('ErrorValidation');
        this.doEventAfterStandartEvent('ErrorValidation');
    }

    this.doEvent('afterValidation');
    this.doEventAfterStandartEvent('afterValidation');


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

Module.prototype.setSettings = function(settings){

    for (var name in settings){

        this._settings[name] = settings[name];
    }

    return this;
};

Module.prototype.getSettings = function(){

    return this._settings;
};

Module.prototype.removeSettings = function(settings){

    for (var name in settings){

        delete this._settings[name];
    }

    return this;
};