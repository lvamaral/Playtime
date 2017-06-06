import Expo from 'expo';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import * as firebase from 'firebase';
import { StackNavigation, NavigationProvider } from '@expo/ex-navigation';
import Router from './navigation/Router';
import secrets from './secrets';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
    loggedIn: false
  };

  componentWillMount() {
    var config = {
      apiKey: secrets.apiKey,
      authDomain: secrets.apiKey,
      databaseURL: secrets.databaseURL,
      projectId: secrets.projectId,
      storageBucket: secrets.storageBucket,
      messagingSenderId: secrets.messagingSenderId
    };
    firebase.initializeApp(config);

    const that = this;

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
        that.setState({loggedIn: true});
      } else if (user == null) {
        that.setState({loggedIn: false});
      }
    });

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
      if (this.state.loggedIn) {
        return (
          <NavigationProvider router={Router}>
            <StackNavigation
              id="root"
              initialRoute={Router.getRoute('user')}
            />
          </NavigationProvider>
        )
      } else {
        return (
          <View style={styles.container}>
          <LoginScreen />

          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
          <View style={styles.statusBarUnderlay} />}
          </View>
        );
      }
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
