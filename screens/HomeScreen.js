import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Colors from '../constants/Colors';

import RootNavigation from '../navigation/RootNavigation';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Playtime'
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._goToPlaytime.bind(this)}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/icons/orange2-dog-and-doggie.png')}
              style={styles.welcomeImage}
            />
          <View style={styles.getStartedContainer}>

              <Text style={styles.getStartedText}>
                {"It's Playtime!"}
              </Text>

          </View>
        </View>
      </TouchableOpacity>
        <ScrollView style={styles.container}>
          <View style={styles.upcoming}><Text style={styles.upcomingText}>Upcoming Playtimes:</Text></View>
        </ScrollView>
      </View>
    );
  }

  _goToPlaytime() {
    this.props.navigator.push('playtimeView');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderColor: Colors.orange,
  },
  welcomeImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedText: {
    fontSize: 17,
    color: Colors.orange,
    lineHeight: 23,
    textAlign: 'center',
  },
  upcoming: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    height: 50,
    borderBottomWidth: 1,
    borderColor: Colors.white,
  },
  upcomingText: {
    fontSize: 18,
    color: Colors.white,
  }

});
