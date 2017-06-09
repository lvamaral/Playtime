import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import DogIndexItem from './DogIndexItem';


export default class DogsIndex extends React.Component {
  render() {
    const { dogs, navigator } = this.props;

    if(dogs.length > 0) {

      return(
        <ScrollView>
          { dogs.map((dog, i) => {

            return(
              <DogIndexItem
                key={`dog${i}`}
                dog={dog}
                navigator={navigator} />
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

const styles = StyleSheet.create({

})
