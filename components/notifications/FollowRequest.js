import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import firebaseApp from '../../api/firebaseApp';

export default class FollowRequest extends React.Component {
  state = {
    loading: true,
    dogs: []
  }

  componentWillMount() {
    _this = this;
    const notif = this.props.notif;
    firebaseApp.database().ref(`/followDogToUser/${notif.dog.id}/${notif.user}`)
      .once('value').then(snapshot => {
        _dogs = [];
        snapshot.child('dogs').forEach(dog => {
          _dogs.push(dog.val());
          _dogs[_dogs.length - 1].id = dog.key;
        });
        _this.setState({dogs: _dogs, loading: false});
      });
  }

  render() {
    if(this.state.loading) {
      return(
        <View></View>
      )
    } else {
      let text = ''
      if(this.state.dogs.length === 1) {
        text = this.state.dogs[0].dogName;
        text += ' wants'
      }
      else if(this.state.dogs.length === 2) {
        text = this.state.dogs.join(' and ');
        text += ' want'
      } else {
        text = this.state.dogs.slice(0, this.state.dogs.length - 2).join(', ');
        text += `and ${this.state.dogs[this.state.dogs.length - 1]} want`;
      }

      return(
        <Text>{`${text} to follow ${this.props.notif.dog.name}`}</Text>
      );
    }
  }
}
