import * as firebase from 'firebase';

var config = {
  apiKey: secrets.apiKey,
  authDomain: secrets.apiKey,
  databaseURL: secrets.databaseURL,
  projectId: secrets.projectId,
  storageBucket: secrets.storageBucket,
  messagingSenderId: secrets.messagingSenderId
};

export default firebaseApp = firebase.initializeApp(config);
