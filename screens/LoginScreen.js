import React from 'react';
import Expo from 'expo';
import { View, Text, StyleSheet, TouchableHighlight, Alert, Button } from 'react-native';
import { logInToFacebook, signInWithGoogleAsync } from '../api/logIn';
import firebaseApp from '../api/firebaseApp';
import * as firebase from 'firebase';

class LoginScreen extends React.Component {
  state = {
    noUser: false
  };

  componentWillMount(){
    const that = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
        this.props.navigator.push('rootNavigation');
      } else {
        this.setState({noUser: true});
      }
    });
  }

  render(){
    if(this.state.noUser) {
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
    } else {
      return(
        <View></View>
      )
    }
  }
}

//
const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  },
});

export default LoginScreen;
