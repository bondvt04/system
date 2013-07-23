


Module.prototype.setAsParentFor = function (){     // назначить родителем для      -ставить имена если нет

    addName(this);
    var arrayModules = arguments;

    var parentEvents = this.events;
    var parentModuleName = this._moduleName;
    var children =  this._familyTree.children;
    var chaildModuleName;
    var chaildModule;

    for (var lengthArrayModules = arrayModules.length; lengthArrayModules--;){

        addName(arrayModules[lengthArrayModules]);

        chaildModuleName = arrayModules[lengthArrayModules]._moduleName;

        if(children.indexOf(chaildModuleName) == -1 ){

            chaildModule=  arrayModules[lengthArrayModules];


            this.doEvent('beforeSetAsParent');
            this.doEventAfterStandartEvent('beforeSetAsParent');

            this.doEvent('beforeSetСhild');
            this.doEventAfterStandartEvent('beforeSetСhild');

            chaildModule.doEvent('beforeSetParent');
            chaildModule.doEventAfterStandartEvent('beforeSetParent');

            children.push(chaildModuleName);


            arrayModules[lengthArrayModules]._familyTree.parent = parentModuleName;

            this.doEvent('afterSetСhild');
            this.doEventAfterStandartEvent('afterSetСhild');

            chaildModule.doEvent('afterSetParent');
            chaildModule.doEventAfterStandartEvent('afterSetParent');

            this.doEvent('afterSetAsParent');
            this.doEventAfterStandartEvent('afterSetAsParent');

        }
    }
    return this;
};


Module.prototype.setAsСhildFor = function (module){   // назначить потомком для        -ставить имена если нет

    addName(this);
    addName(module);

    var chaildEvents = this.events;
    var chaildModuleName = this._moduleName;
    var children =  module._familyTree.children;
    var parentModuleName = module._moduleName;
    var parentModuleEvents = module.events;

    if(children.indexOf(chaildModuleName) == -1 ){

        module.doEvent('beforeSetAsParent');
        module.doEventAfterStandartEvent('beforeSetAsParent');

        module.doEvent('beforeSetСhild');
        module.doEventAfterStandartEvent('beforeSetСhild');

        this.doEvent('beforeSetParent');
        this.doEventAfterStandartEvent('beforeSetParent');

        this._familyTree.parent = chaildModuleName;
        children.push(chaildModuleName);

        this.doEvent('afterSetСhild');
        this.doEventAfterStandartEvent('afterSetСhild');

        this.doEvent('afterSetParent');
        this.doEventAfterStandartEvent('afterSetParent');

        module.doEvent('afterSetAsParent');
        module.doEventAfterStandartEvent('afterSetAsParent');
    }

    return this;

};

//__________________________________________________________________________________________________________________

function getChildren(child){

    var children = child._familyTree.children;
    var returnObj = {};
    var childName;

    for (var lengthChildren = children.length; lengthChildren--;) {

        childName = children[lengthChildren];
        returnObj[childName] = getChildren(Modules[childName]);
    }

    return returnObj;
}

Module.prototype.getTreeСhildrenNames = function (){ // получить дерево имён потомков

    var children = this._familyTree.children;
    var returnObj = {};
    var childName;

    for (var lengthChildren = children.length; lengthChildren--;) {

        childName = children[lengthChildren];
        returnObj[childName] = getChildren(Modules[childName]);
    }

    return returnObj;

    /*
         {
            имя 1 {
                    имя 1{
                    },

                    имя 2 {
                    },
                }
            }
         }

     */
};

Module.prototype.getBranchСhildrenNames = function (moduleName){  // получить ветку имён потомков

    var children = this._familyTree.children;

    if(children.indexOf(moduleName)){

        return  getChildren(Modules[moduleName]);
    }

    return null;
};

Module.prototype.getСhildrenNames = function (){    // получить имена прямых потомков

    var children = this._familyTree.children;
    var returnObj = {};
    var childName;

    for (var lengthChildren = children.length; lengthChildren--;) {

        childName = children[lengthChildren];
        returnObj[childName] = childName;
    }

    return returnObj;
};

Module.prototype.getParentName = function (){   // получить имя предка

    return this._familyTree.parent ?  this._familyTree.parent : null;

};


Module.prototype.getParent = function (){   // получить предка

    return this._familyTree.parent ?  Modules[this._familyTree.parent] : null;
};

Module.prototype.getСhildren = function (){

    var children = this._familyTree.children;
    var returnObj = {};
    var childName;

    for (var lengthChildren = children.length; lengthChildren--;) {

        childName = children[lengthChildren];
        returnObj[childName] = Modules[childName];
    }

    return returnObj;
};

//TODO  доработать -удалять у них родителя и у этого генерить добавление потомка
Module.prototype.changeСhildren = function (newChildren){    // заменить потомков на потомков

    this._familyTree.children = newChildren;

    return this;
};

Module.prototype.getAllParentsName = function (){  // получить имена всех предков

    var parent = this._familyTree.parent;
    var returnArray = [];

    while (parent){

        returnArray.push(parent);
        parent = Modules[parent]._familyTree.parent;
    }

    return returnArray;
};

Module.prototype.getAllParents = function (){  // получить  всех предков

    var parent = this._familyTree.parent;
    var returnArray = [];
    var module;

    while (parent){

        module = Modules[parent];
        returnArray.push( module);
        parent = module._familyTree.parent;
    }

    return returnArray;
};


Module.prototype.getAllBrotherlyModules = function (){   // получить  братские модули

    var moduleName = this._moduleName;
    var parent = Modules[this._familyTree.parent];

    if(parent){

        var children =  this._familyTree.children;
        var returnArray = [];

        var childName;

        for (var lengthChildren = children.length; lengthChildren--;) {

            childName = children[lengthChildren];

            if( moduleName!= childName){

                returnArray.push(Modules[childName]);
            }
        }
    }

    return returnArray;
};

