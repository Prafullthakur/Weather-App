import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import image from '../assets/headimage.png';

export default function FirstPage() {
  return (
    <View style={styles.page1}>
      <View style={styles.headcont}>
        <Text style={styles.heading}>Hey!</Text>
      </View>
      <View style={{alignItems: 'center', marginBottom: -20}}>
        <Image style={styles.headimg} source={image} />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'grey', fontSize: 16}}>
          Welcome to Weather Here
        </Text>
      </View>
      <View style={styles.dots}>
        <View style={styles.dotone}></View>
        <View style={styles.dottwo}></View>
        <View style={styles.dotthree}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  page1: {flex: 1, padding: 0, backgroundColor: 'white'},
  headcont: {marginLeft: 10, marginTop: 0},
  heading: {
    color: '#A2A2A1FF',
    marginTop: 35,
    marginLeft: 20,
    fontSize: 53,
    letterSpacing: 1,
    fontFamily: 'TTRounds-Bold',
  },
  headimg: {
    width: 370,
    height: 450,
  },
  dots: {
    marginTop: 70,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotone: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  dottwo: {
    width: 20,
    height: 20,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  dotthree: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
