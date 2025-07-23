foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'ChatMenu',
  extends: 'foam.core.menu.Menu',

  documentation: 'Psedo-menu to display all chats',

  implements: [ 'foam.mlang.Expressions' ],

  requires: [
    'com.foamdev.chat.Chat',
    'foam.dao.AdapterDAO',
    'foam.core.menu.Menu',
    'foam.core.menu.ViewMenu',
  ],

  imports: [ 'chatDAO' ],

  properties: [
    {
      name: 'children_',
      factory: function() {
        return this.AdapterDAO.create({
          delegate: this.chatDAO,
          to: this.Chat,
          of: this.Menu,
          adaptFromDelegate: (x, chat) => (this.Menu.create({
            id:     this.id + '/' + chat.id,
            label:  chat.name,
            parent: this.id,
            handler: this.ViewMenu.create({
              view: {
                class: 'com.foamdev.chat.ChatView',
                data: chat
              }
            })
          }))
        }).orderBy(this.Menu.LABEL);
      }
    },
    {
      name: 'children',
      // Use getter instead of factory to have higher precedence
      // than than 'children' factory from relationship
      getter: function() { return this.children_; }
    }
  ]
});
