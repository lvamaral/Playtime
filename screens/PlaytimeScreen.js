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
      park: null,
      date: new Date(),
      dogs: null
    }
    this._handleCheck = this._handleCheck.bind(this);
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
        })
        _this.setState({
          user: user,
          park: user.parks[0],
          dogs: dogList
        });
      } else {
        _this.setState({user: user});
      }
    });
  }

  _showPicker() {
    const parks = this.state.user.parks;
    return(
      <Picker
        selectedValue={this.state.park}
        onValueChange={(itemValue, itemIndex) => this.setState({park: itemValue})}
      >
        { Object.keys(parks).map(key => (
          <Picker.Item
            key={`${key}`}
            label={`${parks[key].name}`}
            value={`${parks[key].name}`} />
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
        this.state.dogs[i].checked = !this.state.dogs[i].checked;
        this.setState({dogs: this.state.dogs});
      }
    }
  }

  render() {
    // user has dogs and has parks
    if(this.state.user !== undefined && this.state.user.parks !== undefined) {

      return(
        <View>
          <ScrollView>
            <TouchableHighlight style={{paddingTop: 40}}
                                onPress={this.props.closeModal}>
              <Text>Click to exit</Text>
            </TouchableHighlight>

            { this._showPicker() }

            <TouchableHighlight style={{paddingTop: 40}}
                                onPress={this._showTimePicker.bind(this)}>
              <Text>{this.state.date.getMinutes() + ' ' + this.state.date.getHours()}</Text>
            </TouchableHighlight>

            <TouchableHighlight style={{paddingTop: 40}}
                                onPress={this._showDatePicker.bind(this)}>
              <Text>Choose a different date</Text>
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
    console.log(this.state.date);
    console.log(this.state.park);
    firebaseApp.database().ref('/playtimes').push().set({
      date: this.state.date,
      park: this.state.park
    });
  }
}
