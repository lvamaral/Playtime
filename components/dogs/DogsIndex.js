import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import DogIndexItem from './DogIndexItem';

export default class DogsIndex extends React.Component {
  render() {
    const { dogs } = this.props;

    if(dogs.length > 0) {
      return(
        <ScrollView>
          { dogs.map((dog, i) => {
            return(
              <DogIndexItem
                key={`dog${i}`}
                dog={dog} />
            )
          }) }
        </ScrollView>
      )
    } else {
      return(
        <View>
        </View>
      );
    }
  }
}
