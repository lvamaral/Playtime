import React from 'react';
import Expo from 'expo';
import { View } from 'react-native';
import ParksIndex from '../components/parks/ParksIndex';
import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';

export default class ParkScreen extends React.Component {
  state = {
    parks: null
  };

  componentWillMount() {
    const that = this;
    const ref = firebaseApp.database().ref('/parks');
    ref.once('value').then(snapshot => {
      var parks = [];
      snapshot.forEach(child => {
        parks.push(child.val());
      })
      that.setState({parks: parks});
    });
  }

  render() {
    return(
      <View>
        <ParksIndex
          parks={this.state.parks}
        />
      </View>
    )
  }
};
