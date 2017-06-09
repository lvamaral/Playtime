import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default class DogIndexItem extends React.Component {
  render() {
    const { dog, navigator } = this.props;


    return(
      <TouchableHighlight onPress={() => navigator.push('dogView', {id: dog.id, name: dog.dogName})}>
        <View style={styles.row}>
          <View style={styles.container2}>
            <Image source={{uri: dog.image}}
                 style={{width: 50, height: 50, borderRadius: 25}} />
          </View>
          <View style={styles.container}>
            <Text style={styles.dogText}>{dog.dogName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: Colors.white
  },
  container: {
    flex: 3,
  },
  container2: {
    flex: 1,
  },
  dogText: {
    fontSize: 24
  }

})
