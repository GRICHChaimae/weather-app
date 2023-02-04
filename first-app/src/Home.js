import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [index, setIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const images = [
    require('../assets/images/spite_moon_cloud.svg'),
    require('../assets/images/spite_moon_rain.svg'),
    require('../assets/images/spite_moon_snow.svg'),
    require('../assets/images/sun-clouds-remix.svg'),
    require('../assets/images/weather.svg'),
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 3000);
    setIntervalId(id);

    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Weather App </Text>
      <Text style={styles.description}>Check the weather in your location</Text>
      <Image
        style={styles.image}
        source={images[index]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10
  },
  description: {
    marginTop: 20,
    marginBottom: 40,
  },
  image: {
    // flex: 1,
    width: 130,
    height: 100,
    resizeMode: "contain",    
    // justifyContent: 'center',
  }

})