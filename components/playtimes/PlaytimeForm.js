import React from 'react';
import { View, Text, TouchableHighlight, Picker } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebaseApp from '../../api/firebaseApp';

export default class PlaytimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePickerVisible: false,
      datePickerVisible: false,
      datePickerVisible: false,
      park: null
    }
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
        _this.setState({
          user: user,
          park: user.parks[0]
        });
      } else {
        _this.setState({user: user});
      }
    });
  }

  render() {
    let picker = () => (<View></View>);

    // user is logged in and has parks
    if(this.state.user !== undefined && this.state.user.parks !== undefined) {
      const parks = this.state.user.parks;
      picker = () => {
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

      return(
        <View>
          <TouchableHighlight style={{paddingTop: 40}}
                              onPress={this.props.closeModal}>
            <Text>Click to exit</Text>
          </TouchableHighlight>

          { picker() }

          <TouchableHighlight style={{paddingTop: 40}}
                              onPress={this._showTimePicker.bind(this)}>
            <Text>Click to show dateTimePicker</Text>
          </TouchableHighlight>

          <TouchableHighlight style={{paddingTop: 40}}
                              onPress={this._showDatePicker.bind(this)}>
            <Text>Click to show dateTimePicker</Text>
          </TouchableHighlight>

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

        </View>
      );

    } else if(this.state.user !== undefined) {
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
    } else {
      return(
        <View>
        </View>
      )
    }
  }

  _updateDateTime(date) {
    this.setState({
      timePickerVisible: false,
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
}