Module.prototype.getAllBrotherlyModulesNames = function (){ // получить  имена всех братских модулей

    var moduleName = this._moduleName;
    var parent = Modules[this._familyTree.parent];

    if(parent){

        var children =  this._familyTree.children;
        var returnArray = [];

        var childName;

        for (var lengthChildren = children.length; lengthChildren--;) {

            childName = children[lengthChildren];

            if( moduleName!= childName){

                returnArray.push(childName);
            }
        }
    }

    return returnArray;
};


Module.prototype.removeParent = function (){

    var parent =  this._familyTree.parent;
    this._familyTree.parent = null;

    if (parent){

        var parentModule = Modules[parent];
        var chailds = parentModule._familyTree.children;
        var moduleName = this._moduleName;
        var parentEvents = parentModule.events;
        var thisEvents = this.events;


        for (var lengthChailds = chailds.length; lengthChailds --;) {

            if(moduleName == chailds[lengthChailds]){

                parentModule.doEvent('beforeRemoveСhild');
                parentModule.doEventAfterStandartEvent('beforeRemoveСhild');

                this.doEvent('beforeRemoveParent');
                this.doEventAfterStandartEvent('beforeRemoveParent');

                chailds.splice(lengthChailds, 1);

                this.doEvent('afterRemoveParent');
                this.doEventAfterStandartEvent('afterRemoveParent');

                parentModule.doEvent('afterRemoveСhild');
                parentModule.doEventAfterStandartEvent('afterRemoveСhild');

                break;
            }
        }
    }

    return this;
};


Module.prototype.removeСhild = function (modules){

    var removeModuleName = modules._moduleName;
    var chailds = this._familyTree.children;
    var parentEvents = this.events;
    var child;
    var arrayModules = arguments;

    for (var lengthArrayModules = arrayModules.length; lengthArrayModules--;){

        child = arrayModules[lengthArrayModules];
        for (var lengthChailds = chailds.length; lengthChailds --;) {

            if(chailds[lengthChailds] == removeModuleName){

                this.doEvent('beforeRemoveСhild');
                this.doEventAfterStandartEvent('beforeRemoveСhild');

                child.doEvent('beforeRemoveParent');
                child.doEventAfterStandartEvent('beforeRemoveParent');

                chailds.splice(lengthChailds, 1);

                Modules[arrayModules[lengthArrayModules]]._familyTree.parent = null;

                child.doEvent('afterRemoveParent');
                child.doEventAfterStandartEvent('afterRemoveParent');

                this.doEvent('afterRemoveСhild');
                this.doEventAfterStandartEvent('afterRemoveСhild');

                break;
            }
        }
    }

    return this;

};
Module.prototype.removeAllСhildren = function (){

    var children = this._familyTree.children;
    var parentEvents = this.events;
    var child;
    var childModule;

    for(var lengthChailds = children.length; lengthChailds --;){

        childModule = Modules[arrayModules[lengthArrayModules]];
        child = childModule;

        this.doEvent('beforeRemoveСhild');
        this.doEventAfterStandartEvent('beforeRemoveСhild');

        child.doEvent('beforeRemoveParent');
        child.doEventAfterStandartEvent('beforeRemoveParent');

        children.splice(lengthChailds, 1);
        childModule._familyTree.parent = null;

        child.doEvent('afterRemoveParent');
        child.doEventAfterStandartEvent('afterRemoveParent');

        this.doEvent('afterRemoveСhild');
        this.doEventAfterStandartEvent('afterRemoveСhild');
    }

    return this;
};



Module.prototype.isChild = function (module){    // является ли потомком элемента

    var parent = this._familyTree.parent;
    var nameModule = module._moduleName;

    while(Modules[parent]){

        if(nameModule == parent){

            return true;
        }

        parent = Modules[parent]._familyTree.parent;
    }

    return false;
};
Module.prototype.isChildOf = function (module){   // является ли элемент потомком модуля

    var parent = module._familyTree.parent;
    var nameModule = this._moduleName;

    while(Modules[parent]){

        if(nameModule == parent){

            return true;
        }

        parent = Modules[parent]._familyTree.parent;
    }

    return false;

};

Module.prototype.isDirectChild = function (module){ // является ли прямым потомком элемента

    return this._familyTree.parent == module._moduleName;
};
Module.prototype.isDirectChildOf = function (module){  // является ли элемент прямым потомком  этого модуля

    return module._familyTree.parent == this._moduleName;
};

Module.prototype.isParent = function (module){   // является ли предком элемента

    return this.isChildOf(module);
};

Module.prototype.isParentOf = function (module){    // является ли элемент предком

    return this.isChild(module);
};

Module.prototype.isDirectParent = function (module){    // является ли модуль прямым предком данного

    return this._familyTree.parent == module._moduleName;
};
Module.prototype.isDirectParentOf = function (module){   // является ли элемент прямым предком

    return module._familyTree.parent == this._moduleName;
};

Module.prototype.isBrotherlyModule = function (module){   // является ли братским модулем элемента

    return this._familyTree.parent == module._familyTree.parent;
};

Module.prototype.setAsPage = function (){   // пометить как страницу

    this._settings.isPage = true;
    Modules.Pages[this._moduleName] = true;

   return this;

};
Module.prototype.unsetAsPage = function (){   // снять отметку страницы

    delete this._settings.isPage;
    delete Modules.Pages[this._moduleName];

    return this;
};

Module.prototype.isPage = function (){   // является ли страницей

    return !!this._settings.isPage
};