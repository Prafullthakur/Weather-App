import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import Home from './Home';
// navigator.geolocation = require('@react-native-community/geolocation');
import Geolocation from '@react-native-community/geolocation';

export default function Main({navigation}) {
  const [location, setLocation] = React.useState(null);

  const [waitit, setWaitit] = React.useState(false);

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

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const getLocation = async () => {
    await AsyncStorage.getItem('locationone')
      .then((value) => {
        setLocation(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getLocation();
    SplashScreen.hide();
    wait(1000).then(() => {
      setWaitit(true);
    });
  }, []);

  return !location ? (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      {waitit ? (
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
      ) : (
        <View></View>
      )}
    </>
  ) : (
    <>{navigation.navigate('DrawerNavigation')}</>
  );
}
