import React from 'react';
import { View, ScrollView, TouchableOpacity, Text,
StyleSheet, Image } from 'react-native';
import firebaseApp from '../api/firebaseApp';
import NewPlaytime from '../components/notifications/NewPlaytime';
import FollowRequest from '../components/notifications/FollowRequest';
import Colors from '../constants/Colors';

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
    const _this = this;

    noteRef.on('value', snapshot => {
      _notifs = [];
      snapshot.forEach(notif => {

        if (notif.val().status === "UNSEEN") {
          _notifs.push(notif.val());
          _notifs[_notifs.length - 1].id = notif.key;
        }

      });
      _this.setState({
        notifications: _notifs,
        loading: false
      });
    });

    noteRef.on('child_removed', snapshot => {
      _this.state.notifications.forEach((notif, idx) => {
        if(notif.id === snapshot.key) {
          _this.state.notifications.splice(idx, 1);
          this.setState({notifications: _this.state.notifications});
        }
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
        <View style={styles.noNew}>
          <Text style={styles.noNewText}>No new notifications!</Text>
        </View>
      );
    }
  }

  renderNotifications() {
    if(this.state.notifications.length > 0) {
      return(
        <View style={styles.main}>
        <ScrollView>
          {this.state.notifications.map((notif, idx) => {
            if(notif.type === 'NEW_PLAYTIME') {
              return(
                <NewPlaytime
                  key={`playtime${idx}`}
                  notif={notif} />
              );
            } else {
              return(
                <FollowRequest
                  key={`follow${idx}`}
                  notif={notif} />
              );
            }
          })}
        </ScrollView>

        </View>
      );

    } else {
      return(
        <View style={styles.noNew}>
          <Text style={styles.noNewText}>No new notifications!</Text>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  noNew: {
    height: 50,
    alignSelf: "stretch",
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
  noNewText: {
    marginTop: 5,
    fontSize: 26,
    alignItems: 'center',
    color: Colors.white,
  },
  main: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})
// <View style={{marginTop: 5}}><Text style={{color: 'gray', textAlign: 'center'}}>Swipe right to approve and left to deny</Text></View>
