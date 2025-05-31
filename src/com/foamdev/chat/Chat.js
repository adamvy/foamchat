foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'Chat',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.LastModifiedAware'
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
    }
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
