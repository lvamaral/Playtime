import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
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

export default class RootNavigation extends React.Component {

  componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillMount() {
    this._registerForPushNotificationsAsync();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

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
          value: token.slice(0, token.length - 1).split('[')[1]
        }
      }
    });

  };

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="parks">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('home', 'foundation', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="parks"
          renderIcon={isSelected => this._renderIcon('trees', 'foundation', isSelected)}>
          <StackNavigation initialRoute="parks" />
        </TabNavigationItem>

        <TabNavigationItem
          id="notificationsView"
          renderIcon={isSelected => this._renderIcon('bell', 'entypo', isSelected)}>
          <StackNavigation initialRoute="notificationsView" />
        </TabNavigationItem>

        <TabNavigationItem
          id="user"
          renderIcon={isSelected => this._renderIcon('baidu', 'entypo', isSelected)}>
          <StackNavigation initialRoute="user" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, type, isSelected) {
    return (type === 'foundation') ? (
      <Foundation
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    ) : (
      <Entypo
        name={name}
        size={32}
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
