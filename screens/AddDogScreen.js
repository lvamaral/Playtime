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
// import RNFetchBlob from 'react-native-fetch-blob';




export default class AddDogScreen extends React.Component {
  constructor(props) {
    super(props)
    let user = firebase.auth().currentUser
    this.state = {
      dog: {
        ownerName: user.displayName,
        ownerId: user.uid,
        dogName: "",
        age: "",
        breed: "",
        image: null
      },
    ready: false
    }

  }
  // static route = {
  //   navigationBar: {
  //     title: 'Links',
  //   },
  // };



handleFormFocus(e, component){

 }

 handleSubmit(){
   firebase.database().ref('dogs/').push(this.state.dog)
   this.setState({ready: true})
 }

 _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [3, 3],
  });
  if (!result.cancelled) {
    this.setState( {dog: {image: result.uri} });
  }

  console.log(result);
  let dogName = "";
  var storageRef = firebase.storage().ref('images/' + dogName)

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


  render() {
    if (this.state.ready === true) {
      console.log("hey");
      return (
        <View>
          <StackNavigation
            id="root"
            initialRoute={Router.getRoute('user')}
          />
        </View>
      )
    }

    let image = this.state.dog.image;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Text>Tell us about your little guy!</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button
                title="Pick an image from camera roll"
                onPress={this._pickImage}
              />
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>

              <TextInput
                 style={{height: 40}}
                 placeholder="Dog Name"
                 onChangeText={(text) => this.setState({["dogName"]: text})}
               />
               <TextInput
                  style={{height: 40}}
                  placeholder="Breed"
                  onChangeText={(text) => this.setState({["breed"]: text})}
                />
                <TextInput keyboardType={'numeric'}
                   style={{height: 40}}
                   placeholder="Age"
                   onChangeText={(text) => this.setState({["age"]: text})}
                />
              <Button title="Add Dog" color="#841584" onPress={this.handleSubmit.bind(this)}></Button>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
});
