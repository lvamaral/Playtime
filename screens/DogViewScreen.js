import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView, TextInput,
  Button, Image, TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import { Permissions, Notifications } from 'expo';
const icon = require('../assets/icons/app-icon.png');
import { Foundation, Entypo } from '@expo/vector-icons';
import { sendPush } from '../api/push_handler';


export default class DogViewScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true
    };
    this.user = firebase.auth().currentUser
  }
  static route = {
    navigationBar: {
      title(params) {
        return params.name
      },

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
    _this.state.loading = false;
     firebaseApp.database().ref(`/followDogToUser/${_this.state.id}/${_this.user.uid}`)
     .once('value', function(snapshot) {
       if (snapshot.val() === null && !owned) {
         let newState = _this.state;
         newState.follow = false;
         newState.loading = false;
         _this.setState(newState)
       } else if (snapshot.val() !== null) {
         let newState = _this.state;
         newState.follow = snapshot.val().status === 'PENDING' ? 'PENDING' : 'APPROVED';
         newState.loading = false;
         _this.setState(newState);
       }
     });
  }

  handleFollow(){
    let _this = this
    firebaseApp.database().ref(`/followUserToDog/${_this.user.uid}/${_this.state.id}`).set({
      status: 'PENDING',
      dog: {
        dogName: _this.state.dogName,
        age: _this.state.age,
        breed: _this.state.breed,
        image: _this.state.image,
        ownerName: _this.state.owner
      }
    });

    let _followingDogs = [];
    firebaseApp.database().ref(`/users/${_this.user.uid}/dogs`).once('value').then(function(snapshot){
      firebaseApp.database().ref(`/followDogToUser/${_this.state.id}/${_this.user.uid}`).set({status: 'PENDING'});
      snapshot.forEach(function(childSnapshot) {
        // userDogs.push(childSnapshot.val())
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        _followingDogs.push(childData.dogName);
        firebaseApp.database().ref(`/followDogToUser/${_this.state.id}/${_this.user.uid}/dogs/${childKey}`).set(childData);
      });
      let dogNames;

      if(_followingDogs.length === 1) {
        dogNames = `${_followingDogs[0]} wants`;
      } else if(_followingDogs.length === 3) {
        dogNames = `${_followingDogs[0]} and ${_followingDogs[1]} want`;
      } else {
        dogNames = `${_followingDogs.slice(0, _followingDogs.length - 2).join(', ')} and ${_followingDogs[_followingDogs.length - 1]} want`
      }

      sendPush(
        `${dogNames} to follow ${_this.state.dogName}!`,
        _this.state.ownerId
      )
    });

    ref = firebaseApp.database().ref(`/users/${_this.state.ownerId}/notifications`).push();
    ref.set({
      user: firebaseApp.auth().currentUser.uid,
      type: 'FOLLOW_REQUEST',
      status: "UNSEEN",
      dog: {
        name: this.state.dogName,
        id: this.state.id
      }
    });

    // firebaseApp.database().ref(`/users/${firebaseApp.auth().currentUser.uid}`).once('value').then(snapshot => {
    //   snapshot.child('dogs').forEach(dog => {
    //     firebaseApp.database().ref(`/users/${_this.state.ownerId}/notifications`)
    //   });
    // });

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
    );
  }

  doNothing() {
    return;
  }

  render() {
    let followComponent = (<Text></Text>)

    if (this.state.follow === 'APPROVED') {
      followComponent = (
        <TouchableOpacity onPress={this.handleUnfollow.bind(this)} style={styles.follow}>
          <Foundation
            name={"no-dogs"}
            size={64}
            color={Colors.orange}
          />
        <Text style={styles.followText}>Unfollow</Text>
        </TouchableOpacity>
      )
    } else if (this.state.follow === 'PENDING') {
      followComponent = (
        <TouchableOpacity disabled={true} style={styles.follow}>
          <Image source={require('../assets/icons/004-couple-of-dogs.png')} style={{opacity: 0.5}}/>
          <Text style={styles.followText2}>Pending</Text>
        </TouchableOpacity>
      )
    } else if (this.state.ownerId !== firebaseApp.auth().currentUser.uid){
      followComponent = (
      <TouchableOpacity onPress={this.handleFollow.bind(this)} style={styles.follow}>
        <Image source={require('../assets/icons/orange7-animals.png')}/>
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
      )
    }
// if(this.state.loading === false)
   if(true) {

    return(
      <View style={styles.mainContainer}>
        <View><Image source={{ uri: this.state.image}} style={styles.dogImage} /></View>
        <View><Text style={styles.dogText}>{`Owner: ${this.state.owner}`}</Text></View>
        <View><Text style={styles.dogText}>{`Breed: ${this.state.breed}`}</Text></View>
        <View><Text style={styles.dogText}>{`Age: ${this.state.age}`}</Text></View>
        <View style={styles.container}>{followComponent}</View>
      </View>
      )
    } else {

      return(
        <View></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
  },
  dogImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 10,
  },
  dogText: {
    fontSize: 24,

  },
  follow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  followText: {
    color: Colors.orange,
    fontSize: 22,
  },
  followText2: {
    color: 'black',
    fontSize: 22,
    opacity: 0.5
  }
});
