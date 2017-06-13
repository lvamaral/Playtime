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
import {
  LinearGradient
} from 'expo';
import { FontAwesome} from '@expo/vector-icons';

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
      title: 'Dashboard'
    },
  };

  componentWillMount() {
    const currUID = firebaseApp.auth().currentUser.uid
    const noteRef = firebaseApp.database().ref(`users/${currUID}/notifications`);
    _this = this;

    noteRef.orderByChild('height').on('value', snapshot => {
      _notifs = [];
      snapshot.forEach(notif => {

        if (notif.val().status === "UNSEEN") {
          _notifs.push(notif.val());
          _notifs[_notifs.length - 1].id = notif.key;
        }

      });
      _notifs = _notifs.filter(notif => notif.type === 'NEW_PLAYTIME');
      _notifs = _notifs.filter(notif => {
        debugger
        let date = new Date();
        if(date.getHours() > notif.date.slice(0, 2)) {
          if(date.getHours() - notif.date.slice(0, 2) === 1) {
            if(date.getMinutes() < 15 && notif.date.slice(3, 5) > 45) {
              return true;
            }
          }
          return false;
        } else if(date.getHours() < notif.date.slice(0, 2)){
          return true;
        } else {
          if(date.getMinutes() - 15 > notif.date.slice(3, 5)) {
            return false;
          } else {
            return true;
          }
        }
      })
      _notifs = _notifs.sort((a,b) => {
        if(a.date.slice(0, 2) > b.date.slice(0, 2)) {
          return -1;
        } else if(a.date.slice(0, 2) < b.date.slice(0, 2)) {
          return 1;
        } else {
          if(a.date.slice(3, 5) > b.date.slice(3, 5)) {
            return -1;
          } else if(a.date.slice(3, 5) <= b.date.slice(3, 5)) {
            return 1;
          }
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
          <Text style={styles.noNewText}>No upcoming playtimes</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <TouchableOpacity onPress={this._goToPlaytime.bind(this)} style={{alignSelf: 'stretch'}}>
          <View style={styles.inner}>
            <FontAwesome
            style={styles.menu}
            name={"paw"}
            size={80}
            color={Colors.white}
            />

            <View style={styles.getStartedTextBox}>
                <Text style={styles.getStartedText}>
                  Going Out?
                </Text>
              </View>
          </View>
          </TouchableOpacity>

      </View>


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
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    height: 200,

  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    height: 150,
    alignSelf: 'stretch',
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: {
      width: -5,
      height: 5
    },
    shadowOpacity: .8,
    shadowRadius: 5,
    elevation: 1,
    borderRadius: 10,
  },
  welcomeImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 18,
    marginBottom: 2,
  },
  getStartedText: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.white,
    lineHeight: 23,
    textAlign: 'center',
  },
  getStartedTextBox: {
    marginTop: 10,
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
    fontSize: 20,
    color: Colors.white,
  },
  noNewText: {
    textAlign: 'center',
    color: Colors.tabIconDefault,
    marginTop: 20,
    fontSize: 20
  }

});

// <Image
//   source={require('../assets/icons/002-dog-and-doggie.png')}
//   style={styles.welcomeImage}
// />
// <FontAwesome
// style={styles.menu}
// name={"paw"}
// size={64}
// color={Colors.white}
// />
