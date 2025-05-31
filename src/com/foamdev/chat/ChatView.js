foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'ChatView',
  extends: 'foam.u2.View',
  requires: [
    'com.foamdev.chat.Composer',
    'com.foamdev.chat.Message'
  ],
  properties: [
    {
      name: 'limit',
      value: 100
    },
    {
      class: 'String',
      name: 'textInput',
    },
  ],
  imports: [
    'subject'
  ],
  css: `
^{
  padding: 12px;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr min-content;
}

^messages {
  overflow-y: scroll;
}

`,
  methods: [
    function render() {
      var self = this;
      
      this
        .addClass()
        .start("div")
        .addClass(this.myClass("messages"))
        .observeScrollHeight()
        .call(function() {
          var scrollTop;
          var scrollBottom = 0;
          this.on("scroll", () => {
            scrollTop = this.element_.scrollTop
            scrollBottom = (this.element_.scrollHeight ?? 0) - scrollTop - this.element_.clientHeight;
          });
          var scrollContainer = this;
          this.scrollHeight$.sub(() => {
            if ( scrollBottom < 30 ) {
              this.element_.scrollTop = this.element_.scrollHeight + scrollBottom + this.element_.clientHeight;
            }
          })
        })
        .add(self.dynamic(function(data) {
          this
            .select(data.messages.orderBy(self.Message.CREATED), function(msg) {
              this
                .start('div')
                .call(function() {
                  msg.addToE(this);
                })
                .end()
            })
        }))
        .end()
        .tag(this.Composer, { dao$: this.data.dot('messages') })
    }
  ]
});
