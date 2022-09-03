import React, { useEffect, useState } from "react";
import classes from "./CurrentWeather.module.css";
import Delayed from "./Delayed";
import axios from "axios";
import CurrWeatherOfLocation from "./CurrWeatherOfLocation";

function CurrentWeather() {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const tellWeather = async () => {
      const ip = await axios.get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_ShKGIjLWAslkJ5tWBe9GI5kEzPQ6Y"
      );
      const currentIPAddress = ip.data.ip;
    //   console.log(ip);
      const locationKey = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=ffFUAEYcfUxDopQa6be0QLGXCxiCmJH6&q=${currentIPAddress}`
      );
    //   console.log(locationKey);
      const locationKEY = locationKey.data.Key;
      const weatherCondition = await axios.get(
        `http://dataservice.accuweather.com//currentconditions/v1/${locationKEY}?apikey=ffFUAEYcfUxDopQa6be0QLGXCxiCmJH6&language=en-us&details=true`
      );
      const weatherConditionToBeFulfilled = weatherCondition.data[0];
      console.log(weatherConditionToBeFulfilled)
      const weatherForecast = await axios.get(
        "http://dataservice.accuweather.com/forecasts/v1/daily/5day/188408?apikey=ffFUAEYcfUxDopQa6be0QLGXCxiCmJH6&language=en-us&details=true&metric=true"
      );
    //   console.log(weatherForecast);
      const weatherOfLocation = {
          Area: locationKey.data.LocalizedName,
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
      setWeather(weatherOfLocation);
    };
    tellWeather();
  }, []);

  return <div className={classes.weather}>
    <Delayed>
    <CurrWeatherOfLocation weatherObject={weather} />
    </Delayed>
  </div>;
}

export default CurrentWeather;
