import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Colors from '../../constants/Colors';

export default class ParksIndexItem extends React.Component {
    render() {
      const { park, navigator } = this.props;

      return(
        <TouchableOpacity onPress={() => navigator.push('parksView', {park: park})}>
          <View style={styles.row}>
            <View style={styles.container2}>
              <Image source={{uri: park.photoUrl}}
                     style={{width: 50, height: 50}} />
            </View>
            <View style={styles.container}>
              <Text>{park.name}</Text>
              <Text>{park.address}</Text>
            </View>


          </View>
        </TouchableOpacity>
      );
    }
};
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    
  },
  container: {
    flex: 4,
  },
  container2: {
    flex: 1,
  }

})
