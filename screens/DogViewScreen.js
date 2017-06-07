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

export default class DogViewScreen extends React.Component {
  constructor(props){
    super(props)

  }
  static route = {
    navigationBar: {
      title: 'DogView',
    },
  };

  componentDidMount(){
    firebaseApp.database().ref("/dogs/"+this.props.route.params.id).once('value').then(function(snapshot) {
      console.log(snapshot);
    })

  }


  render() {
    return(
      <View style={styles.container}>
        <Text>Hey</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
});
