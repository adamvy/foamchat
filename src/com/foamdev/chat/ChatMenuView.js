foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'ChatMenuView',
  extends: 'foam.u2.View',
  mixins: ['foam.u2.memento.Memorable'],
  requires: [
    'foam.comics.v2.DAOControllerConfig',
    'com.foamdev.chat.ChatView'
  ],
  imports: [
    'chatDAO'
  ],
  properties: [
    {
      class: 'String',
      name: 'key',
      memorable: true,
      shortName: 'route',
      documentation: 'Chat to open',
    },
    'data',
    'error',
  ],
  methods: [
    function render() {
      var self = this;
      var dao = this.chatDAO;
      this.add(function(data, error, key) {
        if ( key !== "" && (! data || !foam.util.equals(data.id, key) ) && ! error) {
          dao.find(key).then(function(obj) {
            if ( obj ) self.data = obj;
            else self.error = 'Not found.';
          }, function(e) {
            self.error = e.message ? e.message : '' + e;
          });
          this.add('Loading...');
        } else if ( ! data && !! self.error) {
          this.add(self.error);
        } else if ( ! data ) {
          var config = self.DAOControllerConfig.create({ daoKey: "chatDAO" });
          this.tag(config.browseController, { config, data: dao });
        } else {
          this.tag(self.ChatView, { data });
        }
      });
    }
  ]
});
