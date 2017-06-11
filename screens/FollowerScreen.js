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


export default class FollowerScreen extends React.Component {
  constructor(props){
    super(props);
    this.userId = this.props.route.params.id;
    this.yourDogs = Object.keys(this.props.route.params.dogs);
    this.state = {dogs: []}
  }

  static route = {
    navigationBar: {
      title: "Followers"
    },
  };

  componentDidMount() {
    var _this = this
    this.yourDogs.forEach( (dog) => {
      firebaseApp.database().ref(`/followDogToUser/${dog}`).once('value').then(function(snapshot){
        if (snapshot.val() !== null) {
          let newState = []
          snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.val().status === 'APPROVED') {
              childSnapshot.child('dogs').forEach(function(childSnapshot2){
                let childKey = childSnapshot2.key;
                let childData = childSnapshot2.val();
                let newDog = childData
                newDog.id = childKey
                newState.push(newDog)
                _this.setState({dogs: newState})
              });
            }
          })
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
