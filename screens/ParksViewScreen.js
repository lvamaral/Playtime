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

  static route = {
    navigationBar: {
      title(params) {
        return params.park.name
      }
    },
  };

  componentWillMount() {
    _this = this;
    _dogList = [];

    const parkRef = firebaseApp.database().ref(`/parks/${this.props.park.parkId}/dogs`);
    parkRef.on('child_added', snapshot => {
      _this.state.dogs.push(snapshot.val());
      _this.state.dogs[_this.state.dogs.length - 1].id = snapshot.key;
      _this.setState({dogs: _this.state.dogs});
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
          dogs={this.state.dogs}
          navigator={this.props.navigator} />
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
