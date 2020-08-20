import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from '../components/Main';
import DrawerContent from '../components/DrawerContent';
const App = createDrawerNavigator();

export default function DrowerNavigation() {
  return (
    <App.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <App.Screen name="Main" component={Main} />
    </App.Navigator>
  );
}
