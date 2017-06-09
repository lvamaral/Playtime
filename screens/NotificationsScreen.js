import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import firebaseApp from '../api/firebaseApp';


export default class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
    this.renderNotifications = this.renderNotifications.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Notifications'
    }
  }

  componentWillMount() {
    const currUID = firebaseApp.auth().currentUser.uid
    const noteRef = firebaseApp.database().ref(`users/${currUID}/notifications`);
    _this = this;

    noteRef.on('child_added', snapshot => {
      debugger
      _this.state.notifications.push(snapshot.val());
      _this.state.notifications[_this.state.notifications.length - 1].id = snapshot.key;
      _this.setState({notifications: _this.state.notifications});
    });
  }

  render() {
    return(
      <View>
        <ScrollView>
          { this.renderNotifications() }
        </ScrollView>
      </View>
    );
  }

  renderNotifications() {
    if(this.state.notifications.length > 0) {
      // debugger

      // return(
      //   {this.state.notifications.map(notif => (
      //     <Text>{notif.dog.dogName} is going to {notif.park.parkName}</Text>
      //   ))}
      // );
    } else {
      return(
        <Text>No notifications!</Text>
      )
    }
  }
}
