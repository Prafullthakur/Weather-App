import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './DrowerNavigation';

import Main from '../components/Main';
import NewLocation from '../components/NewLocation';
const App = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <App.Navigator initialRouteName="Main" headerMode="none">
        <App.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <App.Screen
          name="NewLocation"
          component={NewLocation}
          options={{
            headerShown: false,
          }}
        />
        <App.Screen name="DrawerNavigation" component={DrawerNavigation} />
      </App.Navigator>
    </NavigationContainer>
  );
}
