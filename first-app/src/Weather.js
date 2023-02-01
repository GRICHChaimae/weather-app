import React, { useState,useEffect } from 'react';
import * as Location from 'expo-location';
// import { Dimensions } from 'react-native';

import { View, ScrollView, StyleSheet, Text, Dimensions, Image } from 'react-native';
const { width } = Dimensions.get('window');

const CardSlide = () => {
  const [scrollX, setScrollX] = useState(0);

  const [Monday,setMonday]=useState([])
  const [Tuesday,setTuesday]=useState([])
  const [Wednesday,setWednesday]=useState([])
  const [Thursday,setThursday]=useState([])
  const [Friday,setFriday]=useState([])
  const [Saturday,setSaturday]=useState([])
  const [Sunday,setSunday]=useState([])
  useEffect(()=>{
	GetWeather()
  },[])

	let latitude ;
	let longitude 

	async function GetLocation() {
		let { status } = await Location.requestBackgroundPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert('Permission not granted', 'Allow the app to use location service.', [ { text: 'OK' } ], {
				cancelable: false
			});
		}

		let { coords } = await Location.getCurrentPositionAsync();

		if (coords) {
			latitude = coords.latitude
			longitude = coords.longitude
		} else {
			console.log('location error')
		}
	}

	async function GetWeather() {

		await GetLocation()

		const openWeatherKey = 'd437be763ed1a04b2cfb15109e4955aa';
		let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}&units=metric`;
		const response = await fetch(url);
		const data = await response.json();

		if (!response.ok) alert('wheather error');
		else {
			for (let i = 0; i <data.list.length; i++) {
				if (new Date(data.list[i].dt*1000).toLocaleString('en-us', { weekday: 'long' }) ==='Tuesday') {
					setTuesday((prevData) => [...prevData, data.list[i]]);
				}
				if (new Date(data.list[i].dt*1000).toLocaleString('en-us', { weekday: 'long' }) ==='Wednesday') {
					setWednesday((prevData) => [...prevData, data.list[i]]);
				}
				if (new Date(data.list[i].dt*1000).toLocaleString('en-us', { weekday: 'long' }) ==='Thursday') {
					setThursday((prevData) => [...prevData, data.list[i]]);
				}
				if (new Date(data.list[i].dt*1000).toLocaleString('en-us', { weekday: 'long' }) ==='Friday') {
					setFriday((prevData) => [...prevData, data.list[i]]);
				}
				if (new Date(data.list[i].dt*1000).toLocaleString('en-us', { weekday: 'long' }) ==='Saturday') {
					setSaturday((prevData) => [...prevData, data.list[i]]);
				}
				if (new Date(data.list[i].dt*1000).toLocaleString('en-us', { weekday: 'long' }) ==='Sunday') {
					setSunday((prevData) => [...prevData, data.list[i]]);
				}
				if (new Date(data.list[i].dt*1000).toLocaleString('en-us', { weekday: 'long' }) ==='Monday') {
					setFriday((prevData) => [...prevData, data.list[i]]);
				}
			}
		} 
	}


  const renderCards = (dayData) => {
    return dayData.map((item, i) => {
      return (
        <View style={styles.card1} key={i}>
          <Text style={styles.date}>{new Date(item.dt*1000).toLocaleString('en-us', { weekday: 'long' })}</Text>
          <Text>{item.dt_txt}</Text>
          <Image
            style={styles.icon}
            source={require('../assets/images/spite_moon_snow.svg')}
          />
          <Text style={styles.condition}>{item.weather[0].main} : {item.weather[0].description} {item.main.temp} °C</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.ce}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => setScrollX(nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
        contentContainerStyle={{}}
      >
        {
          Monday.length != 0 ? (
            <ScrollView style={{ height: 844, }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={styles.card}>
                <View style={styles.cardText}>{renderCards(Monday)}</View>
              </View>
            </ScrollView>
          ):(null)
        }

        {
          Tuesday.length != 0 ? (
            <ScrollView style={{ height: 844, }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={styles.card}>
                <View style={styles.cardText}>{renderCards(Tuesday)}</View>
              </View>
            </ScrollView>
          ):(null)
        }

        {
          Wednesday.length != 0 ? (
          <ScrollView style={{ height: 844, }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={styles.card}>
                <View style={styles.cardText}>{renderCards(Wednesday)}</View>
              </View>
            </ScrollView>

          ):(null)
        }

        {
          Thursday.length != 0 ? (
            <ScrollView style={{ height: 844, }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={styles.card}>
                <View style={styles.cardText}>{renderCards(Thursday)}</View>
              </View>
            </ScrollView>
          ):(null)
        }

        {
          Friday.length != 0 ? (
            <ScrollView style={{ height: 844, }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={styles.card}>
                <View style={styles.cardText}>{renderCards(Friday)}</View>
              </View>
            </ScrollView>
          ):(null)
        }

        {
          Saturday.length != 0 ? (
            <ScrollView style={{ height: 844, }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={styles.card}>
                <View style={styles.cardText}>{renderCards(Saturday)}</View>
              </View>
            </ScrollView>
          ):(null)
        }

        {
          Sunday.length != 0 ? (
            <ScrollView style={{ height: 844, }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={styles.card}>
                <View style={styles.cardText}>{renderCards(Sunday)}</View>
              </View>
            </ScrollView>
          ):(null)
        }

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 844,
    backgroundColor: 'skyblue',
  },
  card: {
    height: 'auto',
    // width: width - 50,
    marginTop: 20,
    display: 'flex',
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    marginHorizontal: 25,
    borderRadius: 10,
  },
  icon: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  card1: {
    // width: '50%',
    height: 200,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // marginHorizontal: 10,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    width:'100%'
  },
});

export default CardSlide;
