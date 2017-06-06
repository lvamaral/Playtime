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
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Hi, {this.user.displayName}</Text>
        <Text>Can you see this?</Text>
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
