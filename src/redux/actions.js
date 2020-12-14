import * as actionTypes from "./actionTypes";
import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

const fetchWeatherRequest = () => {
  return {
    type: actionTypes.FETCH_WEATHER,
  };
};

const fetchWeatherSuccess = (weather) => {
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    payload: {
      weather,
    },
  };
};

const fetchWeatherFailure = (error) => {
  return {
    type: actionTypes.FETCH_WEATHER_FAILURE,
    payload: {
      error,
    },
  };
};

const fetchWeather = (city, country) => {
  return (dispatch) => {
    dispatch(fetchWeatherRequest());
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${key}`)
      .then((response) => {
        const weather = response.data;
        console.log(weather);
        dispatch(fetchWeatherSuccess(weather));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchWeatherFailure(error));
      });
  };
};

export { fetchWeatherRequest, fetchWeatherFailure, fetchWeatherSuccess, fetchWeather };
