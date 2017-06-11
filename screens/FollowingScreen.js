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
import DogsIndex from '../components/dogs/DogsIndex';
import Colors from '../constants/Colors';

export default class FollowingScreen extends React.Component {
  constructor(props){
    super(props);
    this.userId = this.props.route.params.id;
    this.state = {dogs: []};

  }



  static route = {
    navigationBar: {
      title: "Dogs You Follow"
    },
  };

  componentDidMount(){
    let dogs = [];
    let _this = this;
    firebaseApp.database().ref(`/followUserToDog/${this.userId}`).once('value').then(function(snapshot){
      let newState = _this.state
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val().status==='APPROVED') {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val().dog;
          let newDog = childData
          newDog.id = childKey
          newState.dogs.push(newDog)
          _this.setState(newState)
        }
      })
    })
  }

  render(){
    let dogIndex = (<View style={styles.noDogContainer}><Text style={styles.noDog}>No dogs yet!</Text></View>)
    if (this.state.dogs.length !== 0) {
      dogIndex = (
         <DogsIndex
          dogs={this.state.dogs}
          navigator={this.props.navigator} />
      )
    }

    return (
      <View style={styles.container}>
        {dogIndex}
      </View>
    )

  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  noDog: {
    textAlign: 'center',
    color: Colors.tabIconDefault,
    fontSize: 20,
  },
  noDogContainer: {
    paddingVertical: 20,
  }
});
