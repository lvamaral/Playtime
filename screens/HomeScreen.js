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
import firebaseApp from '../api/firebaseApp';
import HomePlaytime from '../components/notifications/HomePlaytime';
import RootNavigation from '../navigation/RootNavigation';

export default class HomeScreen extends React.Component {
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
      title: 'Playtime'
    },
  };

  componentWillMount() {
    const currUID = firebaseApp.auth().currentUser.uid
    const noteRef = firebaseApp.database().ref(`users/${currUID}/notifications`);
    _this = this;

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

  renderNotifications() {
    if(this.state.notifications.length > 0) {
      return(
        <View style={styles.main}>
        <ScrollView>
          {this.state.notifications.map((notif, idx) => {
            if(notif.type === 'NEW_PLAYTIME') {
              return(
                <HomePlaytime
                  key={`playtime${idx}`}
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

        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._goToPlaytime.bind(this)}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/icons/002-dog-and-doggie.png')}
              style={styles.welcomeImage}
            />
          <View style={styles.getStartedContainer}>

              <Text style={styles.getStartedText}>
                It's Playtime!
              </Text>

          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.upcoming}><Text style={styles.upcomingText}>Upcoming Playtimes:</Text></View>
        <ScrollView style={styles.container}>
            { this.renderNotifications() }
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
    // borderBottomWidth: 5,
    // borderTopWidth: 5,
    // borderColor: Colors.white,
    backgroundColor: Colors.orange,
  },
  welcomeImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedText: {
    fontSize: 20,
    fontWeight: "800",
    color: 'black',
    lineHeight: 23,
    textAlign: 'center',
  },
  upcoming: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    height: 50,
    borderBottomWidth: 1,
    borderColor: Colors.white,
  },
  upcomingText: {
    fontSize: 18,
    color: Colors.white,
  }

});
