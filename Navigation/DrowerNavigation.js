import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../components/Home';
import NewLocation from '../components/NewLocation';
import DrawerContent from '../components/DrawerContent';
const App = createDrawerNavigator();

export default function DrowerNavigation() {
  return (
    <App.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <App.Screen name="Home" component={Home} />
      <App.Screen name="NewLocation" component={NewLocation} />
    </App.Navigator>
  );
}
