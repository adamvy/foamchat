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
  - [x] PWA, whats the right serviceworker strategy
  - [x] need to figure out deployment and non-deployment
- [ ] offline
  - [ ] pwa caching
  - [ ] sync dao
- [x] notifications
- [ ] custom controller?
- [ ] richer messages
  - [ ] rich text (links/styling)
  - [ ] attachments (images/gifs/videos)
  - [ ] FOAM-lets
- [ ] end to end encryption



## Deployment

Currently we do "JAR" builds on demand on the server.

There is a custom run.sh script on the server that just calls build.js

> node foam3/tools/build.js -c --jar -w -Jprod

The server has a custom systemd service that invokes the run script.

When running in --jar mode, the http server detects the webroot as being inside the jar and only serves that rather than the whole source tree like we see in normal builds
