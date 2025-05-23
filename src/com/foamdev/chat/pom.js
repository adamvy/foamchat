foam.POM({
  name: 'chat',
  projects: [
    { name: 'test/pom',                 flags: 'test' }
  ],
  files: [
    { name: 'Chat',                  flags: 'js|java' },
    { name: 'ChatCategory',          flags: 'js|java' }
  ]
});
