import React from 'react';
import {findNodeHandle} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView, TextInput,
  Button, Image
} from 'react-native';
import { ImagePicker } from 'expo';
import * as Firebase from 'firebase';

export default class AddDogScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // uid: Firebase.UserInfo.uid,
      dogName: "",
      age: "",
      breed: "",
      image: null
    }
    this.dogsRef = new Firebase("<MY-FIREBASE-APP>/dogs");
  }
  // static route = {
  //   navigationBar: {
  //     title: 'Links',
  //   },
  // };



handleFormFocus(e, component){
  console.log(this);
 }

 handleSubmit(){
   Firebase.database().ref('dogs/').push({
       highscore: score
     })
 }

 _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [3, 3],
  });

  console.log(result);

  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }
};


  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <Text>Tell us about your little guy!</Text>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              title="Pick an image from camera roll "
              onPress={this._pickImage}
            />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
          <ScrollView scrollEnabled={false} contentContainerStyle={styles.main}>
            <TextInput
               style={{height: 40}}
               placeholder="Dog Name"
               onChangeText={(text) => this.setState({["dogName"]: text})}
             />
             <TextInput
                style={{height: 40}}
                placeholder="Breed"
                onChangeText={(text) => this.setState({["breed"]: text})}
              />
              <TextInput keyboardType={'numeric'}
                 style={{height: 40}}
                 placeholder="Age"
                 onChangeText={(text) => this.setState({["age"]: text})}
              />
            <Button title="Add Dog" color="#841584" onPress={this.handleSubmit.bind(this)}></Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
});
