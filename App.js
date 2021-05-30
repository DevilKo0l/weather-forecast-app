import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo.js'
import UnitsPicker from './components/UnitsPicker.js'
import ReloadIcon from './components/ReloadIcon.js'
import WeatherDetails from './components/WeatherDetails.js'
import {color, colors} from './utils/index'



const WEATHER_API_KEY = 'a4e253bdef873d8c7c6eeedd1dd696ea'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')
  useEffect(()=> {
    load()
  },[unitsSystem])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      
      let { status } = await Location.requestBackgroundPermissionsAsync()
      if(status !=  'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return 
      }      
      const location = await Location.getCurrentPositionAsync()

      const {latitude, longitude} = location.coords

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)

      const result = await response.json()

      if(response.ok){
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.messenge)
      }
      
    } catch (error) {
        setErrorMessage(error.messenge)
    }    
  } 

  if(currentWeather) {
    const {
      main: { temp }
    } = currentWeather
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
            <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
            <ReloadIcon load={load}/>
            <WeatherInfo currentWeather={currentWeather} />            
        </View>
        <WeatherDetails currentWeather={currentWeather}/>
      </View>
    )
  } else if (errorMessage){
      return (
        <View style={styles.container}>
            <Text>{errorMessage}</Text>
          <StatusBar style="auto" />
        </View>
      )
  }
  else {
     return(
        <View style={styles.container}>
         <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
          <StatusBar style="auto" />
        </View>
     )
 }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',     
  },

  main: {
    justifyContent: 'center',
    flex: 1,    
  }
});
