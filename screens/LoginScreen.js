import React from 'react';
import Expo from 'expo';
import { View, Text, StyleSheet, TouchableHighlight, Alert, Button } from 'react-native';
import * as firebase from 'firebase';
import { logInToFacebook, signInWithGoogleAsync } from '../api/logIn';
import { StackNavigation, NavigationProvider } from '@expo/ex-navigation';
import Router from '../navigation/Router';

class LoginScreen extends React.Component {
  state = {
    loggedIn: false,
    loadingInfo: true
  };

  render(){
    return(
      <View style={styles.container}>
        <Button
          title='Continue with Facebook'
          onPress={logInToFacebook} />
        <Button
          title='Continue with Google'
          onPress={signInWithGoogleAsync} />
      </View>
    );
  }
}

//
const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  },
});

export default LoginScreen;

// Initialize Firebase
// Listen for authentication state to change.
