foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'SettingsView',
  // a foam view that reads the current subject and renders a daoupdatecontrolle rof them
  extends: 'foam.u2.View',
  requires: [
    'foam.comics.v3.DetailView',
    'foam.comics.v2.DAOControllerConfig'
  ],
  imports: [
    'subject',
  ],
  methods: [
    function render() {
      this.tag(this.DetailView, {
        config: this.DAOControllerConfig.create({
          daoKey: 'userDAO'
        }),
        idOfRecord$: this.subject$.dot('user').dot('id')
      });
    }
  ]
});
