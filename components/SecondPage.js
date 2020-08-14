import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import image from '../assets/Secondbg.webp';
export default function SecondPage() {
  return (
    <View style={styles.page2}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.heading}>Weather Here</Text>
          </View>

          <Text style={styles.intro}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here'.
          </Text>
          <Text style={styles.learn}>Learn more</Text>
        </View>
        <View style={styles.dots}>
          <View style={styles.dotone}></View>
          <View style={styles.dottwo}></View>
          <View style={styles.dotthree}></View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  page2: {flex: 1},
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    paddingTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  heading: {
    marginBottom: 20,
    color: '#FFF',
    fontSize: 38,
    letterSpacing: 1,
    fontFamily: 'TTRounds-Bold',
  },
  intro: {
    fontSize: 19,
    lineHeight: 28,
    color: 'rgba(255,255,255,0.8)',
  },
  learn: {
    marginTop: 10,
    color: 'skyblue',
    fontSize: 20,
    textAlign: 'right',
  },
  dots: {
    marginTop: 130,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotone: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  dottwo: {
    width: 20,
    height: 20,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  dotthree: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
});
