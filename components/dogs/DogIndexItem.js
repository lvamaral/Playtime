import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { StackNavigation } from '@expo/ex-navigation';

export default class DogIndexItem extends React.Component {
  state = {
    clicked: false
  }

  render() {
    const { dog } = this.props;

    if(!this.state.clicked) {
      return(
        <TouchableHighlight onPress={() => this.setState({clicked: true})}>
          <View>
            <Text>{dog.dogName}</Text>
            <Text>{dog.age}</Text>
            <Text>{dog.breed}</Text>
            <Image source={{uri: dog.image}}
                    style={{width: 80, height: 80}} />
          </View>
        </TouchableHighlight>
      );
    } else {
      return(
        <View></View>
      );
    }
  }
}
