foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'Chat',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.LastModifiedAware',
    'foam.core.auth.Authorizable',
  ],

  tableColumns: [
    'name',
    'description',
    'open',
  ],

  searchColumns: [
    'name',
    'description'
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
      name: 'name',
      required: true
    },
    {
      class: 'String',
      name: 'description'
    }
  ],

  methods: [
    function toSummary() {
      return this.name;
    },
    function toString() {
      return this.toSummary();
    },
    {
      name: 'isMember',
      type: 'Boolean',
      args: [
        { name: 'x', type: 'Context' },
        { name: 'userId', type: 'Long' },
      ],
      javaCode: `
return ((foam.dao.DAO)x.get("chatUserJunctionDAO")).find(new ChatUserJunctionId(getId(), userId)) != null;
`,
    },
    {
      name: 'authorizeOnCreate',
      javaCode: `
// anyone can create a chat
`
    },
    {
      name: 'authorizeOnRead',
      javaCode: `
if ( ! isMember(x, ((foam.core.auth.Subject)x.get("subject")).getUser().getId()) ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
    {
      name: 'authorizeOnUpdate',
      javaCode: `
if ( ! isMember(x, ((foam.core.auth.Subject)x.get("subject")).getUser().getId()) ) {
  throw new foam.core.auth.AuthorizationException();
}
`
    },
    {
      name: 'authorizeOnDelete',
      javaCode: `
throw new foam.core.auth.AuthorizationException();
`
    },
  ],
  actions: [
    {
      name: 'open',
      isAvailable: function() { return !!this.id },
      code: function(x) {
        x.routeTo('foamdev.chat/' + this.id);
      }
    }
  ]
});
