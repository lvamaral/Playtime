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
    this.user = firebase.auth().currentUser
  }
  static route = {
    navigationBar: {
      title(params) {
        return params.name
      }
    },
  };

  componentDidMount(){
    let _this = this
    firebaseApp.database().ref("/dogs/"+this.props.route.params.id).once('value').then(function(snapshot) {
      var name = snapshot.val().dogName;
      var id = snapshot.key
      var age = snapshot.val().age
      var breed = snapshot.val().breed
      var image = snapshot.val().image
      var owner = snapshot.val().ownerName
      var ownerId = snapshot.val().ownerId
      _this.setState({id: id, dogName: name, age: age, breed: breed, image: image, owner: owner, ownerId: ownerId, follow: ""})
      _this.checkFollow();
    })
  }

  checkFollow(){
     let _this = this
     var owned = false
     if (_this.state.ownerId === this.user.uid) {
       owned = true
     } else {
       owned = false
     }
     firebaseApp.database().ref(`/followDogToUser/${_this.state.id}/${_this.user.uid}`)
     .once('value', function(snapshot) {
       if (snapshot.val() === null && !owned) {
         let newState = _this.state;
         newState.follow = false;
         _this.setState(newState)
       } else if (snapshot.val() !== null) {
         let newState = _this.state;
         newState.follow = snapshot.val().status === 'PENDING' ? 'PENDING' : 'APPROVED';
         _this.setState(newState)
       }
     })
  }

  handleFollow(){
    let _this = this
    firebaseApp.database().ref(`/followUserToDog/${_this.user.uid}/${_this.state.id}`).set({
    dogName: _this.state.dogName, age: _this.state.age, breed: _this.state.breed,
    image: _this.state.image, ownerName: _this.state.owner});
    var userDogs = [];
    firebaseApp.database().ref(`/users/${_this.user.uid}/dogs`).once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        // userDogs.push(childSnapshot.val())
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        firebaseApp.database().ref(`/followDogToUser/${_this.state.id}/${_this.user.uid}/${childKey}`).set({
          dog: childData,
          status: 'PENDING'
        });
      });
    });
    firebaseApp.database().ref(`/users/${_this.state.ownerId}/notifications`).push().set({
      user: firebaseApp.auth().currentUser.uid,
      dog: {
        dogName: _this.state.dogName,
        id: _this.state.id,
        type: 'follow_request'
      }
    });
    let newState = _this.state;
    newState.follow = 'PENDING';
    _this.setState(newState);
  }

  handleUnfollow(){
  let _this = this;
  firebaseApp.database().ref(`/followUserToDog/${_this.user.uid}/${_this.state.id}`).remove().then(function(){
    firebaseApp.database().ref(`/followDogToUser/${_this.state.id}/${_this.user.uid}`).remove().then(function(){
      let newState = _this.state;
      newState.follow = false;
      _this.setState(newState);
        })
      }
    )
  }

  doNothing() {
    return;
  }

  render() {
    let followComponent = (<Text></Text>)

    if (this.state.follow === 'APPROVED') {
      followComponent = (<Button title="Unfollow" color="#841584" onPress={this.handleUnfollow.bind(this)}></Button>)
    } else if (this.state.follow === 'PENDING') {
      followComponent = (<Button title="Follow Pending" color="#841584" disabled={true} onPress={this.doNothing.bind(this)}></Button>)
    } else if (this.state.ownerId !== firebaseApp.auth().currentUser.uid){
      followComponent = (<Button title="Follow" color="#841584" onPress={this.handleFollow.bind(this)}></Button>)
    }

    return(
      <View style={styles.container}>
        <View><Image source={{ uri: this.state.image}} style={{ width: 200, height: 200 }} /></View>
        <View><Text>{`Owner: ${this.state.owner}`}</Text></View>
        <View><Text>{`Breed: ${this.state.breed}`}</Text></View>
        <View><Text>{`Age: ${this.state.age}`}</Text></View>
        <View>{followComponent}</View>
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
