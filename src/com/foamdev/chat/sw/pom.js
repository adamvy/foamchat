foam.POM({
  name: 'foamchat-serviceworker',
  setFlags: {
    js: true,
    web: true,
    java: false,
    swift: false,
    worker: true
  },
  projects: [
    { name: '../../../../../foam3/src/pom' },
    { name: '../../../../../foam3/src/foam/core/pom' }
  ],
  files: [
    { name: 'main', flags: "js" }
  ]
});
