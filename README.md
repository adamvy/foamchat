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
- [ ] styling/themeing
- [x] sender names/timestamps
- [x] sender avatars
- [x] better scrolling/layout of chat messages
- [x] permissions
- [ ] richer messages
  - [ ] rich text (links/styling)
  - [ ] attachments (images/gifs/videos)
  - [ ] FOAM-lets
- [ ] end to end encryption
