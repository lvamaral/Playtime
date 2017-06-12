# Playtime

Every dog owner knows that the best way to tire out their dog is to let it play with other dogs. A tired dog is a happy dog. Playtime makes it easier to coordinate playtimes by enabling users to follow each other's dogs. When taking your dog out, let the app know and it will automatically alert all your dog's friends, so they can meet up and hang out. It's Playtime, all the time.

## Technologies

Playtime is built in React-Native using the Expo SDK. For our backend, we chose firebase, a lightweight server maintained by google. React-Native compiles to native code for both android and iOS, allowing us to create multi-platform apps using the JavaScript syntax we know and love. Expo, which is maintained by many core developers for React-Native, allows for fairly straightforward Facebook and Google Authentication schemes, as well as other benefits. Lastly, firebase, as a 'real-time' database, listens for events (such as receiving or deleting data) which can trigger events on the client.

## Features

1. Users can create, view, follow and unfollow dogs.
2. Users can join and unfollow parks. Joining a park indicates to other users that your dogs go to that park.
3. Users can approve and deny follow requests.
4. Users can create playtimes, automatically alerting the users who follow their dogs and go to the same parks as them that they are now taking their dogs to the park.
5. Users can log in through their facebook or google accounts.

## Implementation

### Real-time updates

firebase allows Playtime users to receive push notifications in real-time without a browser (or, in this case, app) reload. It creates the equivalent of an event-listener, which is triggered whenever a new notification is added to the database: when this happens, the list of notifications on the client is automatically updated.

```JavaScript
componentWillMount() {
  const currUID = firebaseApp.auth().currentUser.uid
  const noteRef = firebaseApp.database().ref(`users/${currUID}/notifications`);
  const _this = this;

  noteRef.on('value', snapshot => {
    _notifs = [];
    snapshot.forEach(notif => {
      if (notif.val().status === "UNSEEN") {
        _notifs.push(notif.val());
        _notifs[_notifs.length - 1].id = notif.key;
      }
    });
    _this.setState({
      notifications: _notifs,
      loading: false
    });
  });

  noteRef.on('child_removed', snapshot => {
    _this.state.notifications.forEach((notif, idx) => {
      if(notif.id === snapshot.key) {
        _this.state.notifications.splice(idx, 1);
        this.setState({notifications: _this.state.notifications});
      }
    });
  });
}
```

Here we see that, whenever the value of `noteRef` changes (and when the component mounts for the first time), firebase triggers a new `snapshot`. This updates the current list of notifications with the new notifications. The reason we opt for `value` over `child_added` here is that, using `child_added`, which triggers once per child, we'd need to set the state once per child——an unnecessary number of re-renders. Even though listening on `value` becomes somewhat slower when a new notification is received, we reason that it's less likely a user will receive a new notification in real-time while on Playtime than that they'll have a large-ish array of notifications to go through on rebooting the app.

We then add a listener for `child_removed`, which will trigger whenever the client resolves a notification. This will iterate through the current notifications stored in `this.state.notifications` and splice out the notification with the correct id, triggering a real-time update.


### 
