/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import ThirdPage from './components/ThirdPage';
import Home from './components/Home';
// navigator.geolocation = require('@react-native-community/geolocation');
import Geolocation from '@react-native-community/geolocation';
export default function App() {
  const [location, setLocation] = React.useState(null);

  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const location = JSON.stringify(position);

        try {
          const value = await AsyncStorage.setItem('locationone', location);
          setLocation(true);
        } catch (error) {
          console.log(error);
        }
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem('locationone');
      setLocation(false);
      return true;
    } catch (exception) {
      return false;
    }
  };

  const getLocation = async () => {
    const value = await AsyncStorage.getItem('locationone');
    setLocation(value);
  };

  useEffect(() => {
    getLocation();
  }, []);
  return !location ? (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{width: `${300}%`}}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled>
            <FirstPage />
            <SecondPage />

            <ThirdPage findCoordinates={findCoordinates} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  ) : (
    <>
      <Home />
    </>
  );
}

const styles = StyleSheet.create({});
