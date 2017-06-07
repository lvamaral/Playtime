import React from 'react';
import { View, Image, Text } from 'react-native';
import firebaseApp from '../api/firebaseApp';

export default class ParksViewScreen extends React.Component {
  render() {
    const { park } = this.props;

    return(
      <View>
        <Image source={{uri: park.photoUrl}}
               style={{width: 100, height: 100}} />
        <Text>{park.name}</Text>
        <Text>{park.address}</Text>
      </View>
    );
  }
}
