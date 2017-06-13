import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet, Dimensions
} from 'react-native';
import firebaseApp from '../api/firebaseApp';
import DogsIndex from '../components/dogs/DogsIndex';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

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


  render() {
    const { park } = this.props;

    return(
      <View>
        <Image source={{uri: park.photoUrl}}
               style={{width: 100, height: 100}} />
        <Text>{park.name}</Text>
        <Text>{park.address}</Text>

        <TouchableOpacity onPress={this._handleClick.bind(this)}>
          <Text>{ this.state.following ? `Unfollow` : `Join this park`}</Text>
        </TouchableOpacity>

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
        firebaseApp.database().ref().child(`/users/${firebaseApp.auth().currentUser.uid}/parks/${_this.props.park.parkId}`).set({
          name: _this.props.park.name,
          image: _this.props.park.photoUrl
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
    var {height, width} = Dimensions.get('window')
    const { park } = this.props;

    return(
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>

          <Image source={{uri: park.photoUrl}}
                 style={styles.parkImage} />
               <View style={styles.joinPark} >
                 <TouchableOpacity style={{alignSelf: 'stretch', alignItems: 'center'}} onPress={this._handleClick.bind(this)}>
                    <Text style={styles.joinParkText}>{ this.state.following ? `Unfollow` : `Join Park`}</Text>
               </TouchableOpacity>
               </View>
          <View style={styles.parkTextBox}>
            <Text style={styles.parkText}>{park.name}</Text>
            <Text style={styles.parkText}>{park.address}</Text>
          </View>
          <View style={styles.dogList}>
            <Text style={styles.dogListText}>Dogs that go here:</Text>
          </View>
        </View>


        <DogsIndex
          dogs={this.state.dogs}
          navigator={this.props.navigator} />
      </View>
    );
  }
}

  var {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },
  infoContainer: {
    alignSelf: 'stretch',
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  parkImage: {
    alignSelf: 'stretch',
    height: 200,
    position: "relative",
    backgroundColor: 'rgba(0,0,0,0)',
  },
  parkTextBox: {
    backgroundColor: Colors.white,
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 5,
  },
  parkText: {
    fontSize: 16,
  },
  joinParkText: {
    fontSize: 20,
    color: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: width,
  },
  joinPark: {
    width: width,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 20,
    top: 100,
    // left: 110,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dogList: {
    height: 40,
    backgroundColor: Colors.black,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dogListText: {
    color: Colors.white,
    fontSize: 20,
  }
})
