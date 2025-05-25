foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'Message',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.CreatedByAware',
    'foam.core.auth.LastModifiedAware'
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

