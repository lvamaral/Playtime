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
    this.state = {}
  }
  static route = {
    navigationBar: {
      title(params) {
        return params.name
      }

    },
  };

  componentDidMount(){
    _this = this
    firebaseApp.database().ref("/dogs/"+this.props.route.params.id).once('value').then(function(snapshot) {
      var name = snapshot.val().dogName;
      var age = snapshot.val().age
      var breed = snapshot.val().breed
      var image = snapshot.val().image
      var owner = snapshot.val().ownerName
      _this.setState({name: name, age: age, breed: breed, image: image, owner: owner})
    })

  }


  render() {

    return(
      <View style={styles.container}>
        <View><Image source={{ uri: this.state.image}} style={{ width: 200, height: 200 }} /></View>
        <View><Text>{`Owner: ${this.state.owner}`}</Text></View>
        <View><Text>{`Breed: ${this.state.breed}`}</Text></View>
        <View><Text>{`Age: ${this.state.age}`}</Text></View>
        <View><Text>"Follow"</Text></View>
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
