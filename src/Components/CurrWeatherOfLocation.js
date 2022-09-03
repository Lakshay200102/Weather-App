import React from "react";
import classes from "./CurrWeatherOfLocation.module.css";
import meal7 from "./Assets/7.png";

const CurrWeatherOfLocation = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.location}>
        Location: {props.weatherObject.Area}
      </div>
      <div className={classes.WeatherBrief}>
        {props.weatherObject.WeatherBrief}{" "}
      </div>
      <div className={classes.weatherContainer}>
        <div>
          Temperature: <br />
          <div className={classes.Temp}>
            {props.weatherObject.Temperature.inCelsius} °C/
            {props.weatherObject.Temperature.inFahrenheit} °F
          </div>
        </div>
        <div className={classes.weatherImg}>
          <img src={meal7}></img>
        </div>
      </div>
      <div className={classes.PressureContainer}>
        Pressure:{" "}
        <span className={classes.pressure}>
          {props.weatherObject.Pressure.inHg} Hg
        </span>
      </div>
      <div className={classes.WindContainer}>
        Wind:{" "}
        <span>{props.weatherObject.Visibility.inKm} Km/H</span>
      </div>
      <div className={classes.WindDirection}>
        Wind Direction: <span>{props.weatherObject.WindDirection}</span>
      </div>
    </div>
  );
};

export default CurrWeatherOfLocation;
