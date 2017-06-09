import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import firebaseApp from '../api/firebaseApp';
import DogsIndex from '../components/dogs/DogsIndex';
import Colors from '../constants/Colors';

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

    const parkRef = firebaseApp.database().ref(`/parks/${this.props.park.parkId}/dogs`);
    parkRef.on('value', snapshot => {
      _dogList = [];
      _isFollowing = false;
      snapshot.forEach(dog => {
        _dogList.push(dog.val());
        _dogList[_dogList.length - 1].id = dog.key;
        if(dog.val().ownerId === firebaseApp.auth().currentUser.uid) {
          _isFollowing = true;
        }
      });
      _this.setState({
        dogs: _dogList,
        following: _isFollowing
      });
    });

    // parkRef.on('child_removed', snapshot => {
    //   debugger
    //   _this.state.dogs.forEach((dog, idx) => {
    //     if(dog.id === snapshot.key) {
    //       var firstHalf = _this.state.dogs.slice(0, idx);
    //       var secondHalf = _this.state.dogs.slice(idx + 1, _this.state.dogs.length);
    //       var newDogs = firstHalf.concat(secondHalf);
    //       _this.setState({
    //         dogs: newDogs,
    //         following: false
    //       });
    //     }
    //   })
    // });
  }


  _handleClick() {
    this.state.following ? this._unfollowPark() : this._joinPark();
  }

  _joinPark() {
    _this = this;
    const currUser = firebaseApp.auth().currentUser;

    firebaseApp.database().ref(`/users/${currUser.uid}`).once(`value`).then(function(snapshot) {
      if(snapshot.exists()) {
        firebaseApp.database().ref().child(`/users/${firebaseApp.auth().currentUser.uid}/parks/${_this.props.park.parkId}`).set({
          name: _this.props.park.name
        });

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
    firebaseApp.database().ref().child(`users/${uid}/parks/${_this.props.park.parkId}`).remove();
  }


  render() {
    const { park } = this.props;

    return(
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <Image source={{uri: park.photoUrl}}
                 style={styles.parkImage} />
               <View style={styles.parkTextBox}>
            <Text style={styles.parkText}>{park.name}</Text>
            <Text style={styles.parkText}>{park.address}</Text>
          </View>
        </View>

        <TouchableHighlight style={styles.joinPark} onPress={this._handleClick.bind(this)}>
          <Text>{ this.state.following ? `Unfollow` : `Join Park`}</Text>
        </TouchableHighlight>

        <View style={styles.dogList}>
          <Text>Dogs that go here:</Text>
        </View>
        <DogsIndex
          dogs={this.state.dogs}
          navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
  },
  infoContainer: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  parkImage: {
    alignSelf: 'stretch',
    height: 200,
  },
  parkTextBox: {
    backgroundColor: Colors.white,
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 5
  },
  parkText: {
    fontSize: 20,
  },
  joinPark: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  dogList: {
    alignSelf: 'stretch',
    alignItems: 'center',
  }
})
