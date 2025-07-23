foam.POM({
  name: 'chat',
  projects: [
    { name: 'test/pom',                 flags: 'test' }
  ],
  files: [
    { name: 'Chat',                     flags: 'js|java' },
    { name: 'ChatView',                 flags: 'web' },
    { name: 'MessageView',              flags: 'web' },
    { name: 'ChatMenu',                 flags: 'js|java' },
    { name: "ChatMenuView",             flags: 'web' },
    { name: "SettingsView",             flags: 'web' },
    { name: 'Composer',                 flags: 'web' },
    { name: 'Message',                  flags: 'js|java' },
    { name: "ChatUserJunction",         flags: "js|java" },
    { name: "CreateChatRuleAction",     flags: "js|java" },
    { name: "ServiceWorker",            flags: "web" },
  ]
});
