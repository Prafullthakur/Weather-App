import React, {useEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Coursol from './Coursol';
import imagebg from '../assets/Thirdbg.jpg';

export default ThirdPage = ({findCoordinates}) => {
  return (
    <View style={styles.page3}>
      <ImageBackground style={styles.imagebg} source={imagebg}>
        <View style={styles.container}>
          <Text style={styles.heading}>Let's Find</Text>
          <Coursol />
          <TouchableOpacity
            onPress={() => findCoordinates()}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  page3: {
    flex: 1,
  },
  container: {
    paddingTop: 30,
    flex: 1,
  },
  imagebg: {
    flex: 1,
    resizeMode: 'cover',
  },
  heading: {
    marginLeft: 30,
    color: 'rgba(255,255,255,0.86)',
    fontSize: 47,
    letterSpacing: 1,
    fontFamily: 'TTRounds-Bold',
  },

  appButtonContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 110,
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
