import React from 'react';
import {findNodeHandle} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView, TextInput,
  Button, Image, FlatList,
  TouchableOpacity, Modal
} from 'react-native';

import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';
import {isEqual} from 'lodash';
import Styles from '../assets/stylesheets/pageLayout';
import Colors from '../constants/Colors';
import { FontAwesome} from '@expo/vector-icons';



export default class UserScreen extends React.Component {
  constructor(props){
    super(props);
    this.user = firebase.auth().currentUser;
    this.firstName = this.user.displayName.split(" ")[0]
    this.state = {dogList: {}, following: {}, followers: {}, modalVisible: false}
  }


  static route = {
    navigationBar: {
      title: "Your Profile",
      renderRight: (state: ExNavigationState) => {
        const { config: { eventEmitter }  } = state;

        return (
          <TouchableOpacity onPress={() => eventEmitter.emit('drop')}>
               <View>
                 <FontAwesome
               style={styles.menu}
               name={"sign-out"}
               size={24}
               color={Colors.blue}
               />
             </View>
           </TouchableOpacity>
        );
      },
      renderLeft: (state: ExNavigationState) => {
        const { config: { eventEmitter }  } = state;

        return (
          <TouchableOpacity onPress={() => eventEmitter.emit('add')}>
               <View>
                 <FontAwesome
               style={styles.menu}
               name={"plus-circle"}
               size={24}
               color={Colors.blue}
               />
             </View>
           </TouchableOpacity>
        );
      },
    },
  };

    _subscriptionDone: EventSubscription;

  componentDidMount(){
     this._dropdown = this.props.route.getEventEmitter().addListener('drop', this._handleDrop.bind(this));
     this._add = this.props.route.getEventEmitter().addListener('add', this._handleAddDog.bind(this));
    if (this.user) {
      this.getDogList();
    }
  }

  _handleDrop(){
    this.setState({modalVisible: true});
  }

  _handleAddDog(){
    this.props.navigator.push('addDog');
  }

  setModalVisible(visible) {
  this.setState({modalVisible: visible});
}


  getDogList(){
    let _this = this
    firebaseApp.database().ref(`/users/${this.user.uid}/dogs`).once('value').then(function(snapshot) {
      let newState = _this.state
      snapshot.forEach(function(childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        newState.dogList[childKey] = childData

        });
        _this.setState(newState)

    });
  }

  goTo(id, name) {
    this.props.navigator.push('dogView', {id: id, name: name});
  }

  goToFollowing(user_id){
    this.props.navigator.push('followingView', {id: user_id, name: this.firstName});
  }

  goToFollowers(user_id){
    this.props.navigator.push('followerView', {id: user_id, name: this.firstName, dogs: this.state.dogList});
  }

  render(){
    if (!isEqual(this.state.dogList, {})) {
      let ids = Object.keys(this.state.dogList)
      let dogs = Object.values(this.state.dogList)
      var list =
      dogs.map( (dog, i) => {
        return (
        <TouchableOpacity key={ids[i]} onPress={ () => this.goTo(ids[i], dog.dogName)}>
          <View style={styles.dogsList}>
            <View style={styles.dogsListItem}>
              <View style={styles.container}><Image source={{ uri: dog.image}} style={{ width: 80, height: 80, borderRadius: 40, }}/></View>
              <View style={styles.container2}><Text style={styles.text}>{dog.dogName} the {dog.breed}</Text></View>
            </View>
          </View>
       </TouchableOpacity>
      )}
      )
    }

    let navigator = this.props.navigator;
    let _this = this;

    return(
      <View style={styles.mainContainer}>
        <Modal
         animationType={"none"}
         transparent={false}
         visible={this.state.modalVisible}
         onRequestClose={() => {alert("Modal has been closed.")}}
         >
        <View style={styles.modal}>
         <View style={styles.container}>
           <Image style={{marginBottom: 10}} source={require('../assets/icons/long-haired-dog-head.png')}/>
           <Text style={styles.modalText}>Do you really want to logout?</Text>

           <View style={styles.innerModal}>
             <TouchableOpacity onPress={() => {
               navigator.push('login');
               _this.setState({modalVisible: false});
               firebaseApp.auth().signOut();
             }}>
               <Text style={styles.modalText2}>Yes</Text>
             </TouchableOpacity>

           <TouchableOpacity onPress={() => {
             this.setModalVisible(!this.state.modalVisible)
           }}>
             <Text style={styles.modalText2}>No</Text>
           </TouchableOpacity>
         </View>
         </View>
        </View>
       </Modal>

        <View style={styles.following}>
          <Button title="Following" color={Colors.white} onPress={() => this.goToFollowing(this.user.uid)}></Button>
          <Text style={styles.followingText}>|</Text>
          <Button title="Followers" color={Colors.white} onPress={() => this.goToFollowers(this.user.uid)}></Button>
        </View>


        <View style={{ alignItems: 'center', alignSelf: 'stretch', height: 400}}>
          <ScrollView style={{alignSelf: 'stretch'}}>{list}</ScrollView>
        </View>


      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
    text: {
    fontSize: 20,
    marginVertical: 10,
  },
  dogsList: {
    flex: 4,
    display: 'flex',
    flexDirection: 'row',

  },
  dogsListItem: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: Colors.white,
  },

  following: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: Colors.orange,
    alignSelf: 'stretch',
  },
  followingText: {
    fontSize: 25,
    color: Colors.white
  },
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  modal: {
    backgroundColor: Colors.orange,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // top: 15,
    // right: 0,
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 40,
  },
  innerModal: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText2: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 15,
  }



});
