import React, { Fragment, useState, useEffect } from 'react'
import SelectLocation from './Components/SelectLocation';
import CurrentWeather from './Components/CurrentWeather';
import CurrWeatherOfLocation from './Components/CurrWeatherOfLocation';
import Delayed from './Components/Delayed';
import classes from './App.module.css'
import axios from 'axios';

function App() {
  const [specifiedWeatherInfo, setSpecifiedWeatherInfo] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      console.log('Hi')
    }, 2000)
  }, [])
  
  
  const setLocationInfoHandler = (cityData, countryData) => {
    const fetchLocationKey = async () => {
      const url= `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=ffFUAEYcfUxDopQa6be0QLGXCxiCmJH6&q=${cityData}%20${countryData}&details=true&offset=2`
      const response = await axios.get(url);
      console.log(response);
      const locationKEY = response.data[0].Key;
      console.log(locationKEY)
      const weatherCondition = await axios.get(
        `http://dataservice.accuweather.com//currentconditions/v1/${locationKEY}?apikey=ffFUAEYcfUxDopQa6be0QLGXCxiCmJH6&language=en-us&details=true`
      );
      console.log(weatherCondition)
      const weatherConditionToBeFulfilled = weatherCondition.data[0];
      console.log(weatherConditionToBeFulfilled)
      const weatherForecast = await axios.get(
        "http://dataservice.accuweather.com/forecasts/v1/daily/5day/188408?apikey=ffFUAEYcfUxDopQa6be0QLGXCxiCmJH6&language=en-us&details=true&metric=true"
      );
      const weatherOfLocation = {
        Area: cityData,
        Temperature: {
          inCelsius:
            weatherConditionToBeFulfilled.ApparentTemperature.Metric.Value,
          inFahrenheit:
            weatherConditionToBeFulfilled.ApparentTemperature.Imperial.Value,
        },
        Pressure: {
          inHg: weatherConditionToBeFulfilled.Pressure.Imperial.Value,
        },
        Visibility: {
          inKm: weatherConditionToBeFulfilled.Visibility.Metric.Value,
        },
        WeatherBrief: weatherConditionToBeFulfilled.WeatherText,
        WeatherIcon: weatherConditionToBeFulfilled.WeatherIcon,
        WindDirection: weatherConditionToBeFulfilled.Wind.Direction.Localized,
        WindSpeed: {
          inKmH: weatherConditionToBeFulfilled.Wind.Speed.Metric.Value,
        },
      };
      console.log(weatherOfLocation);
      setSpecifiedWeatherInfo(weatherOfLocation);
    }
    fetchLocationKey();
    
  }

  return (
    <Fragment>
      <div className={classes.container}>
      <SelectLocation setInfo={setLocationInfoHandler} />
      {!specifiedWeatherInfo && <CurrentWeather />}
      {specifiedWeatherInfo && <div className={classes.weather}><Delayed><CurrWeatherOfLocation weatherObject={specifiedWeatherInfo} /></Delayed></div>}
      </div>
    </Fragment>
  )
}

export default App;