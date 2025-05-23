foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'Composer',
  extends: 'foam.u2.View',
  requires: [
    'com.foamdev.chat.Message'
  ],
  properties: [
    {
      name: 'dao'
    },
    {
      name: 'data',
      factory: function() {
        return this.Message.create();
      }
    }
  ],
  css: `
^ {
}
`,
  methods: [
    function render() {
      this
        .addClass()
        .tag(this.Message.CONTENT, { onKey: true })
    }
  ],
  actions: [
    {
      name: 'send',
      keyboardShortcuts: [ 'enter' ],
      code: function() {
        this.dao.put(this.data);
        this.data = this.Message.create();
      }
    }
  ]
});
  
