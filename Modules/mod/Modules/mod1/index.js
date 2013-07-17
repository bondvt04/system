Modules.mod1 =  Modules.createNewModule();
Modules.mod1.addModulesToAudition( Modules.mod1);
Modules.mod1.addViewEventListener('testElem', 'click', 'clickElement');
Modules.mod1.addEventListener('clickElement', function(){alert('clickChild')}, ['afterClick']);
Modules.mod1.setTemplateUrl('./Modules/mod/Modules/mod1/index.html');
Modules.mod1.set({dataOne: [{a:30},{a:40}]});
Modules.mod1.set({dataTwo: 'startChild'});

