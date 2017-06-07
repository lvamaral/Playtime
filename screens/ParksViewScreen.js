import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight} from 'react-native';
import firebaseApp from '../api/firebaseApp';
import DogsIndex from '../components/dogs/DogsIndex';

export default class ParksViewScreen extends React.Component {
  state = {
    dogs: []
  };

  componentWillMount() {
    _this = this;
    _dogList = [];

    const parkRef = firebaseApp.database().ref(`/parks/${this.props.park.parkId}/dogs`);
    parkRef.once('value').then(snapshot => {
      if(snapshot.exists()) {
        snapshot.forEach(childSnap => {
          var idx = _dogList.push(childSnap.val());
          _dogList[idx - 1].dogId = childSnap.key;
        });
        _this.setState({dogs: _dogList});
      }
    });
  }

  render() {
    const { park } = this.props;

    return(
      <View>
        <Image source={{uri: park.photoUrl}}
               style={{width: 100, height: 100}} />
        <Text>{park.name}</Text>
        <Text>{park.address}</Text>

        <TouchableHighlight onPress={this._joinPark.bind(this)}>
          <Text>Join Park</Text>
        </TouchableHighlight>

        <DogsIndex
          dogs={this.state.dogs} />
      </View>
    );
  }

  _joinPark() {
    _this = this;
    const currUser = firebaseApp.auth().currentUser;

    firebaseApp.database().ref(`/users/${currUser.uid}`).once(`value`).then(function(snapshot) {
      if(snapshot.exists()) {
        snapshot.child('/dogs').forEach(childSnap => {
          const parkRef = firebaseApp.database().ref(`/parks/${_this.props.park.parkId}`);
          const dog = childSnap.val()
          parkRef.child(`/dogs/${childSnap.key}`).set({
            dogName: dog.dogName,
            age: dog.age,
            breed: dog.breed,
            image: dog.image,
            ownerName: dog.ownerName,
            ownerId: dog.ownerId
          });
        });
      }
    });
  }
}
