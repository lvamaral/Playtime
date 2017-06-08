import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

export default class DogIndexItem extends React.Component {
  render() {
    const { dog, navigator } = this.props;
    

    return(
      <TouchableHighlight onPress={() => navigator.push('dogView', {id: dog.id, name: dog.dogName})}>
        <View>
          <Text>{dog.dogName}</Text>
          <Image source={{uri: dog.image}}
                 style={{width: 80, height: 80}} />
        </View>
      </TouchableHighlight>
    );
  }
}
