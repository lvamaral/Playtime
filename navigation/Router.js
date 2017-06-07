import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import LoginScreen from '../screens/LoginScreen';
import ParksScreen from '../screens/ParksScreen';
import AddDogScreen from '../screens/AddDogScreen';
import UserScreen from '../screens/UserScreen';
import DogViewScreen from '../screens/DogViewScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  parks: () => ParksScreen,
  rootNavigation: () => RootNavigation,
  login: () => LoginScreen,
  addDog: () => AddDogScreen,
  user: () => UserScreen,
  dogView: () => DogViewScreen
}));
