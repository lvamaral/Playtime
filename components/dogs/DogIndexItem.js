import React from 'react';
import { View, Text, Image } from 'react-native';

export default class DogIndexItem extends React.Component {
  render() {
    const { dog } = this.props;

    return(
      <View>
        <Text>{dog.dogName}</Text>
        <Text>{dog.age}</Text>
        <Text>{dog.breed}</Text>
        <Image source={{uri: dog.image}}
               style={{width: 80, height: 80}} />
      </View>
    );
  }
}
