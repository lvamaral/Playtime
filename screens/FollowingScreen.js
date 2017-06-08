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

export default class FollowingScreen extends React.Component {
  constructor(props){
    super(props);
    this.userId = this.props.route.params.id

  }

  static route = {
    navigationBar: {
      title: "Dogs You Follow"
    },
  };

  componentDidMount(){
    firebaseApp.database().ref(`/followUserToDog/${this.userId}`).once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot);
          })
        })
    }

  render(){
    return (
      <View></View>
    )

  }

}
