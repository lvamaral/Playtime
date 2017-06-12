import React from 'react';
import Expo from 'expo';
import { View, TextInput, StyleSheet } from 'react-native';
import ParksIndex from '../components/parks/ParksIndex';
import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import cacheAssetsAsync from '../utilities/cacheAssetsAsync';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ParkScreen extends React.Component {
  state = {
    parks: null,
    keyword: '',
    loading: true,
    images: []
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
      var images = [];
      snapshot.forEach(child => {
        parks.push(child.val());
        images.push(child.val().photoUrl);
      })
      that.setState({
        parks: parks,
        images: images
      });
    });
  }

  render() {

    if(this.state.images.length > 0 && this.state.loading) {
      this._loadAssetsAsync();
      // this.state.loading = false;
    }

    if(this.state.loading) {
      return <Expo.AppLoading />;
    }

    return(
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.searchBox}>
            <FontAwesome
              name={"search"}
              size={28}
              color={Colors.orange}
            />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({keyword: text})}
            value={this.state.keyword}
            defaultValue={"Search for parks..."}
            maxLength={20}
          />
        </View>

          <ParksIndex
            navigator={this.props.navigator}
            parks={this.state.parks}
            keyword={this.state.keyword}
          />
        </View>

      </KeyboardAwareScrollView>
    )
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: this.state.images
      })
    } catch(e) {
      console.log(e)
    } finally {
      this.setState({
        loading: false
      });
    }
  }

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  input: {
    flex: 1,
     height: 50,
     paddingLeft: 10,
     fontSize: 18,
   },
   searchBox: {
     paddingLeft: 8,
     display: 'flex',
     flexDirection: 'row',
     borderColor: Colors.black,
     borderBottomWidth: 1,
     height: 50,
     alignItems: 'center',
   }
})
