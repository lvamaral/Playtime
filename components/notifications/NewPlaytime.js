import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import firebaseApp from '../../api/firebaseApp';

export default class NewPlaytime extends React.Component {

  render() {
    return(
      <View>
      <Text>{`${this.props.notif.dog.dogName} is going to ${this.props.notif.park.name}`}</Text>
      <TouchableHighlight onPress={this._resolveRequest.bind(this)}>
        <Text>Ok</Text>
      </TouchableHighlight>
      </View>
    );
  }

  _resolveRequest() {
    const currUID = firebaseApp.auth().currentUser.uid;
    const notif = this.props.notif;
    firebaseApp.database().ref(`users/${currUID}/notifications/${notif.id}`).remove();
  }
}
