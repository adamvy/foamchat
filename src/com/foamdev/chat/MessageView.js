foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'MessageView',
  extends: 'foam.u2.View',
  requires: [
    'foam.u2.tag.Image'
  ],
  imports: [
//    'userDAO' // Importing userDAO to fetch user details
  ],
  properties: [
    {
      name: 'sender'
    }
  ],
  css: `
    ^ {
      margin-bottom: 15px;
      display: flex;
      align-items: flex-start;
    }
    ^avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      margin-right: 10px;
      flex-shrink: 0;
      margin-top: 10px; /* Aligns avatar with the top of the message content bubble */
    }
    ^message-body {
      flex: 1;
    }
    ^message-header {
      display: flex;
      align-items: baseline;
      margin-bottom: 5px;
    }
    ^name {
      font-weight: bold;
      color: #666; /* Lower contrast */
      font-size: 12px; /* Smaller size */
    }
    ^timestamp {
      color: #999; /* Lower contrast */
      font-size: 10px; /* Smaller size */
      margin-left: 8px;
    }
    ^message-content {
      background-color: #f0f2f5; /* Subtler grey for others */
      border-radius: 10px;
      padding: 10px;
      color: black;
      font-size: 14px;
      max-width: 80%;
      word-wrap: break-word;
      display: inline-block;
    }
    ^own-message ^message-content {
      background-color: #e3f2fd; /* Subtler blue for own messages */
    }
    ^mention {
      color: #0078d4;
      cursor: pointer;
    }
  `,
  constants: {
    USER_CACHE: {}
  },
  methods: [
    function render() {
      var self = this;
      var msg = this.data; // The message object passed as data
      //      var isOwnMessage = msg.createdBy === self.subject.user.id; // Use 'createdBy' to identify own messages
      var isOwnMessage = false;

      var cache = this.USER_CACHE

      if ( ! cache[msg.createdBy] ) {
        cache[msg.createdBy] = {
          staleAfter: 0,
          slot: foam.lang.SimpleSlot.create(),
        }
      }

      var cached = cache[msg.createdBy];
      var sender$ = cache[msg.createdBy].slot;
      
      if ( cached.staleAfter < Date.now() ) {
        cached.staleAfter = Date.now() + 30000;
        // TODO: do this using a join once we add support for joins
        this.__context__.userDAO.find(msg.createdBy).then((sender) => {
          sender$.set(sender);
        });
      }
      
      this
        .addClass()
        .addClass(isOwnMessage ? self.myClass('own-message') : '')
        .start('div', null, this.avatar$)
        .addClass(self.myClass('avatar'))
        .start('img')
        .attrs({ src: sender$.dot("profilePicture").dot("address"), decoding: "sync" })
        .end('img')
        // .start(foam.u2.tag.Image, {
        //   data$: sender$.dot('profilePicture').dot('address'),
      //   sync: true
        // })
        // .end()
        .end()
        .start('div')
        .addClass(self.myClass('message-body'))
        .start('div')
        .addClass(self.myClass('message-header'))
        .start('span')

        .addClass(self.myClass('name'))
        .add(isOwnMessage ? "You" : foam.lang.ExpressionSlot.create({
          args: [sender$.dot('firstName'), sender$.dot('userName')],
          code: function(firstName, userName) {
            return firstName || userName || "Unknown"
          }
        }))
        .end()
        .start('span')
        .addClass(self.myClass('timestamp'))
        .add(msg.created ? msg.created.toLocaleTimeString() : 'Unknown time') // Assuming 'created' is a Date object
        .end()
        .end()
        .start('div')
        .addClass(self.myClass('message-content'))
        .add(msg.content)
        .end()
        .end();
    }
  ]
});
