import React from 'react';
import { View, Text, TouchableHighlight, Picker, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CheckBox from 'react-native-checkbox';
import firebaseApp from '../api/firebaseApp';

export default class PlaytimeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePickerVisible: false,
      datePickerVisible: false,
      date: new Date(),
      parks: [],
      dogs: []
    }
    this._handleCheck = this._handleCheck.bind(this);
    this._handleNotifications = this._handleNotifications.bind(this);
    this._createPlaytime = this._createPlaytime.bind(this);
    this._postNotification = this._postNotification.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Create Playtime'
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
    return(
      <Picker
        selectedValue={this.state.park}
        onValueChange={(itemValue, itemIndex) => this.setState({park: itemValue})}
      >
        { this.state.parks.map(park => (
          <Picker.Item
            key={`park${park.id}`}
            label={`${park.name}`}
            value={`${park.id}`} />
        ))}
      </Picker>
    );
  }

  _showCheckboxes() {
    if(this.state.dogs.length > 1) {
      return(
        <View>
          {this.state.dogs.map(dog => (
            <CheckBox
              key={`dog${dog.id}`}
              label={dog.dogName}
              checked={dog.checked}
              onChange={ (checked) => this._handleCheck(checked, dog.id) } />
          ))}

        </View>
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

  render() {
    // user has dogs and has parks
    if(this.state.user !== undefined && this.state.parks.length > 0) {

      return(
        <View>
          <ScrollView>

            { this._showPicker() }

            <TouchableHighlight style={{paddingTop: 40}}
                                onPress={this._showTimePicker.bind(this)}>
              <Text>{this.state.date.toLocaleTimeString()}</Text>
            </TouchableHighlight>

            <TouchableHighlight style={{paddingTop: 40}}
                                onPress={this._showDatePicker.bind(this)}>
              <Text>{this.state.date.toLocaleDateString()}</Text>
            </TouchableHighlight>

            { this._showCheckboxes() }

            <DateTimePicker
              isVisible={this.state.timePickerVisible}
              onConfirm={this._updateDateTime.bind(this)}
              mode={'time'}
              onCancel={this._hideTimePicker.bind(this)}
              titleIOS={'Select time'}
            />

            <DateTimePicker
              isVisible={this.state.datePickerVisible}
              onConfirm={this._updateDateTime.bind(this)}
              onCancel={this._hideDatePicker.bind(this)}
              titleIOS={'Select date'}
            />

            <TouchableHighlight onPress={this._createPlaytime}>
              <Text>Create Playtime</Text>
            </TouchableHighlight>
          </ScrollView>
        </View>
      );

    }
    // user has dogs but follows no parks
    else if(this.state.user !== undefined) {
      return(
        <View>
          <TouchableHighlight style={{paddingTop: 40}}
                              onPress={this.props.closeModal}>
            <Text>Click to exit</Text>
          </TouchableHighlight>

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
        </View>
      )
    }
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
  }

  _handleNotifications() {
    _this = this;
    this.state.dogs.forEach(dog => {
      _dog = dog;
      firebaseApp.database().ref(`/followDogToUser/${dog.id}`).once('value')
        .then(snapshot => {
        snapshot.forEach(childSnap => {
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
        });
      });
    });
  }

  _postNotification(uid, parkSnap, dog) {
    let park = parkSnap.val();
    park.id = parkSnap.key;
    firebaseApp.database().ref(`users/${uid}/notifications`).push().set({
      dog: dog,
      park: park
    });
  }
}
