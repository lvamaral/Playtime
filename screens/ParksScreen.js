import React from 'react';
import Expo from 'expo';
import { View, TextInput } from 'react-native';
import ParksIndex from '../components/parks/ParksIndex';
import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';

export default class ParkScreen extends React.Component {
  state = {
    parks: null,
    keyword: ''
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
        <TextInput
          style={{marginTop: 20, height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({keyword: text})}
          value={this.state.keyword}
        />

        <ParksIndex
          navigator={this.props.navigator}
          parks={this.state.parks}
          keyword={this.state.keyword}
        />
      </View>
    )
  }
};
