import React from 'react';
import { StyleSheet, View, Platform, Alert } from 'react-native';
import { Notifications, Permissions } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation, Entypo } from '@expo/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import { sendPush } from '../api/push_handler';

export default class RootNavigation extends React.Component {
  state = {
    notifications: []
  }


  componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillMount() {
    this._registerForPushNotificationsAsync();

    this._sendPush('Welcome to playtime!');

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _sendPush(message) {
    const uid = firebaseApp.auth().currentUser.uid;
    sendPush(message, uid);
  }

  _handleNotification = ({origin, data}) => {

    this.setState({notification: notification});
    // this.props.navigator.showLocalAlert(
    //   `${JSON.stringify(data).a}`,
    //   Alerts.notice
    // );
  };

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }
  static route = {
    navigationBar: {
      visible: false,
    }
  };

  async _registerForPushNotificationsAsync() {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    status = 'granted';
    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExponentPushTokenAsync();

    // POST the token to our backend so we can use it to send pushes from there
    const currUserId = firebaseApp.auth().currentUser.uid;

    firebaseApp.database().ref(`users/${currUserId}/pushToken`).set({
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        token: {
          value: token
        }
      }
    });
  };

  render() {
    return (
      <TabNavigation tabBarHeight={50} initialTab="home">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('home', 'foundation', isSelected, 34)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="parks"
          renderIcon={isSelected => this._renderIcon('trees', 'foundation', isSelected, 33)}>
          <StackNavigation initialRoute="parks" />
        </TabNavigationItem>

        <TabNavigationItem
          id="notificationsView"
          renderIcon={isSelected => this._renderIcon('bell', 'entypo', isSelected, 31)}>
          <StackNavigation initialRoute="notificationsView" />
        </TabNavigationItem>

        <TabNavigationItem
          id="user"
          renderIcon={isSelected => this._renderIcon('baidu', 'entypo', isSelected, 31)}>
          <StackNavigation initialRoute="user" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, type, isSelected, size) {
    return (type === 'foundation') ? (
      <Foundation
        name={name}
        size={size || 32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    ) : (
      <Entypo
        name={name}
        size={size || 30}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    )
  }

  // _registerForPushNotifications() {
  //   // Send our push token over to our backend so we can receive notifications
  //   // You can comment the following line out if you want to stop receiving
  //   // a notification every time you open the app. Check out the source
  //   // for this function in api/registerForPushNotificationsAsync.js
  //   registerForPushNotificationsAsync();
  //
  //   // Watch for incoming notifications
  //   this._notificationSubscription = Notifications.addListener(
  //     this._handleNotification
  //   );
  // }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
