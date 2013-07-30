

Modules.clone_list = Modules.list.createCloneModule ();  // наследник рендерится будет
Modules.clone_list.addModulesToAudition( Modules.clone_list);  // прослушивать свои события, если он будет слушать события других добавить их на прослушивание добавить их расширив клон


Modules.clone_list.setSettings({     // наследник получит

    verticalScroll : 'resizeable',  // none | nonResizeble
    windowWidth : '200px',
    windowHeight : '200px',
    templateHTML : 'url',
    templateCSS : 'url'

});
Modules.clone_list.setContainer('kontainer');

Modules.clone_list.render();  // наследник рендерится будет




