import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC_bVs0MUUwNkpGz1--DkqVqIIAJbMvvDM",
  authDomain: "playtime-38f28.firebaseapp.com",
  databaseURL: "https://playtime-38f28.firebaseio.com",
  projectId: "playtime-38f28",
  storageBucket: "playtime-38f28.appspot.com",
  messagingSenderId: "718666055127"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
