import React from 'react';
import axios from 'axios';
import {
  Alert,
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight,
  LogBox,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import locationicon from '../assets/location-pin.png';
import clouds from '../assets/cloud.png';
import * as Animatable from 'react-native-animatable';
import Menu from '../assets/menu.png';
import Plus from '../assets/plus.png';
import Water from '../assets/water.png';
import loading from '../assets/Gifs/loading.gif';
export default function Home({route, navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [weath, setWeath] = React.useState(null);
  const [hourWeath, setHourWeath] = React.useState(null);
  const [dayPart, setDayPart] = React.useState(null);
  const [dailyWeath, setDailyWeath] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const slide = {
    from: {
      marginLeft: 0,
    },
    to: {
      marginLeft: 6,
    },
  };
  const run = (latitude, longitude) => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/current?lang=en&lat=${latitude}&lon=${longitude}&key=8b2561217ead4dbc80bc647368edd68c`,
      )
      .then((res) => {
        setWeath(res.data.data);
        res.data.data.map((data) => setDayPart(data.pod));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const runhour = (latitude, longitude) => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lang=en&lat=${latitude}&lon=${longitude}&key=8b2561217ead4dbc80bc647368edd68c&hours=24`,
      )
      .then((res) => {
        setHourWeath(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const rundaily = (latitude, longitude) => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lang=en&lat=${latitude}&lon=${longitude}&key=8b2561217ead4dbc80bc647368edd68c&days=7`,
      )
      .then((res) => {
        setDailyWeath(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const runSearch = (city, country) => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/current?lang=en&city=${city}&country=${country}&key=8b2561217ead4dbc80bc647368edd68c`,
      )
      .then((res) => {
        setWeath(res.data.data);
        res.data.data.map((data) => setDayPart(data.pod));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const runSearchDaily = (city, country) => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lang=en&city=${city}&country=${country}&key=8b2561217ead4dbc80bc647368edd68c&hours=24`,
      )
      .then((res) => {
        setHourWeath(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const runSearchWeek = (city, country) => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lang=en&city=${city}&country=${country}&key=8b2561217ead4dbc80bc647368edd68c&days=7`,
      )
      .then((res) => {
        setDailyWeath(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    Geolocation.getCurrentPosition(
      async (position) => {
        const location = JSON.stringify(position);
        try {
          await AsyncStorage.setItem('location', location);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          run(latitude, longitude);
          runhour(latitude, longitude);
          rundaily(latitude, longitude);
        } catch (error) {
          console.log(error);
        }
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    wait(1500).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    if (route.params) {
      const {cityName, stateName, countryName} = route.params;
      setCountry({cityName, stateName, countryName});
      runSearch(cityName, countryName);
      runSearchWeek(cityName, countryName);
      runSearchDaily(cityName, countryName);
    } else {
      Geolocation.getCurrentPosition(
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

            if (lat == latitude && long == longitude) {
              run(lat, long);
              runhour(lat, long);
              rundaily(lat, long);
            } else {
              run(latitude, longitude);
              runhour(latitude, longitude);
              rundaily(latitude, longitude);
            }
          } catch (error) {
            console.log(error);
          }
        },
        (error) => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }
    LogBox.ignoreLogs(['Warning: ...']);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      {weath ? (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.home}>
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
                  {console.log(country)}
                  <View style={styles.fourth}>
                    <TouchableHighlight
                      underlayColor="transparent"
                      onPress={() => {
                        navigation.toggleDrawer();
                      }}>
                      <Image source={Menu} style={styles.menu} />
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor="transparent"
                      onPress={() => navigation.navigate('NewLocation')}>
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
                                <Text style={{color: 'white'}}>
                                  {weather.rh}
                                </Text>
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
                  </View>
                  <View style={styles.sixth}>
                    <ScrollView
                      horizontal={true}
                      contentContainerStyle={{width: `${180}%`}}
                      showsHorizontalScrollIndicator={false}
                      scrollEventThrottle={200}
                      decelerationRate="fast"
                      pagingEnabled>
                      {dailyWeath ? (
                        dailyWeath.map((weather) => (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View style={styles.hourCont}>
                              <Text style={styles.time}>
                                {weather.datetime}
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
                                {weather.max_temp}
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
                                {weather.min_temp}
                                {'\u00b0'}
                              </Text>

                              <View style={styles.fifthLast}>
                                <Image
                                  source={Water}
                                  style={{width: 10, height: 10}}
                                />
                                <Text style={{color: 'white'}}>
                                  {weather.rh}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ))
                      ) : (
                        <></>
                      )}
                    </ScrollView>
                  </View>
                  <View style={styles.seventhHead}>
                    <Text style={styles.seventhText}>Details</Text>
                  </View>
                  <View style={styles.seventh}>
                    {weath.map((weather) => (
                      <>
                        <View style={styles.seventhDetail}>
                          <Text style={styles.textDetail}>Sunrise</Text>
                          <Text style={styles.textDetail}>
                            {weather.sunrise}
                          </Text>
                        </View>
                        <View style={styles.seventhDetail}>
                          <Text style={styles.textDetail}>Sunset</Text>
                          <Text style={styles.textDetail}>
                            {weather.sunset}
                          </Text>
                        </View>
                        <View style={styles.seventhDetail}>
                          <Text style={styles.textDetail}>Humidity</Text>
                          <Text style={styles.textDetail}>{weather.rh}%</Text>
                        </View>
                      </>
                    ))}
                  </View>
                </>
              </ImageBackground>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loading}>
          <View>
            <Image source={loading} style={{height: 250, width: 250}} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  scrollView: {
    height: `${148}%`,
  },
  loading: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingLeft: 10,
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
    padding: 20,
    marginTop: 5,
    marginBottom: 15,
    height: 185,
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
  seventhDetail: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  hourCont: {
    height: 150,
    marginLeft: 7,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDetail: {
    color: 'white',
    fontSize: 17,
  },
  time: {
    fontSize: 15,
    color: 'white',
  },
  fifthLast: {marginTop: 10, flexDirection: 'row', alignItems: 'center'},
});
