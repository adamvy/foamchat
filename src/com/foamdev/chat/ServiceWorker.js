foam.CLASS({
  package: 'com.foamdev.chat',
  name: 'ServiceWorker',
  imports: [
    'pushRegistry',
    'subject',
    'auth',
  ],
  methods: [
    function init() {
      this.setup();
      this.subject$.sub(this.setup);
    },
  ],
  listeners: [
    async function setup() {
      try {
        console.log("registering service worker");
        var reg = await navigator.serviceWorker.register(
          "/sw.js",
          { scope: "/" }
        );

        console.log("waiting for service worker to be ready");
        
        await navigator.serviceWorker.ready

        if ( await this.auth.isAnonymous(null) ) {
          console.log("not registering push for anonymosu user");
        }

        console.log("registering for push");
        
        var sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BMg1S-l-WBzz6P1O5YbThzYp1i7cKMmBQ_YNEVkPBR7LQlXFhyDOU7XUWpL2rNHEILa9ssZW1Dvx1520olewMP0'
        });


        var key = foam.util.toUrlSafeBase64(sub.getKey('p256dh'))
        var auth = foam.util.toUrlSafeBase64(sub.getKey('auth'))

        await this.pushRegistry.subscribe(null, sub.endpoint, key, auth, sub.token, 'GRANTED');
      } catch (e) {
        console.error(e); 
      }
    }
  ]
});
