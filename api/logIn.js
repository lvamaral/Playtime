import * as firebase from 'firebase';
import Expo from 'expo';
import secrets from '../secrets';

export async function logInToFacebook() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(secrets.FBAppId, {
      permissions: ['public_profile']
    });
  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log(error);
    });
  }
}

export async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      iosClientId: secrets.iosClientId,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error);
      });
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}
