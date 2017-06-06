import React from 'react';
import {findNodeHandle} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView, TextInput,
  Button, Image
} from 'react-native';
import * as firebase from 'firebase';

export default class UserScreen extends React.Component {
  constructor(props){
    super(props);
    this.user = firebase.auth().currentUser;
  }

  render(){
    var dogsList = []


    firebase.database().ref(`/users/${this.user.uid}/dogs`).once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        // console.log("KEY", childKey);
        // console.log("DATA", childData);
        dogsList.push(childData.dogName)
        console.log(dogsList);
        });
    });
    dogsList = dogsList.map( dog => <Text>{dog}</Text>)
    console.log("LIST", dogsList);

    // firebase.database().ref(`/users/${this.user.uid}/dogs`).once('value').then(function(snapshot) {
    //   var dogs = snapshot.val()
    //   dogsList = dogs.keys().map( dog => <li>{dog.dogName}</li>)
    // });

    return(
      <View style={styles.container}>
        <Text style={styles.text}>Hi, {this.user.displayName}</Text>
        <Text>{dogsList}</Text>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  text: {
  fontWeight: 'bold',
  fontSize: 30,
  }
});
