import React from 'react';
import Expo from 'expo';
import { View, TextInput, StyleSheet } from 'react-native';
import ParksIndex from '../components/parks/ParksIndex';
import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class ParkScreen extends React.Component {
  state = {
    parks: null,
    keyword: ''
  };

  static route = {
    navigationBar: {
      title: "Parks"
    },
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
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <FontAwesome
            name={"search"}
            size={30}
            color={Colors.orange}
          />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({keyword: text})}
          value={this.state.keyword}
          defaultValue={"Search for parks..."}
          maxLength={15}
        />
      </View>

        <ParksIndex
          navigator={this.props.navigator}
          parks={this.state.parks}
          keyword={this.state.keyword}
        />
      </View>
    )
  }
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  input: {
    flex: 1,
     height: 50,
     paddingLeft: 5,
     fontSize: 30,
   },
   searchBox: {
     paddingLeft: 5,
     display: 'flex',
     flexDirection: 'row',
     borderColor: Colors.black,
     borderBottomWidth: 1,
     height: 50,
     alignItems: 'center',
   }
})
