foam.POM({
  name: 'foamchat-webroot',
  copy: [
    { source: "sw.js", targetDir: "webroot" },
    { source: "terms.html", targetDir: "webroot" },
    { source: "privacy.html", targetDir: "webroot" }
  ]
});

    
