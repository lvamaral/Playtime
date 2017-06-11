import Expo from 'expo';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Permissions, Notifications } from 'expo';

import LoginScreen from './screens/LoginScreen';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import { StackNavigation, NavigationProvider } from '@expo/ex-navigation';
import Router from './navigation/Router';
import Colors from './constants/Colors';

class AppContainer extends React.Component {
  state = {
    appIsReady: false
  };

  componentWillMount() {
    this._registerForPushNotificationsAsync();
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require('./assets/images/expo-wordmark.png')],
        fonts: [
          FontAwesome.font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  async _registerForPushNotificationsAsync() {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    // status = 'granted';
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
      body: JSON.stringify({
        token: {
          value: token,
        },
      }),
    });

  };

  doso(){

  }

  render() {

    if (this.state.appIsReady) {

      return (
        <NavigationProvider router={Router}>
          <StackNavigation
            id="root"
            defaultRouteConfig={{
            navigationBar: {
              renderRight: <Button title="hello" onPress={this.doso}></Button>

            }
            }}
            initialRoute={Router.getRoute('login')}
          />
        </NavigationProvider>
      )
    } else {
      return <Expo.AppLoading />;
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Expo.registerRootComponent(AppContainer);
