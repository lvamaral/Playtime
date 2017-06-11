import React from 'react';
import {findNodeHandle} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView, TextInput,
  Button, Image
} from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import { StackNavigation, NavigationProvider } from '@expo/ex-navigation';
import Router from '../navigation/Router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from '../assets/stylesheets/pageLayout';
import { Ionicons, Foundation } from '@expo/vector-icons';
import Colors from '../constants/Colors';
const sha1 = require('sha1');
import secrets from '../secrets';
// var request = require('request');
// import uploadImageAsync from '../api/uploadImage';


export default class AddDogScreen extends React.Component {
  constructor(props) {
    super(props)
    this.user = firebase.auth().currentUser
    this.state = {
      dog: {
        ownerName: this.user.displayName,
        ownerId: this.user.uid,
        dogName: "",
        age: "",
        breed: "",
        image: null
      },
    ready: false
    }
  }
  static route = {
    navigationBar: {
      title: "New Dog"
    },
  };

 handleFormFocus(e, component){

 }

 handleSubmit(){
   var lastDog = firebase.database().ref('dogs/').push(this.state.dog).key
   firebase.database().ref(`users/${this.user.uid}/dogs/${lastDog}`).set(this.state.dog);
   this.props.navigator.push('rootNavigation');
 }

 _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [3, 3],
  });
  if (!result.cancelled) {
    let oldState = this.state
    oldState.dog.image = result.uri
    this.setState( {oldState} );
  }

    let dogName = "";
    const uploadResponse = await this._uploadImageAsync(this.state.dog.image);
    // debugger
    // var storageRef = firebase.storage().ref('images/' + dogName);


  // const Blob = RNFetchBlob.polyfill.Blob;
  // const fs = RNFetchBlob.fs;
  // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  // window.Blob = Blob;
  // let rnfbURI = RNFetchBlob.wrap(result.uri)
  // // create Blob from file path
  // Blob
  //   .build(rnfbURI, { type : 'image/png;'})
  //   .then((blob) => {
  //     // upload image using Firebase SDK
  //     storageRef.put(blob, { contentType : 'image/png' })
  //   })
  };

  update(category, text){
    let oldState = this.state
    oldState.dog[category] = text
    this.setState( {oldState} );
  }

  render() {
    let image = this.state.dog.image;
    let hasImage = <Text></Text>
    if (image === null) {
      hasImage = (
        <View style={styles.imageWait}>
          <Button
            color={Colors.white}
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
        </View>
              )
    } else {
    hasImage =
     (<View style={styles.container}>
        <View style={styles.centerContainer}>
          <Image source={{ uri: image }} style={styles.imageStyle} />
        </View>
      </View>)
    }

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.mainContainer}>
            <View style={styles.container}>
              {hasImage}
            </View>
            <View style={styles.container}>
              <TextInput
                 style={styles.textInput}
                 placeholder="Dog Name"
                 onChangeText={(text) => this.update("dogName", text)}
                 maxLength={15}
               />
               <TextInput
                  style={styles.textInput}
                  placeholder="Breed"
                  onChangeText={(text) => this.update("breed", text)}
                  maxLength={20}
                />
                <TextInput keyboardType={'numeric'}
                   style={styles.textInput}
                   placeholder="Age"
                   onChangeText={(text) => this.update("age", text)}
                   maxLength={2}
                />
            </View>
            <View style={styles.lastContainer}>
              <Button title="Add Dog" color={Colors.orange} onPress={this.handleSubmit.bind(this)} style={styles.button}></Button>
            </View>
          </View>

      </KeyboardAwareScrollView>
    );
  }

  async _uploadImageAsync(uri) {
    return fetch('http://localhost:3000/images',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uri: uri
        })
      }
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainConatiner: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between'
  },
  imageWait: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    alignSelf: 'stretch',
  },
  imageStyle: {
    margin: 10,
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    color: Colors.black,
    paddingLeft: 5,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastContainer: {
    flex: 1,
    margin: 80,
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: Colors.black,

  }

});
