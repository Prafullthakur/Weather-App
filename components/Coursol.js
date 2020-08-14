import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import icon1 from '../assets/icons8-cloud-lightning-48.png';
import icon5 from '../assets/icons8-rain-48.png';
import icon7 from '../assets/icons8-snow-48.png';
export default function Coursol() {
  return (
    <View
      style={{
        width: `${100}%`,
        height: 290,
        marginTop: 100,
      }}>
      <View style={styles.weather}>
        <Image style={{width: 68, height: 68}} source={icon5} />
        <Text style={styles.aboutweather}>
          Rain is liquid water in the form of droplets that have condensed from
          atmospheric water vapor and then become heavy enough to fall under
          gravity.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  weather: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.66)',
    width: 280,
    height: 290,
  },
  aboutweather: {
    fontSize: 20,
    color: 'grey',
    lineHeight: 25,
    marginTop: 10,
  },
});
