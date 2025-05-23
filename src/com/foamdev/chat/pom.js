foam.POM({
  name: 'chat',
  projects: [
    { name: 'test/pom',                 flags: 'test' }
  ],
  files: [
    { name: 'Chat',                     flags: 'js|java' },
    { name: 'ChatView',                 flags: 'web' },
    { name: 'ChatMenu',                 flags: 'js|java' },
    { name: "ChatMenuView",             flags: 'web' },
    { name: 'Composer',                 flags: 'web' },
    { name: 'Message',                  flags: 'js|java' }
  ]
});
