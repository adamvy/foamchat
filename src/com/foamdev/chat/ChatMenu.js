foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'ChatMenu',
  extends: 'foam.core.menu.Menu',

  documentation: 'Psedo-menu to display all chats',

  implements: [ 'foam.mlang.Expressions' ],

  requires: [
    'foam.dao.ArrayDAO',
    'foam.dao.PromisedDAO',
    'foam.core.menu.Menu',
    'foam.core.menu.ViewMenu',
  ],

  imports: [ 'chatDAO' ],

  properties: [
    {
      name: 'children_',
      factory: function() {
        /* ignoreWarning */
        var aDAO = this.ArrayDAO.create();
        var pDAO = this.PromisedDAO.create();

        // TODO: Make this dynamic, not one-shot on first access
        this.chatDAO
          .select(chat => {
            var menu = this.Menu.create({
              id:     this.id + '/' + chat.id,
              label:  chat.name,
              parent: this.id,
              handler: this.ViewMenu.create({
                view: {
                  class: 'com.foamdev.chat.ChatView',
                  data: chat
                }
              })
            });
            aDAO.put(menu);
        }).then(() => pDAO.promise.resolve(aDAO));

        return pDAO.orderBy(this.Menu.LABEL);
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
