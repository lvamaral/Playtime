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

  render() {

    if (this.state.appIsReady) {
      return (
        <NavigationProvider router={Router}>
          <StackNavigation
            id="root"
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
