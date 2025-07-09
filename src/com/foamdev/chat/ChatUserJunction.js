foam.RELATIONSHIP({
  package: 'com.foamdev.chat',
  cardinality: '*:*',
  sourceModel: 'com.foamdev.chat.Chat',
  targetModel: 'foam.core.auth.User',
  forwardName: 'members',
  inverseName: 'chats',
});

foam.CLASS({
  package: 'com.foamdev.chat',
  refines: 'com.foamdev.chat.ChatUserJunction',
  name: 'ChatUserJunctionAuthorizationRefinement',
  implements: [ 'foam.core.auth.Authorizable' ],
  methods: [
    {
      name: 'authorizeOnCreate',
      javaCode: `
// can add members to any room you are a member of
// can read any room you're a member of (target is current user)
var subject = (foam.core.auth.Subject)x.get("subject");
var dao = (foam.dao.DAO)x.get("chatUserJunctionDAO");
if ( dao.find(new ChatUserJunctionId(getSourceId(), subject.getUser().getId())) == null ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
    {
      name: 'authorizeOnRead',
      javaCode: `
// can read any room you're a member of (target is current user)
var subject = (foam.core.auth.Subject)x.get("subject");
if ( foam.util.SafetyUtil.compare(getTargetId(), subject.getUser().getId()) == 0 ) {
  return;
}

// otherwise, confirm that you are a member of the source room
var dao = (foam.dao.DAO)x.get("chatUserJunctionDAO");
if ( dao.find(new ChatUserJunctionId(getSourceId(), subject.getUser().getId())) == null ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
    {
      name: 'authorizeOnUpdate',
      javaCode: `
throw new foam.core.auth.AuthorizationException();
`
    },
    {
      name: 'authorizeOnDelete',
      javaCode: `
// you can leave any room you are a member of
var subject = (foam.core.auth.Subject)x.get("subject");
if ( foam.util.SafetyUtil.compare(getTargetId(), subject.getUser().getId()) == 0 ) {
  return;
}

// and can boot anyone from a room you are a member of
var dao = (foam.dao.DAO)x.get("chatUserJunctionDAO");
if ( dao.find(new ChatUserJunctionId(getSourceId(), subject.getUser().getId())) == null ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
  ]
});
