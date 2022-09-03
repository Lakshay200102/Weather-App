import React, { useState, useEffect } from "react";
import classes from "./SelectLocation.module.css";
import AllCountries from "./Dropdown";
import axios from "axios";

function SelectLocation(props) {
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("");
  const [stateList, setStateList] = useState([]);
  const [state, setState] = useState("");
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const getCountry = async () => {
      const resCountry = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const countryArr = resCountry.data.data.map((countryData) => {
        return countryData.country;
      });
      const arr = [...countryArr];
      setCountryList(arr);
    };
    getCountry();
  }, []);

  const countryHandler = (event) => {
    setCountry(event.target.value);
    const setCities = async () => {
      const url = "https://countriesnow.space/api/v0.1/countries/states";
      const body = { country: `${event.target.value}` };
      const response = await axios.post(url, body);
      const stateArr = response.data.data.states.map((stateName) => {
        return stateName.name;
      });
      setStateList(stateArr);
    };
    setCities();
  };

  const stateHandler = (event) => {
    setState(event.target.value);
    const cityList = async () => {
      const url = "https://countriesnow.space/api/v0.1/countries/state/cities";
      const body = { country: `${country}`, state: `${event.target.value}` };
      const response = await axios.post(url, body);
      setCityList(response.data.data);
    };
    cityList();
  };

  const cityHandler = (event) => {
    setCity(event.target.value);
    setFormIsValid(true);
  };

  const formHandler = (event) => {
    props.setInfo(city, country);
    event.preventDefault()
    setCountry("");
    setStateList([])
    setState('')
    setCityList([])
    setCity('')
  }

  return (
    <div className={classes.location}>
      <form onSubmit={formHandler}>
        <div>
          <select
            name="countryName"
            id="countryName"
            value={country}
            onChange={countryHandler}
          >
            <option value="">--Select Your Country--</option>
            {countryList.map((thisCountry) => (
              <AllCountries
                key={`${thisCountry}+${Math.random()}`}
                CName={thisCountry}
              />
            ))}
          </select>
        </div>

        <div>
          <select
            name="stateName"
            id="stateName"
            value={state}
            onChange={stateHandler}
          >
            <option value="">--Select Your State--</option>
            {stateList.map((thisState) => (
              <AllCountries
                key={`${thisState}+${Math.random()}`}
                CName={thisState}
              />
            ))}
          </select>
        </div>

        <div>
          <select
            name="stateName"
            id="stateName"
            onChange={cityHandler}
            value={city}
          >
            <option value="">--Select Your City--</option>
            {cityList.map((thisCity) => (
              <AllCountries
                key={`${thisCity}+${Math.random()}`}
                CName={thisCity}
              />
            ))}
          </select>
        </div>
        <button type="submit" disabled={!formIsValid}>Submit</button>
      </form>
    </div>
  );
}

export default SelectLocation;
