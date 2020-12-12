import * as actionTypes from "./actionTypes";

const INITIAL_STATE = {
  isFetching: false,
  weather: null,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHER:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        weather: action.payload.weather,
        error: null,
      };

    case actionTypes.FETCH_WEATHER_FAILURE:
      return {
        ...state,
        isFetching: false,
        weather: null,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
