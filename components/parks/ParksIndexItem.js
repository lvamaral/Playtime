import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

export default class ParksIndexItem extends React.Component {
    render() {
      const { park } = this.props;

      return(
        <TouchableHighlight onPress={() => this.props.navigator.push('dogView')}>
          <View>
            <Text>{park.name}</Text>
            <Text>{park.address}</Text>
            <Image source={{uri: park.photoUrl}}
                   style={{width: 50, height: 50}} />
          </View>
        </TouchableHighlight>
      );
    }
};
