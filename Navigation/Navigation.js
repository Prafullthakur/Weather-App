import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './DrowerNavigation';

import Main from '../components/Main';
const App = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <App.Navigator initialRouteName="Main" headerMode="none">
        <App.Screen name="Main" component={Main} />
        <App.Screen name="DrawerNavigation" component={DrawerNavigation} />
      </App.Navigator>
    </NavigationContainer>
  );
}
