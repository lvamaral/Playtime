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
import Styles from '../assets/stylesheets/pageLayout';
import Colors from '../constants/Colors';

export default class UserScreen extends React.Component {
  constructor(props){
    super(props);
    this.user = firebase.auth().currentUser;
    this.firstName = this.user.displayName.split(" ")[0]
    this.state = {dogList: {}, following: {}, followers: {}}
  }

  static route = {
    navigationBar: {
      title: "Your Profile",
    },
  };

  componentDidMount(){
    if (this.user) {
      this.getDogList();
    }
  }

  getDogList(){
    let _this = this
    firebaseApp.database().ref(`/users/${this.user.uid}/dogs`).once('value').then(function(snapshot) {
      let newState = _this.state
      snapshot.forEach(function(childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        newState.dogList[childKey] = childData

        });
        _this.setState(newState)

    });
  }

  goTo(id, name) {
    this.props.navigator.push('dogView', {id: id, name: name});
  }

  goToFollowing(user_id){
    this.props.navigator.push('followingView', {id: user_id, name: this.firstName});
  }

  goToFollowers(user_id){
    this.props.navigator.push('followerView', {id: user_id, name: this.firstName, dogs: this.state.dogList});
  }

  render(){
    if (!isEqual(this.state.dogList, {})) {
      let ids = Object.keys(this.state.dogList)
      let dogs = Object.values(this.state.dogList)
      var list =
      dogs.map( (dog, i) => {
        return (
        <TouchableHighlight key={ids[i]} onPress={ () => this.goTo(ids[i], dog.dogName)}>
          <View style={styles.dogsList}>
            <View style={styles.dogsListItem}>
              <View style={styles.container}><Image source={{ uri: dog.image}} style={{ width: 100, height: 100, borderRadius: 50, }}/></View>
              <View style={styles.container}><Text style={styles.text}>{dog.dogName}</Text></View>
            </View>
          </View>
       </TouchableHighlight>
      )}
      )
    }

    return(
      <View style={styles.mainContainer}>
        <View style={styles.following}>
          <Button title="Following" color={Colors.white} onPress={() => this.goToFollowing(this.user.uid)}></Button>
          <Text style={styles.followingText}>|</Text>
          <Button title="Followers" color={Colors.white} onPress={() => this.goToFollowers(this.user.uid)}></Button>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Hi, {this.firstName}!</Text>
        </View>
        <View style={{ alignItems: 'center', alignSelf: 'stretch', height: 400}}>
          <ScrollView style={{alignSelf: 'stretch'}}>{list}</ScrollView>
        </View>

      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
    text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  dogsList: {
    flex: 4,
    display: 'flex',
    flexDirection: 'row',

  },
  dogsListItem: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 0.5,
    borderColor: '#d6d7da',
    // backgroundColor: Colors.white,
  },

  following: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: Colors.orange,
    alignSelf: 'stretch',
  },
  followingText: {
    fontSize: 25,
    color: Colors.white
  }



});
