import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import LoginScreen from '../screens/LoginScreen';
import ParksScreen from '../screens/ParksScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  parks: () => ParksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  login: () => LoginScreen
}));
