import React from 'react';
import Expo from 'expo';
import { View, Text, StyleSheet, TouchableHighlight, Alert, Button, Image } from 'react-native';
import { logInToFacebook, signInWithGoogleAsync } from '../api/logIn';
import firebaseApp from '../api/firebaseApp';
import * as firebase from 'firebase';
import Colors from '../constants/Colors';

class LoginScreen extends React.Component {
  state = {
    noUser: false
  };
  static route = {
    navigationBar: {
      visible: false
    },
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
        <View style={styles.mainContainer}>
          <Image style={{marginTop: 30}} source={require('../assets/icons/dog-sleeping.png')}/>
          <View style={styles.container}>
            <View style={styles.fb}>
              <Button
              title='Continue with Facebook'
              onPress={logInToFacebook} color="white" style={styles.btext}/>

            </View>
            <View style={styles.android}>
            <Button
              title='Continue with Google'
              onPress={signInWithGoogleAsync} color="white" />

            </View>
          </View>
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
    position: "absolute",
    bottom: 40,

  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Colors.orange
  },
  fb: {
    backgroundColor: Colors.blue,
    marginVertical: 5,
  },
  android: {
    backgroundColor: 'red',

  },
  bText: {
    fontSize: 40,
    color: Colors.white,
  }

});

export default LoginScreen;
