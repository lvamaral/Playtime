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
    firebaseApp.database().ref(`/followDogToUser/`).on('value', then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {

      })
    }))



  }

  render(){
    return (
      <View></View>
    )
  }

}
