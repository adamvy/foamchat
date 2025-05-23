foam.CLASS({
  package: 'com.foamdev.chat.test',
  name: 'ChatTest',
  extends: 'foam.core.test.Test',

  javaImports: [
    'com.foamdev.chat.*',
    'foam.dao.DAO',
    'foam.lang.X',
    'foam.util.SafetyUtil'
  ],

  methods: [
    {
      name: 'runTest',
      javaCode: `
        var chat = new Chat();
        test ( SafetyUtil.isEmpty(chat.getId()), "ID empty before create");
        chat = (Chat) ((DAO) x.get("chatDAO")).put(chat);
        test ( ! SafetyUtil.isEmpty(chat.getId()), "ID set after create");
      `
    }
  ]
});
