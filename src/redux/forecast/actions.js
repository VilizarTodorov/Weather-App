import * as actionTypes from "./actionTypes";
import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

const fetchForecastRequest = () => {
  return {
    type: actionTypes.FETCH_FORECAST_REQUEST,
  };
};

const fetchForecastSuccess = (forecast) => {
  return {
    type: actionTypes.FETCH_FORECAST_SUCCESS,
    payload: {
      forecast,
    },
  };
};

const fetchForecastFailure = (error) => {
  return {
    type: actionTypes.FETCH_FORECAST_FAILURE,
    payload: {
      error,
    },
  };
};

const clearForecast = () => {
  return {
    type: actionTypes.CLEAR_FORECAST,
  };
};

const fetchForecast = (lat, lon) => {
  return (dispatch) => {
    dispatch(fetchForecastRequest());
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${key}`
      )
      .then((response) => {
        const forecast = response.data;
        dispatch(fetchForecastSuccess(forecast));
      })
      .catch((error) => {
        dispatch(fetchForecastFailure(error));
      });
  };
};

export { fetchForecast, clearForecast };
