# FOAM Chat

Chat app powered by foam.  Simple text messaging for now, but long term goal to send FOAM-lets to chat memebers to enable easier FOAM collaboration.

# Building and running

By default the app serves data out of /opt/foamchat

Set up this directory by doing

```
$ sudo mkdir /opt/foamchat
$ sudo chown <USER> /opt/foamchat
```

Build and run by doing

```
$ ./build.sh
```


If you want to serve out of a different directory use
```
$ ./build.sh "--appHome:/path/to/app/home"
```

## TODO

- [x] data is not real time, listeners need to be fixed
- [x] registration doesnt work, need to set default new group (probably just needs themeing)
- [x] styling/themeing
- [x] sender names/timestamps
- [x] sender avatars
- [x] better scrolling/layout of chat messages
- [x] permissions
- [x] improve generic foam3 many to many picker
- [x] mobile
  - [ ] PWA, whats the right serviceworker strategy
  - [ ] need to figure out deployment and non-deployment
  
- [x] notifications
- [ ] custom controller?
- [ ] richer messages
  - [ ] rich text (links/styling)
  - [ ] attachments (images/gifs/videos)
  - [ ] FOAM-lets
- [ ] end to end encryption



## Deployment

- the client app is a collection of JS
- the server is a java server

- the server does backend stuff like serving js but also serving the app

- foam build? or just serve up unbundled files in a more optimized way
 - can we make unbundled ifles fast enough? use POM support
 - can we add POM caching to a generic serviceworker?
  - can we load 
  
  
- lean into existing tooling and fix later
  - use foam build as per usual
  - add build support for service workers?
  


- POM buildinging/serving
  - ship source tree with app
  - write a servlet that understands POMs
  
  - instead of default servlet
  
  
  
maybe we write a different "jsmaker"

point it at a pom, compile it into a target file?


what's the goal?

i don't like the deploymeent/build feel personally. I want to minimize the difference between production and development.

Need
1) really fast dev cycle
2) unlikely to regress when building


Also need
1) different client payloads

 - a build configuration lets me build the "web client" payload, the "worker" payload, the "service worker" payload
 
 in webpack we'd define various "entry points" for each target, what does that look lik ein foam?
   - a different POM for each? a single pom with different flags?
   
production build
 - generate client binaries for each pom
 - client binaries should include all .js
 - can also include vairous static files to serve
   - html
   - manifests
   - icons
   - etc
 - should we add a static section to poms?


