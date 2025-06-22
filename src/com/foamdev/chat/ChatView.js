foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'ChatView',
  extends: 'foam.u2.View',
  requires: [
    'com.foamdev.chat.Composer',
    'com.foamdev.chat.Message',
    'com.foamdev.chat.MessageView'
  ],
  imports: [
    'stack?',
    'subject'
  ],
  properties: [
    {
      name: 'limit',
      value: 50
    },
    {
      class: 'String',
      name: 'textInput',
    },
  ],
  css: `
    ^ {
      padding: 20px;
      height: 80vh;
      display: grid;
      grid-template-rows: 1fr min-content;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 20px auto;
    }
    ^messages {
      overflow-y: scroll;
    }
    ^divider {
      background-color: #DCF8C6;
      color: white;
      text-align: center;
      padding: 5px;
      margin: 10px 0;
      border-radius: 5px;
      font-size: 12px;
    }
    ^input-area {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #F0F0F0;
      padding: 10px;
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
      max-width: 800px;
      margin: 0 auto;
      border-radius: 10px 10px 0 0;
    }
  `,
  methods: [
    function render() {
      var self = this;

      // Adjust document size when the virtual keyboard opens
      const viewport = () => {
        document.body.style.height = window.visualViewport.height;
      };
      viewport();
      window.visualViewport.addEventListener('resize', viewport);
      this.onDetach(() => {
        window.visualViewport.removeEventListener('resize', viewport);
        document.body.style.height = undefined;
      });

      this.stack$?.get()?.setTitle(this.data$.dot('name'), this);
      this
        .addClass()
        .start("div")
        .addClass(this.myClass("messages"))
        .observeScrollHeight()
        .call(function() {
          var scrollTop;
          var scrollBottom = 0;
          this.on("scroll", () => {
            scrollTop = this.element_.scrollTop;
            scrollBottom = (this.element_.scrollHeight ?? 0) - scrollTop - this.element_.clientHeight;
          });

          var callback = () => {
            if (scrollBottom < 30) {
              this.element_.scrollTop = this.element_.scrollHeight + scrollBottom + this.element_.clientHeight;
            }
          };

          this.resizeObserver(callback);
          this.scrollHeight$.sub(callback);
        })
        .add(self.dynamic(function(data) {
          this.select(data.messages.orderBy(self.Message.CREATED), function(msg) {
            this.tag(self.MessageView, { data: msg });
          });
        }))
        .end()
        .tag(this.Composer, { dao$: this.data.dot('messages') });
    }
  ]
});
