foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'Message',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.CreatedByAware',
    'foam.core.auth.LastModifiedAware',
    'foam.core.auth.Authorizable',
    'foam.core.notification.Notifiable'
  ],

  tableColumns: [
    'createdBy',
    'content'
  ],
  
  properties: [
    {
      class: 'String',
      name: 'id',
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO'
    },
    {
      class: 'String',
      name: 'content'
    }
  ],

  methods: [
    {
      name: 'addToE',
      code: function(e) {
        e
          .start('pre')
          .add(this.createdBy, ': ')
          .add(this.content)
          .end()
      }
    },
    {
      name: 'authorizeOnCreate',
      javaCode: `
// can message any chat you're a member in
if ( ((foam.dao.DAO)x.get("chatDAO")).inX(x).find(getChat()) == null ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
    {
      name: 'authorizeOnRead',
      javaCode: `
// can read any message in a chat you're a member in
if ( ((foam.dao.DAO)x.get("chatDAO")).inX(x).find(getChat()) == null ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
    {
      name: 'authorizeOnUpdate',
      javaCode: `
// can edit any message you authoried
if ( foam.util.SafetyUtil.compare(getCreatedBy(), ((foam.core.auth.Subject)x.get("subject")).getUser().getId()) != 0 ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
    {
      name: 'authorizeOnDelete',
      javaCode: `
// can delete any message you authoried
if ( foam.util.SafetyUtil.compare(getCreatedBy(), ((foam.core.auth.Subject)x.get("subject")).getUser().getId()) != 0 ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
    {
      name: 'doNotify',
      javaCode: `
if ( oldObj != null ) {
  // only notify for new messages, not edits
  return;
}

var userDAO = (foam.dao.DAO)x.get("userDAO");

var chat = (com.foamdev.chat.Chat)((foam.dao.DAO)x.get("chatDAO")).find(getChat());
var sender = (foam.core.auth.User)userDAO.find(getCreatedBy());

var junctionDAO = (foam.dao.DAO) x.get("chatUserJunctionDAO");
var sink = new foam.dao.ArraySink();
junctionDAO.where(foam.mlang.MLang.EQ(com.foamdev.chat.ChatUserJunction.SOURCE_ID, getChat())).select(sink);
var members = sink.getArray();

var name = ! foam.util.SafetyUtil.isEmpty(sender.getFirstName()) ?
  sender.getFirstName() :
  sender.getUserName();
var toastMessage = new StringBuilder().append(chat.getName()).append(" | ").append(name).toString();

var notificationDAO = (foam.dao.DAO) x.get("notificationDAO");
for ( var i = 0; i < members.size(); i++ ) {
  var junction = (com.foamdev.chat.ChatUserJunction) members.get(i);
  var userId = junction.getTargetId();
  if ( foam.util.SafetyUtil.compare(userId, getCreatedBy()) == 0 ) continue;
  var user = (foam.core.auth.User)userDAO.find(userId);

  var notification = new foam.core.notification.Notification.Builder(x)
    .setUserId(userId)
    .setToastState(foam.core.notification.ToastState.REQUESTED)
    .setToastMessage(toastMessage)
    .setToastSubMessage(getContent())
    .setBody(getContent())
    .setExtra(new java.util.HashMap() {{
      put("url", "/#foamdev.chat/" + getChat());
    }})
    .build();

  user.doNotify(x, notification);

//  notificationDAO.put(builder);
    
}
`
    }
  ]
});

foam.RELATIONSHIP({
  cardinality: '1:*',
  sourceModel: 'com.foamdev.chat.Chat',
  targetModel: 'com.foamdev.chat.Message',
  forwardName: 'messages',
  inverseName: 'chat',
});

