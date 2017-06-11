import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import firebaseApp from '../../api/firebaseApp';
import Colors from '../../constants/Colors';
import Swipeout from 'react-native-swipeout';

export default class FollowRequest extends React.Component {
  state = {
    loading: true,
    dogs: []
  }

  componentWillMount() {
    _that = this;
    const notif = this.props.notif;
    firebaseApp.database().ref(`/followDogToUser/${notif.dog.id}/${notif.user}`)
      .once('value').then(snapshot => {
        _dogs = [];
        snapshot.child('dogs').forEach(dog => {
          _dogs.push(dog.val().dogName);
        });
        _that.setState({dogs: _dogs, loading: false});
      });
  }

  render() {
    var approveBtns = [
      {
        text: 'Approve',
        backgroundColor: Colors.green,
        onPress: this._approveRequest.bind(this)
      }
    ]
    var denyBtns = [
      {
        text: 'Deny',
        backgroundColor: 'red',
        onPress: this._denyRequest.bind(this)
      }
    ]




    if(this.state.loading) {
      return(
        <View></View>
      )
    } else {
      let text = ''
      if(this.state.dogs.length === 1) {
        text = this.state.dogs[0];
        text += ' wants'
      }
      else if(this.state.dogs.length === 2) {
        text = this.state.dogs.join(' and ');
        text += ' want'
      } else {
        text = this.state.dogs.slice(0, this.state.dogs.length - 1).join(', ');
        text += ` and ${this.state.dogs[this.state.dogs.length - 1]} want`;
      }

      return(

        <Swipeout  left={denyBtns} right={approveBtns}>
          <View style={styles.notifications}>
            <View style={styles.part2}>
              <Image source={require('../../assets/icons/couple-of-dogs.png')} style={{width: 35, height: 35}}/>
            </View>
            <View style={styles.part1}>
              <Text style={styles.notificationText}>{`${text} to follow ${this.props.notif.dog.name}`}</Text>
            </View>
          </View>
        </Swipeout>

      );
    }
  }

  _approveRequest() {
    const notif = this.props.notif;
    const currUser = firebaseApp.auth().currentUser.uid;
    firebaseApp.database().ref(`/followDogToUser/${notif.dog.id}/${notif.user}`)
      .update({status: 'APPROVED'});
    firebaseApp.database().ref(`/followUserToDog/${notif.user}/${notif.dog.id}`)
      .update({status: 'APPROVED'});
    firebaseApp.database().ref(`/users/${currUser}/notifications/${notif.id}`).remove();
  }

  _denyRequest() {
    const notif = this.props.notif;
    const currUser = firebaseApp.auth().currentUser.uid;
    firebaseApp.database().ref(`/followDogToUser/${notif.dog.id}/${notif.user}`).remove();
    firebaseApp.database().ref(`/followUserToDog/${notif.user}/${notif.dog.id}`).remove();
    firebaseApp.database().ref(`/users/${currUser}/notifications/${notif.id}`).remove();
  }
}



const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
  },
  notifications: {
    borderLeftWidth: 5,
    borderLeftColor: 'red',
    borderRightWidth: 5,
    borderRightColor: Colors.green,
    height: 70,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: "stretch",
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  part1: {
    flex: 4,
  },
  part2: {
    flex: 1,

  },
  notificationText: {
    fontSize: 16,
    color: Colors.white,
  }
})
