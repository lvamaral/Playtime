import React from 'react';
import {findNodeHandle} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView, TextInput,
  Button, Image, FlatList, TouchableHighlight
} from 'react-native';

import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';
import {isEqual} from 'lodash';

export default class UserScreen extends React.Component {
  constructor(props){
    super(props);
    this.user = firebase.auth().currentUser;
    this.state = {}
    this.dogsList = []
  }

  static route = {
    navigationBar: {
      title: "User Profile"
    },
  };

  componentDidMount(){
    if (this.user) {
      this.getDogList();
    }
  }

  getDogList(){
    let _this = this
    var dogsList = []

    firebaseApp.database().ref(`/users/${this.user.uid}/dogs`).once('value').then(function(snapshot) {
      let newState = _this.state
      snapshot.forEach(function(childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        newState[childKey] = childData
        dogsList.push(childData)
        });
        // console.log("NEW STATE", newState)
        _this.setState(newState)

    });
  }

  goTo(id, name) {

    this.props.navigator.push('dogView', {id: id, name: name});
  }

  render(){
    if (!isEqual(this.state, {})) {
      let ids = Object.keys(this.state)
      let dogs = Object.values(this.state)
      var list =
      dogs.map( (dog, i) => {
        return (
        <TouchableHighlight key={ids[i]} onPress={ () => this.goTo(ids[i], dog.dogName)}>
          <View>
            <Text style={styles.text} >{dog.dogName}</Text>
          </View>
       </TouchableHighlight>
      )}
      )
    }

    return(
      <View style={styles.container}>
        <Text style={styles.text}>Hi, {this.user.displayName}</Text>
        <View><Text>Your Dogs</Text></View>
        <ScrollView>{list}</ScrollView>
        <View><Text>Followers/Following</Text></View>
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
},
  list_container: {
    flex: 1,
  }
});
