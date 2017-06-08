import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebaseApp from '../../api/firebaseApp';

export default class PlaytimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePickerVisible: false,
      datePickerVisible: false,
      datePickerVisible: false
    }
  }

  static route = {
    navigationBar: {
      title: 'Create Playtime'
    },
  };

  componentWillMount() {
    const parksRef = firebaseApp.database().ref(`/parks`);
    
  }

  render() {
    return(
      <View>
        <TouchableHighlight style={{paddingTop: 40}}
                            onPress={this.props.closeModal}>
          <Text>Click to exit</Text>
        </TouchableHighlight>

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
