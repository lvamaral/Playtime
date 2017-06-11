import React from 'react';
import Expo from 'expo';
import { View, Text, StyleSheet, TouchableHighlight, Alert, Button, Image } from 'react-native';
import { logInToFacebook, signInWithGoogleAsync } from '../api/logIn';
import firebaseApp from '../api/firebaseApp';
import * as firebase from 'firebase';
import Colors from '../constants/Colors';

class LoginScreen extends React.Component {
  state = {
    noUser: false,
    loading: false
  };

  componentWillMount(){
    const that = this;
    firebase.auth().onAuthStateChanged((user) => {
      that.setState({loading: true});
      if (user != null) {
        console.log("We are authenticated now!");
        firebaseApp.database().ref(`users/${user.uid}`).once('value').then(snapshot => {
          if(snapshot.exists()) {
            that.setState({loading: false});
            that.props.navigator.push('rootNavigation');
          } else {
            that.setState({loading: false});
            that.props.navigator.push('addDog');
          }
        })
      } else {
        this.setState({noUser: true});
      }
    });
  }

  render(){
    if(this.state.loading) {
      return <Expo.AppLoading />
    }

    if(this.state.noUser) {
      return(
        <View style={styles.mainContainer}>
          <Image style={{marginTop: 30}} source={require('../assets/icons/dog-sleeping.png')}/>
          <View style={styles.container}>
            <View style={styles.fb}>
              <Button
              title='Continue with Facebook'
              onPress={() => {
                logInToFacebook();
                this.setState({loading: true});
              } } color="white" style={styles.btext}/>

            </View>
            <View style={styles.android}>
            <Button
              title='Continue with Google'
              onPress={() => {
                signInWithGoogleAsync();
                this.setState({loading: true});
              } } color="white" />

            </View>
          </View>
        </View>
      );
    } else {
      return(
        <Expo.AppLoading />
      )
    }
  }
}

//
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60,

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
    marginVertical: 10,
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
