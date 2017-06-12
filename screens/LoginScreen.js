import React from 'react';
import Expo from 'expo';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button, Image } from 'react-native';
import { logInToFacebook, signInWithGoogleAsync } from '../api/logIn';
import firebaseApp from '../api/firebaseApp';
import * as firebase from 'firebase';
import Colors from '../constants/Colors';
import { FontAwesome} from '@expo/vector-icons';

class LoginScreen extends React.Component {
  state = {
    noUser: false,
    loading: false
  };

  componentWillMount(){

    const that = this;
    firebase.auth().onAuthStateChanged((user) => {
      // that.setState({loading: true});
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
            <TouchableOpacity onPress={() => {
              logInToFacebook();
              this.setState({loading: true});
            } }>
              <View style={styles.fb}>

                  <FontAwesome
                style={styles.bText}
                name={"facebook"}
                size={32}
                color={Colors.white}
                />
                <Text style={styles.bText}>Continue with Facebook</Text>

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              signInWithGoogleAsync();
              this.setState({loading: true});
            } }>
              <View style={styles.android}>
                <FontAwesome
                style={styles.bText}
                name={"google"}
                size={32}
                color={Colors.white}
                />
              <Text style={styles.bText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>
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
    paddingLeft: 7,
    height: 40,
    width: 280,
    backgroundColor: Colors.blue,
    marginVertical: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  android: {
    height: 40,
    width: 280,
    backgroundColor: 'red',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  bText: {
    fontSize: 20,
    color: Colors.white,
  },
  mainText: {
    fontSize: 30,
    color: Colors.white,
  },
  bIcon: {
    flex: 1,
    alignItems: "center",
  },
  bBoxText:{
    flex: 4,
    alignItems: "center",
  }

});

export default LoginScreen;
