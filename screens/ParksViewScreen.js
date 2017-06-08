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
    dogs: [],
    following: false
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
      if(_this.state.following === false &&
        snapshot.val().ownerId === firebaseApp.auth().currentUser.uid) {
        _this.setState({following: true});
      }
      _this.setState({dogs: _this.state.dogs});
    });

    parkRef.on('child_removed', snapshot => {
      _this.state.dogs.forEach((dog, idx) => {
        if(dog.id === snapshot.key) {
          var firstHalf = _this.state.dogs.slice(0, idx);
          var secondHalf = _this.state.dogs.slice(idx + 1, _this.state.dogs.length);
          var newDogs = firstHalf.concat(secondHalf);
          _this.setState({
            dogs: newDogs,
            following: false
          });
        }
      })
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

        <TouchableHighlight onPress={this._handleClick.bind(this)}>
          <Text>{ this.state.following ? `Unfollow` : `Join Park`}</Text>
        </TouchableHighlight>

        <DogsIndex
          dogs={this.state.dogs}
          navigator={this.props.navigator} />
      </View>
    );
  }

  _handleClick() {
    this.state.following ? this._unfollowPark() : this._joinPark();
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

  _unfollowPark() {
    // remove user's dogs from park
    const uid = firebaseApp.auth().currentUser.uid;
    const parkRef = firebaseApp.database().ref(`/parks/${_this.props.park.parkId}/dogs`);

    this.state.dogs.forEach(dog => {
      if(dog.ownerId === uid) {
        parkRef.child(`${dog.id}`).remove();
      }
    });
  }
}
