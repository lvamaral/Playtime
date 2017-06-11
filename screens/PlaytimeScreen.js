import React from 'react';
import { View, Text, TouchableOpacity,
Picker, ScrollView, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebaseApp from '../api/firebaseApp';
import Colors from '../constants/Colors';
import { StackNavigation, NavigationProvider } from '@expo/ex-navigation';
import { sendPush } from '../api/push_handler';
import Expo from 'expo';

export default class PlaytimeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePickerVisible: false,
      datePickerVisible: false,
      date: new Date(),
      parks: [],
      dogs: [],
      pickerVisible: false
    }
    this._handleCheck = this._handleCheck.bind(this);
    this._handleNotifications = this._handleNotifications.bind(this);
    this._createPlaytime = this._createPlaytime.bind(this);
    this._postNotification = this._postNotification.bind(this);
    this.togglePicker = this.togglePicker.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'New Playtime!'
    },
  };

  componentWillMount() {
    _this = this;
    const uid = firebaseApp.auth().currentUser.uid;
    const userRef = firebaseApp.database().ref(`/users/${uid}`);
    userRef.once('value', snapshot => {
      const user = snapshot.val();
      user.id = snapshot.key;
      if (user.parks) {
        var dogList = [];
        Object.keys(user.dogs).forEach(key => {
          let dog = user.dogs[key];
          dog.id = key;
          dog.checked = true;
          dogList.push(dog);
        });
        var parkList = [];
        Object.keys(user.parks).forEach(key => {
          let park = user.parks[key];
          park.id = key;
          parkList.push(park);
        });
        _this.setState({
          user: user,
          parks: parkList,
          dogs: dogList,
          park: parkList[0]
        });
      } else {
        _this.setState({user: user});
      }
    });
  }

  _showPicker() {
    let that = this;
    if(this.state.parks.length > 1) {
      if(!that.state.pickerVisible) {
        return(
          <View style={styles.label2}>
            <Text
              onPress={that.togglePicker}
              style={styles.labelText2}>Head to a different park</Text>
          </View>
        );
      } else {
        return(
          <View>
            <Picker
              selectedValue={that.state.park}
              onValueChange={(itemValue, itemIndex) => that.setState({park: itemValue})}
              >
              { that.state.parks.map(park => (
                <Picker.Item
                  key={`park${park.id}`}
                  label={`${park.name}`}
                  value={`${park.id}`} />
              ))}
            </Picker>
          </View>
        );
      }
    } else {
      return(
        <View></View>
      )
    }
  }

  _handleCheck(checked, id) {
    for(let i = 0; i < this.state.dogs.length; i++) {
      if(id === this.state.dogs[i].id) {
        let atLeastOneChecked = false;
        this.state.dogs[i].checked = !this.state.dogs[i].checked;
        for(let j = 0; j < this.state.dogs.length; j++) {
          if(this.state.dogs[j].checked) {
            atLeastOneChecked = true;
          }
        }
        if(atLeastOneChecked) {
          this.setState({dogs: this.state.dogs});
        } else {
          // rollback
          this.state.dogs[i].checked = !this.state.dogs[i].checked;
        }
      }
    }
  }

  togglePicker() {
    this.setState({pickerVisible: !this.state.pickerVisible});
  }


  _updateDateTime(date) {
    this.setState({
      timePickerVisible: false,
      datePickerVisible: false,
      date: date
    });
    console.log(date);
  }

  _showTimePicker() {
    this.setState({timePickerVisible: true});
  }

  _showDatePicker() {
    this.setState({datePickerVisible: true});
  }

  _hideTimePicker() {
    this.setState({timePickerVisible: false});
  }

  _hideDatePicker() {
    this.setState({datePickerVisible: false});
  }

  _createPlaytime() {
    const playRef = firebaseApp.database().ref('/playtimes').push();

    playRef.set({
      date: this.state.date,
      park: this.state.park,
      user: this.state.dogs[0].ownerId
    });

    let dog;
    for(let i = 0; i < this.state.dogs.length; i++ ) {
      dog = this.state.dogs[i];
      if(dog.checked) {
        playRef.child(`dogs/${dog.id}`).set({
          dogName: dog.dogName
        });
      }
    }

    this._handleNotifications();
    this.props.navigator.push('home')
  }

  _handleNotifications() {
    _this = this;
    this.state.dogs.forEach(dog => {
      _dog = dog;
      firebaseApp.database().ref(`/followDogToUser/${dog.id}`).once('value')
        .then(snapshot => {
        snapshot.forEach(childSnap => {
          if(childSnap.val().status === 'APPROVED') {
            let userRef = firebaseApp.database().ref(`/users/${childSnap.key}`);
            userRef.once('value').then(snap => {
              if(snap.val().parks !== undefined) {
                snap.child('parks').forEach(park => {
                  if(park.key === _this.state.park.id) {
                    _this._postNotification(snap.key, park, _dog);
                  }
                });
              }
            });
          }
        });
      });
    });
  }

  _postNotification(uid, parkSnap, dog) {
    let park = parkSnap.val();
    park.id = parkSnap.key;
    firebaseApp.database().ref(`users/${uid}/notifications`).push().set({
      dog: dog,
      park: park,
      type: 'NEW_PLAYTIME',
      status: 'UNSEEN'
    });
    sendPush(
      `${dog.dogName} is going to ${park.name}!`,
      uid
    )
  }

  render() {
    let _this = this;
    // user has dogs and has parks
    if(this.state.user !== undefined && this.state.parks.length > 0) {

      return(
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.headerLabel}
              >Heading to {this.state.park.name} right now?</Text>
          </View>

          <View style={styles.labelLast}>
            <TouchableOpacity onPress={this._createPlaytime}>
              <Text style={styles.labellastText}>Confirm</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerTime}>
            <TouchableOpacity style={{paddingTop: 0}}
              onPress={this._showTimePicker.bind(this)}>
              <Text style={styles.containerTimeText}>{`Schedule for a different time`}</Text>
            </TouchableOpacity>
          </View>

          {_this._showPicker()}

          <DateTimePicker
            isVisible={this.state.timePickerVisible}
            onConfirm={this._updateDateTime.bind(this)}
            mode={'time'}
            onCancel={this._hideTimePicker.bind(this)}
            titleIOS={'Select time'}
            />
        </View>


      );

    }
    // user has dogs but follows no parks
    else if(this.state.user !== undefined) {
      return(
        <View>
          <TouchableOpacity style={{paddingTop: 0}}
            onPress={this.props.closeModal}>
            <Text>Click to exit</Text>
          </TouchableOpacity>

          <Text>
            Join some parks!
          </Text>
        </View>
      )
    }

  // user has not created a dog
    else {
      return(
        <View>
          <Expo.AppLoading />
        </View>
      )
    }
  }

}


const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  containerTime: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTimeText: {
    fontSize: 24,
    color: 'black',
  },
  containerCheck: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    paddingTop: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue
  },
  headerLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  label2: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
  },
  labelText2: {
    fontSize: 30,
    color: Colors.white,
  },
  labelText: {
    fontSize: 25,
    color: Colors.white,
  },
  labelLast: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'stretch',
    backgroundColor: Colors.orange,
    height: 60,
  },
  labellastText: {
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
  }
})
