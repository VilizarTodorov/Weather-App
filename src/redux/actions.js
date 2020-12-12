import * as actionTypes from "./actionTypes";

const fetchWeatherAction = () => {
  return {
    type: actionTypes.FETCH_WEATHER,
  };
};

const fetchWeatherSuccessAction = (weather) => {
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    payload: {
      weather,
    },
  };
};

const fetchWeatherFailureAction = (error) => {
  return {
    type: actionTypes.FETCH_WEATHER_FAILURE,
    payload: {
      error,
    },
  };
};

export { fetchWeatherAction, fetchWeatherFailureAction, fetchWeatherSuccessAction };
