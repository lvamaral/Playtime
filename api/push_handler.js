import firebaseApp from './firebaseApp';

export async function sendPush(message, uid) {
  firebaseApp.database().ref(`/users/${uid}/pushToken`).once('value').then(snapshot => {
    if(snapshot.exists()) {
      fetch('http://playtimeserver.herokuapp.com/tokens',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: snapshot.val().body.token.value,
            message: message
          }),
        }
      ).then(
        res => {
          // console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  });
}
