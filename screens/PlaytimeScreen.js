import React from 'react';
import { View, Text, TouchableOpacity,
Picker, ScrollView, StyleSheet, Image } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebaseApp from '../api/firebaseApp';
import Colors from '../constants/Colors';
import { StackNavigation, NavigationProvider } from '@expo/ex-navigation';
import { sendPush } from '../api/push_handler';
import Expo from 'expo';

export default class PlaytimeScreen extends React.Component {
  constructor(props) {
    super(props);
    let originalDate = this.parseDate(new Date())
    this.state = {
      timePickerVisible: false,
      datePickerVisible: false,
      date: originalDate,
      originalDate: originalDate,
      parks: [],
      dogs: [],
      pickerVisible: false,
      parkIndex: 0,
    }
    this._handleCheck = this._handleCheck.bind(this);
    this._handleNotifications = this._handleNotifications.bind(this);
    this._createPlaytime = this._createPlaytime.bind(this);
    this._postNotification = this._postNotification.bind(this);
    this.togglePicker = this.togglePicker.bind(this);

  }

  static route = {
    navigationBar: {
      title: 'New Playtime'
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
          <View style={styles.labelPark}>
            <Text
              onPress={that.togglePicker}
              style={styles.labelParkText}>Change park</Text>
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
                  value={park} />
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

  changePark(){

    console.log("PARKS", this.state.parks);
    let current_i = this.state.parkIndex
    if (current_i + 1 >= this.state.parks.length) {
      this.setState({park: this.state.parks[0]})
      this.setState({parkIndex: 0})
    } else {
        this.setState({park: this.state.parks[current_i + 1]})
        this.setState({parkIndex: current_i + 1})
    }
  }

  //FUTURE ADDITION: CHECKING DOGS
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

  parseDate(date){
    let minutes = date.getMinutes().toString()
    if (minutes.length < 2) {
      minutes = "0"+minutes
    }
    return `${date.getHours()}:${minutes}`

  }

  _updateDateTime(date) {
    let newDate = this.parseDate(date)
    this.setState({
      timePickerVisible: false,
      datePickerVisible: false,
      date: newDate,
    });

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
    this.props.navigator.popToTop();
  }

  _handleNotifications() {
    _this = this;
    _postNotif = this._postNotification;

    const dogNames = [];
    this.state.dogs.forEach(dog => {
      dogNames.push(dog.dogName);
    })

    firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/notifications`).push().set({
      dogs: dogNames,
      park: _this.state.park,
      type: 'NEW_PLAYTIME',
      status: 'UNSEEN',
      date: this.state.date,
      owner: 'SELF'
    });

    this.state.dogs.forEach(dog => {

      _dog = dog;
      firebaseApp.database().ref(`/followDogToUser/${dog.id}`).once('value').then(snapshot => {
        snapshot.forEach(childSnap => {
          if(childSnap.val().status === 'APPROVED') {
            let userRef = firebaseApp.database().ref(`/users/${childSnap.key}`);
            userRef.once('value').then(snap => {
              if(snap.val().parks !== undefined) {
                snap.child('parks').forEach(park => {
                  _postNotif(childSnap.key, park, _dog);
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
      status: 'UNSEEN',
      date: this.state.date,
      owner: "OTHER"
    });
    // sendPush(`${dog.dogName} is going to ${park.name}!`, uid);
  }

  renderDate() {
    if (this.state.date === this.state.originalDate) {
      return `right now`
    } else {
      return `at ${this.state.date} `
    }
  }

  render() {

    let _this = this;
    // user has dogs and has parks
    if(this.state.user !== undefined && this.state.parks.length > 0) {

      return(
        <View style={styles.mainContainer}>
          <Image source={{uri: this.state.park.image}} style={{alignSelf: 'stretch', height: 200}}/>
          <View>
          <View style={styles.headerBox}>
            <Text style={styles.headerLabel}>
              Heading to {this.state.park.name + " " + this.renderDate()}
            </Text>
          </View>



          <View style={styles.labelTime}>
            <TouchableOpacity
              onPress={this._showTimePicker.bind(this)}>
              <Text style={styles.labelTimeText}>{`Change time`}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.labelPark}>
            <Text
              onPress={this.changePark.bind(this)}
              style={styles.labelParkText}>Change park</Text>
          </View>


          <DateTimePicker
            isVisible={this.state.timePickerVisible}
            onConfirm={this._updateDateTime.bind(this)}
            mode={'time'}
            onCancel={this._hideTimePicker.bind(this)}
            titleIOS={'Select time'}
            format={'YYYY-MM-DD'}
            />
        </View>

            <View style={styles.labelConfirm}>
              <TouchableOpacity onPress={this._createPlaytime}>
                <Text style={styles.labelConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }
    // user has dogs but follows no parks
    else if(this.state.user !== undefined) {
      return(
        <View style={styles.noNew}>
          <Text style={styles.noNewText}>
            It looks like you aren't following any parks yet.
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
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flex: 1,
    // backgroundColor: Colors.black,
  },
  labelTime: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: Colors.blue,
    // flex: 1,
    height: 60,
    paddingHorizontal: 10,
  },
  labelTimeText: {
    fontSize: 20,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
  },
  headerLabel: {
    textAlign: 'center',
    fontSize: 20,
    alignItems: 'center',
    color: Colors.black,
  },
  headerBox: {
    // flex: 1,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  labelConfirm: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: Colors.orange,
    // flex: 1,
    height: 60,
  },
  labelConfirmText: {
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
  },
  labelPark: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: Colors.green,
    // flex: 1,
    height: 60,
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: {
      width: -5,
      height: 5
    },
    shadowOpacity: .8,
    shadowRadius: 5,
    elevation: 1,
  },
  labelParkText: {
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
  },
  noNew: {
    marginTop: 5,
    paddingHorizontal: 5,
    height: 50,
    alignSelf: "stretch",
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  noNewText: {

    fontSize: 20,
    alignItems: 'center',
    color: Colors.tabIconDefault,
  },

})
  // {_this._showPicker()}
