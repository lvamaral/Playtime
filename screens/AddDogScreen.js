import React from 'react';
import {findNodeHandle} from 'react-native';
import {
  StyleSheet, Text, Alert,
  View, ScrollView, TextInput,
  Button, Image, TouchableOpacity,
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
import { RNS3 } from 'react-native-aws3';
import Alerts from '../constants/Alerts';
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

 handleSubmit() {
   if(this.state.dog.dogName !== "" &&
    this.state.dog.age !== "" &&
    this.state.dog.breed !== "") {
      if(parseInt(this.state.dog.age) > 0 && parseInt(this.state.dog.age) < 25) {
        if(this.state.dog.image === null) {
          Alert.alert(
            'Invalid form!',
            'Please upload an image.'
          );
          return;
        }
        var lastDog = firebase.database().ref('dogs/').push(this.state.dog).key;
        firebase.database().ref(`users/${this.user.uid}/dogs/${lastDog}`).set(this.state.dog);
        firebase.database().ref(`users/${this.user.uid}/dogs`).once('value').then(snapshot => {
          if(snapshot.val().dogs.length === 1) {
            this.props.navigator.push("parks");
            this.props.navigator.showLocalAlert(
              'Which parks do you go to?',
              Alerts.notice
            );
          } else {
            this.props.navigator.replace("user");
          }
        });
      } else {
        Alert.alert(
          'Invalid form',
          'Please select a valid age.'
        );
      }
    } else {
      Alert.alert(
        'Invalid form!',
        'Please fill out all fields.'
      );
    }

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
    this._uploadImageAsync(this.state.dog.image);
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
          <View style={styles.upperContainer}>
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
            </View>
            <View style={styles.lastContainer}>
              <TouchableOpacity onPress={this.handleSubmit.bind(this)} style={styles.button}>
                <Text style={styles.buttonText}>Add Dog</Text>
              </TouchableOpacity>
            </View>
          </View>

      </KeyboardAwareScrollView>
    );
  }

  _uploadImageAsync(uri) {
    _this = this;
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: `${uri}`,
      name: `${firebaseApp.auth().currentUser.displayName}`,
      type: "image/png"
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "playtimebucket",
      region: "us-west-1",
      accessKey: secrets.awsAccess,
      secretKey: secrets.awsSecret,
      successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      _this.state.dog.image = response.body.postResponse.location;
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  mainConatiner: {
    position: 'relative',
    display: 'flex',
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
  },
  borderInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    height: 60,
    marginTop: 22,
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
  },
  upperContainer: {
    flex: 8,
  }

});
