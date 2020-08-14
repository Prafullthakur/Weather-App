import React from 'react';
import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
navigator.geolocation = require('@react-native-community/geolocation');
import locationicon from '../assets/location-pin.png';
import clouds from '../assets/cloud.png';
import * as Animatable from 'react-native-animatable';
import Menu from '../assets/menu.png';
import Plus from '../assets/plus.png';
import SemiClouds from '../assets/icons8-clouds-48.png';
import Water from '../assets/water.png';
export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [droawer, setDroawer] = React.useState(false);
  const [weath, setWeath] = React.useState([]);
  const [hourWeath, setHourWeath] = React.useState([]);
  const [dayPart, setDayPart] = React.useState(null);
  const slide = {
    from: {
      marginLeft: 0,
    },
    to: {
      marginLeft: 6,
    },
  };
  const run = (latitude, longitude) => {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        let temp = JSON.parse(this.responseText);
        setWeath(temp.data);
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const today = year + '-' + month + '-' + `${day + 1}`;
        const tomorrow = year + '-' + month + '-' + `${day + 2}`;
        temp.data.map((data) => setDayPart(data.pod));
        runhour(latitude, longitude, today, tomorrow);
      }
    });

    xhr.open(
      'GET',
      `https://api.weatherbit.io/v2.0/current?lang=en&lat=${latitude}&lon=${longitude}&key=e758a452b22b4492b929e3da1f871f82`,
    );
    xhr.send(data);
  };
  const runhour = (latitude, longitude, today, tomorrow) => {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        let dat = JSON.parse(this.responseText);
        let temp = dat.data;
        setHourWeath(temp);
      }
    });

    xhr.open(
      'GET',
      `https://api.weatherbit.io/v2.0/history/hourly?lang=en&lat=${latitude}&lon=${longitude}&start_date=${today}&end_date=${tomorrow}&tz=local&key=e758a452b22b4492b929e3da1f871f82`,
    );
    xhr.send(data);
  };
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = JSON.stringify(position);
        try {
          await AsyncStorage.setItem('location', location);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          run(latitude, longitude);
        } catch (error) {
          console.log(error);
        }
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    wait(1500).then(() => setRefreshing(false));
  }, []);

  const retrivedata = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = JSON.stringify(position);
        try {
          await AsyncStorage.setItem('location', location);
          const value = await AsyncStorage.getItem('locationone');
          const temp = JSON.parse(value);
          const lat = temp.coords.latitude;
          const long = temp.coords.longitude;
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          if (lat === latitude && long === longitude) {
            run(lat, long);
            runhour(lat, long);
          } else {
            run(latitude, longitude);
            runhour(latitude, longitude);
          }
        } catch (error) {
          console.log(error);
        }
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  React.useEffect(() => {
    retrivedata();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.home}>
          {droawer ? (
            <View style={styles.droawer}>
              <TouchableHighlight
                underlayColor="tranparent"
                onPress={() => {
                  setDroawer(!droawer);
                }}>
                <View style={{width: `${100}%`, height: `${100}%`}}>
                  <Text>hello</Text>
                </View>
              </TouchableHighlight>
            </View>
          ) : (
            <View></View>
          )}
          <View style={styles.homePage}>
            <ImageBackground
              source={
                dayPart === 'n'
                  ? require('../assets/night.jpg')
                  : require('../assets/day.jpg')
              }
              style={{height: `${100}%`, width: `${100}%`}}>
              {weath.map((weather) => (
                <>
                  <View style={styles.head} key={5}>
                    <Image
                      style={styles.locationicon}
                      source={locationicon}
                      alt="location-icon"
                      key={3}
                    />

                    <Text style={styles.cityName} key={1}>
                      {weather.city_name}
                    </Text>
                  </View>

                  <View style={styles.second}>
                    <View style={{width: 58}}>
                      <Animatable.Image
                        animation={slide}
                        iterationCount="infinite"
                        direction="alternate"
                        source={clouds}
                        style={styles.icon}
                      />
                    </View>
                    <Text style={styles.temperature} key={2}>
                      {weather.temp}
                      {'\u00b0'}
                    </Text>
                  </View>
                  <View style={styles.third}>
                    <Text style={styles.bothTemp}>
                      {weather.app_temp}
                      {'\u00b0'}
                      {'/'}
                      {weather.temp}
                      {'\u00b0'} Feels like {weather.app_temp}
                      {'\u00b0'}
                    </Text>
                    <Text style={styles.description}>
                      {weather.weather.description}
                    </Text>
                  </View>
                </>
              ))}

              <>
                <View style={styles.fourth}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => {
                      setDroawer(!droawer);
                    }}>
                    <Image source={Menu} style={styles.menu} />
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => {
                      setDroawer(!droawer);
                    }}>
                    <Image source={Plus} style={styles.plus} />
                  </TouchableHighlight>
                </View>
                <View style={styles.fifth}>
                  <ScrollView
                    horizontal={true}
                    contentContainerStyle={{width: `${550}%`}}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    decelerationRate="fast"
                    pagingEnabled>
                    {console.log(hourWeath)}
                    {hourWeath ? (
                      hourWeath.map((weather) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View style={styles.hourCont}>
                            <Text style={styles.time}>
                              {weather.datetime.split(':')[1]}:00{' '}
                              {weather.datetime.split(':')[1] <= 11 &&
                              weather.datetime.split(':')[1] >= 0
                                ? 'am'
                                : 'pm'}
                            </Text>
                            <Image
                              style={{
                                marginTop: 4,
                                marginBottom: 4,
                                width: 35,
                                height: 35,
                              }}
                              source={clouds}
                            />
                            <Text style={{color: 'white'}}>
                              {weather.app_temp}
                              {'\u00b0'}
                            </Text>

                            <View
                              style={{
                                borderBottomColor: 'white',
                                borderBottomWidth: 1,
                                width: 30,
                                height: 1,
                              }}
                            />
                            <Text style={{color: 'white'}}>
                              {weather.temp}
                              {'\u00b0'}
                            </Text>
                            <View style={styles.fifthLast}>
                              <Image
                                source={Water}
                                style={{width: 10, height: 10}}
                              />
                              <Text style={{color: 'white'}}>{weather.rh}</Text>
                            </View>
                          </View>
                        </View>
                      ))
                    ) : (
                      <></>
                    )}
                  </ScrollView>
                </View>
                <View style={styles.sixthHead}>
                  <Text style={styles.sixthText}>Daily</Text>
                  <Text style={styles.sixthText}>
                    Yesterday: 30{'\u00b0'}
                    {'/'}27{'\u00b0'}
                  </Text>
                </View>
                <View style={styles.sixth}>
                  <ScrollView
                    horizontal={true}
                    contentContainerStyle={{width: `${200}%`}}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    decelerationRate="fast"
                    pagingEnabled></ScrollView>
                </View>
                <View style={styles.seventhHead}>
                  <Text style={styles.seventhText}>Details</Text>
                </View>
                <View style={styles.seventh}></View>
              </>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  scrollView: {
    height: `${152}%`,
  },
  home: {flex: 1, flexDirection: 'row', backgroundColor: 'transparent'},
  droawer: {
    width: `${40}%`,
    backgroundColor: '#fff',
  },
  homePage: {width: `${100}%`},
  head: {
    marginTop: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationicon: {width: 22, height: 22},
  cityName: {
    marginLeft: 5,
    color: 'white',
    fontSize: 23,
  },
  temperature: {
    color: 'white',
    fontSize: 60,
    marginLeft: 10,
  },
  second: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    marginLeft: 20,
    height: 50,
    width: 50,
  },
  third: {
    marginTop: 6,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bothTemp: {
    color: 'white',
    fontSize: 15,
  },
  description: {
    marginTop: 3,
    fontSize: 17,
    color: 'white',
  },
  fourth: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 34,
    paddingRight: 34,
    alignItems: 'center',
  },
  menu: {
    width: 32,
    height: 32,
  },
  plus: {
    width: 22,
    height: 22,
  },
  fifth: {
    marginTop: 15,
    height: 200,
    width: `${100}%`,
    paddingLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
  },
  sixth: {
    marginTop: 5,
    height: 200,
    width: `${100}%`,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
  },
  sixthHead: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
  },
  seventh: {
    marginTop: 5,
    marginBottom: 15,
    height: 200,
    width: `${100}%`,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
  },
  sixthText: {
    color: 'white',
    fontSize: 17,
  },
  seventhHead: {
    marginTop: 15,
    paddingLeft: 25,
  },
  seventhText: {
    color: 'white',
    fontSize: 17,
  },
  hourCont: {
    height: 150,
    marginLeft: 7,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 15,
    color: 'white',
  },
  fifthLast: {marginTop: 10, flexDirection: 'row', alignItems: 'center'},
});
