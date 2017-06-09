import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import firebaseApp from '../api/firebaseApp';
import NewPlaytime from '../components/notifications/NewPlaytime';
import FollowRequest from '../components/notifications/FollowRequest';

export default class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      loading: true
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

    noteRef.on('value', snapshot => {
      _notifs = [];
      snapshot.forEach(notif => {
        _notifs.push(notif.val());
        _notifs[_notifs.length - 1].id = notif.key;
      });
      _this.setState({
        notifications: _notifs,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading === false) {
      return(
        <View>
          { this.renderNotifications() }
        </View>
      );
    } else {
      return(
        <View>
        </View>
      );
    }
  }

  renderNotifications() {
    if(this.state.notifications.length > 0) {
      return(
        <ScrollView>
          {this.state.notifications.map((notif, idx) => {
            if(notif.type === 'NEW_PLAYTIME') {
              return(
                <NewPlaytime
                  key={`notif${idx}`}
                  notif={notif} />
              );
            } else {
              return(
                <FollowRequest
                  key={`notif${idx}`}
                  notif={notif} />
              );
            }
          })}
        </ScrollView>
      );

    } else {
      return(
        <Text>No notifications!</Text>
      )
    }
  }
}
