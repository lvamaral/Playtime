import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView, TextInput,
  Button, Image
} from 'react-native';
import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';

export default class FollowerScreen extends React.Component {
  constructor(props){
    super(props);
    this.userId = this.props.route.params.id
  }

  static route = {
    navigationBar: {
      title: "Followers"
    },
  };

  componentDidMount(){
    let dogs = []
    let _this = this
    firebaseApp.database().ref(`/followUserToDog/${this.userId}`).once('value').then(function(snapshot){
      let newState = _this.state
      snapshot.forEach(function(childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let newDog = childData
          newDog["id"] = childKey
          newState.dogs.push(newDog)
          })
          _this.setState(newState)
        })
    }
    

  render(){
    return (
      <View></View>
    )
  }

}
