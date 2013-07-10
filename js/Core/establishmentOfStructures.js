
/*
Добавить в существующий  массив/ элемент       -потомки    +
Добавить существующий в элемент    +


получить ветку потомков        +
получить всех потомков         +
получить предка               +

Показать прямых потомков     +
Показать прямого предка       +

показать всех потомков на любом уровне   +
Показать всех предков                   +

Удалить из него элемент   удалить потомка  массив /элемент   +
Удалить его из элемента   из предка удалить                  +
Удалить всех потомков                                        +


Является ли прямым потомком элемент       +
Является ли прямым потомком элемента      +

Является ли прямым предком элемент      +      пользовать функцуии описанные выше выше в этих
Является ли прямым предком элемента      +

 Является ли потомком элемент         +
 Является ли  потомком элемента        +

 Является ли  предком элемент           +
 Является ли  предком элемента         +

 Является ли модуль братским           +

 пометить как страницу    снять с потомков если есть   +
 снять отметку                                         +

 является ли страницей                                 +

      Элемент получает потомка(у потомков он помечается как родитель)



        _familyTree {
                parent -ссылка на модуль родитель
                children [] ссылки на потомков имена чтоб не плодить ссылки
        }
 */

Module.prototype.setAsParentFor = function (modules){     // назначить родителем для      -ставить имена если нет

    addName(this);
    var arrayModules;

    if(Object.prototype.toString.call(modules) != "[object Array]"){

        arrayModules = [];
        arrayModules.push(modules);
    }
    else{

        arrayModules = modules;
    }

    var parentEvents = this.events;
    var parentModuleName = this._moduleName;
    var children =  this._familyTree.children;
    var chaildModuleName;
    var chaildModuleEvents;

    for (var lengthArrayModules = arrayModules.length; lengthArrayModules--;){

        addName(arrayModules[lengthArrayModules]);

        chaildModuleName = arrayModules[lengthArrayModules]._moduleName;

        if(children.indexOf(chaildModuleName) == -1 ){

            chaildModuleEvents=  arrayModules[lengthArrayModules].events;

            if(parentEvents.beforeSetAsParent){
                parentEvents.beforeSetAsParent();
            }

            if(parentEvents.beforeSetСhild){
                parentEvents.beforeSetСhild();
            }
            if(chaildModuleEvents.beforeSetParent){
                chaildModuleEvents.beforeSetParent();
            }

            children.push(chaildModuleName);
            arrayModules[lengthArrayModules]._familyTree.parent = parentModuleName;

            if(parentEvents.afterSetСhild){
                parentEvents.afterSetСhild();
            }
            if(chaildModuleEvents.afterSetParent){
                chaildModuleEvents.afterSetParent();
            }
            if(parentEvents.afterSetAsParent){
                parentEvents.afterSetAsParent();
            }
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

        if(parentModuleEvents.beforeSetAsParent){
            parentModuleEvents.beforeSetAsParent();
        }

        if(parentModuleEvents.beforeSetСhild){
            parentModuleEvents.beforeSetСhild();
        }
        if(chaildEvents.beforeSetParent){
            chaildEvents.beforeSetParent();
        }

        this._familyTree.parent = chaildModuleName;
        children.push(chaildModuleName);

        if(parentModuleEvents.afterSetСhild){
            parentModuleEvents.afterSetСhild();
        }
        if(chaildEvents.afterSetParent){
            chaildEvents.afterSetParent();
        }
        if(parentModuleEvents.afterSetAsParent){
            parentModuleEvents.afterSetAsParent();
        }
    }

    return this;

};

Module.prototype.getTreeСhildrenNames = function (){};     // получить дерево имён потомков
Module.prototype.getBranchСhildrenNames = function (){};   // получить ветку имён потомков

Module.prototype.getСhildrenNames = function (){};    // получить имена прямых потомков
Module.prototype.getParentName = function (){};   // получить имя предка

Module.prototype.getTreeСhildren = function (){};        // получить всех потомков
Module.prototype.getBranchСhildren = function (){};      // получить ветку потомков

Module.prototype.getParentName = function (){};       // получить предка
Module.prototype.getСhildren = function (){};           // получить потомков

Module.prototype.changeСhildren = function (){};         // заменить потомков на потомков
Module.prototype.getAllParentsName = function (){};       // получить имена всех предков
Module.prototype.getAllParents = function (){};       // получить  всех предков

Module.prototype.getAllBrotherlyModules = function (){};       // получить  братские модули
Module.prototype.getAllBrotherlyModulesName = function (){};       // получить  имена всех братских модулей

Module.prototype.removeParent = function (){};
Module.prototype.removeСhild = function (){};
Module.prototype.removeAllСhildren = function (){};

Module.prototype.isChild = function (){};    // является ли потомком элемента
Module.prototype.isChildOf = function (){};  // является ли элемент потомком

Module.prototype.isDirectChild = function (){};       // является ли прямым потомком элемента
Module.prototype.isDirectChildOf = function (){};     // является ли элемент прямым потомком

Module.prototype.isParent = function (){};    // является ли предком элемента
Module.prototype.isParentOf = function (){};  // является ли элемент предком

Module.prototype.isDirectParent = function (){};       // является ли прямым предком элемента
Module.prototype.isDirectParentOf = function (){};     // является ли элемент прямым предком

Module.prototype.isBrotherlyModule = function (){};       // является ли братским модулем элемента

Module.prototype.setAsPage = function (){};       // пометить как страницу
Module.prototype.unsetAsPage = function (){};       // снять отметку страницы

Module.prototype.isPage = function (){};       // является ли страницей