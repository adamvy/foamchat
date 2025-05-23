foam.POM({
  name: 'foamchat',
  excludes: [ '*' ],
  projects: [
    { name: 'foam3/pom'},
    { name: 'src/com/foamdev/chat/pom'},
    { name: 'journals/pom' }
  ],
  licenses: `
    // Add your license header here
  `,
  envs: {
    VERSION: '0.0.1',
  },
  tasks: [
    function javaManifest() {
      JAVA_MANIFEST_VENDOR_ID = 'com.foamdev.chat';
    }
  ]
});
