import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';
import firebaseApp from '../../api/firebaseApp';
import Colors from '../../constants/Colors';
import Swipeout from 'react-native-swipeout';
import { FontAwesome } from '@expo/vector-icons';

export default class NewPlaytime extends React.Component {
  render() {
    let text = '';
    if(this.props.notif.owner && this.props.notif.owner === 'SELF') {
      let notif = this.props.notif;
      if(notif.dogs.length === 1) {
        text = `${notif.dogs[0]}`;
      } else if(notif.dogs.length === 2) {
        text = `${notif.dogs[0]} and ${notif.dogs[1]}`;
      } else {
        text = `${notif.dogs.slice(0, notif.dogs.length - 2).join(', ')} and ${notif.dogs[notif.dogs.length - 1]}`
      }
    }

    var approveBtns = [
      {
        text: 'Ok',
        backgroundColor: Colors.tabIconDefault,
        onPress: this._resolveRequest.bind(this)
      }
    ]

    return(
        <View style={styles.notifications}>
          <View style={styles.part2}>
            <FontAwesome
              name={"clock-o"}
              size={35}
              color={Colors.orange}
            />
            <View>
              <Text>{this.props.notif.date}</Text>
            </View>
          </View>
          <View style={styles.part1}>
            <Text style={styles.notificationsText}>{ this.props.notif.owner === 'SELF' ? (
                `You're taking ${text} to ${this.props.notif.park.name}!`
              ) : (
                `${this.props.notif.dog.dogName} is going to ${this.props.notif.park.name}`
              )
            }</Text>
          </View>
        </View>
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
    borderBottomWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.white,
  },
  part1: {
    paddingLeft: 5,
    flex: 4,
  },
  part2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // padding: 5,
  },
  notificationsText: {
    fontSize: 16,
    color: Colors.black,
  }
})
