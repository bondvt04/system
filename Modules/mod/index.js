Modules.mod =   Modules.createNewModule();
Modules.mod.addModulesToAudition( Modules.mod);
Modules.mod.addViewEventListener('testElem', 'click', 'clickElement');
Modules.mod.addEventListener('clickElement', function(){alert(1)}, ['afterClick']);
