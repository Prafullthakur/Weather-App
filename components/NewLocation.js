import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  StyleSheet,
  LogBox,
} from 'react-native';
import locationicon from '../assets/location-pin.png';
import Search from '../assets/search.png';
import lens from '../assets/lens2.png';
import SearchPage from '../assets/Thirdbg.jpg';
export default function NewLocation() {
  const navigation = useNavigation();

  const [text, setText] = React.useState('');
  var worldMapData = require('city-state-country');
  React.useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground source={SearchPage} style={{flex: 1}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => navigation.navigate('Main')}>
          <View style={styles.first}>
            <View style={styles.searchView}>
              <Image source={Search} style={styles.searchImg} />
              <Text style={styles.heading}>Search City</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextInput
                style={styles.search}
                placeholder="City Name"
                onChangeText={(text) => {
                  setText(text);
                }}
                defaultValue={text}
              />
              <Image source={lens} style={styles.lens} />
            </View>
          </View>
          <View style={styles.second}>
            <View style={styles.list}>
              {text ? (
                worldMapData.searchCity(text) ? (
                  worldMapData
                    .searchCity(text)
                    .slice(0, 10)
                    .map((country) => (
                      <TouchableOpacity
                        style={{width: `${100}%`}}
                        onPress={() => {
                          navigation.navigate('Main', {
                            cityName: country.cityName,
                            stateName: country.stateName,
                            countryName: country.countryName,
                          });
                        }}>
                        <View style={styles.listItem}>
                          <Image
                            style={styles.locationicon}
                            source={locationicon}
                            alt="location-icon"
                          />
                          <Text style={styles.listText}>
                            {' '}
                            {country.cityName},{' '}
                          </Text>
                          <Text style={styles.listText}>
                            {country.stateName},{' '}
                          </Text>
                          <Text style={styles.listText}>
                            {country.countryName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                ) : (
                  <View></View>
                )
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  first: {
    paddingTop: 10,
    alignItems: 'center',
  },
  heading: {
    marginLeft: 3,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 27,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchImg: {
    height: 100,
    width: 100,
  },
  search: {
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    letterSpacing: 2,
    height: 40,
    width: `${75}%`,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 6,
    marginRight: -7,
  },
  lens: {
    width: 58,
    height: 58,
  },
  second: {
    marginTop: 10,
  },
  list: {
    backgroundColor: 'rgba(0,0,0,0.07)',
  },
  locationicon: {width: 15, height: 15},
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    width: `${100}%`,
  },
  listText: {
    color: '#fff',
    fontSize: 17,
  },
});
