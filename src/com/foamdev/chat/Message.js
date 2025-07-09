foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'Message',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.CreatedByAware',
    'foam.core.auth.LastModifiedAware',
    'foam.core.auth.Authorizable',
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
  ]
});

foam.RELATIONSHIP({
  cardinality: '1:*',
  sourceModel: 'com.foamdev.chat.Chat',
  targetModel: 'com.foamdev.chat.Message',
  forwardName: 'messages',
  inverseName: 'chat',
});

