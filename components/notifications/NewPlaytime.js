import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';
import firebaseApp from '../../api/firebaseApp';
import Colors from '../../constants/Colors';
import Swipeout from 'react-native-swipeout';

export default class NewPlaytime extends React.Component {

  render() {
    var approveBtns = [
      {
        text: 'Ok',
        backgroundColor: Colors.tabIconDefault,
        onPress: this._resolveRequest.bind(this)
      }
    ]
    return(
      <Swipeout right={approveBtns}>
        <View style={styles.notifications}>
          <View style={styles.part2}>
            <Image source={require('../../assets/icons/003-dog-walker.png')} style={{width: 35, height: 35}}/>
          </View>
          <View style={styles.part1}>
            <Text style={styles.notificationsText}>{`${this.props.notif.dog.dogName} is going to ${this.props.notif.park.name}`}</Text>
          </View>
        </View>
    </Swipeout>
    );
  }

  _resolveRequest() {
    const currUID = firebaseApp.auth().currentUser.uid;
    const notif = this.props.notif;
    firebaseApp.database().ref(`users/${currUID}/notifications/${notif.id}/status`).set("SEEN");
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
  },
  notifications: {
    height: 70,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: "stretch",
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRightWidth: 5,
    borderRightColor: Colors.tabIconDefault,
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  part1: {
    flex: 4,
  },
  part2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

  },
  notificationsText: {
    fontSize: 16,
    color: Colors.black,
  }
})
