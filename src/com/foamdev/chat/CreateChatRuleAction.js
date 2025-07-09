foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'CreateChatRuleAction',
  implements: ['foam.core.ruler.RuleAction'],

  methods: [
    {
      name: "applyAction",
      javaCode: `
agency.submit(x, new foam.lang.ContextAwareAgent() {
  @Override
  public void execute(foam.lang.X x) {
    var chat = (Chat)obj;
    var dao = (foam.dao.DAO)getX().get("chatUserJunctionDAO");
    var subject = (foam.core.auth.Subject)x.get("subject");
    dao.put(new ChatUserJunction.Builder(null).setSourceId(chat.getId()).setTargetId(subject.getUser().getId()).build());
  }
}, "Create chat");
`
    }
  ]
});
