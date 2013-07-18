Modules.mod =   Modules.createNewModule();
Modules.mod.addModulesToAudition( Modules.mod);
Modules.mod.addViewEventListener('testElem', 'click', 'clickElement');
Modules.mod.addEventListener('clickElement', function(){alert('click')}, ['afterClick']);
Modules.mod.setTemplateUrl('./Modules/mod/index.html', './Modules/mod/style.css');
Modules.mod.set({dataOne: [{a:10},{a:20}]});
Modules.mod.set({dataTwo: 'start'});
Modules.mod.setContainer('kontainer');

Modules.mod.setRenderAttribute('thisRendering');

Modules.mod.setAsParentFor(Modules.mod1);

Modules.mod.render();