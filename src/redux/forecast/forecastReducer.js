import * as actionTypes from "./actionTypes";

const INITIAL_STATE = {
  isFetching: false,
  forecast: null,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FORECAST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        forecast: action.payload.forecast,
        error: null,
      };

    case actionTypes.FETCH_FORECAST_FAILURE:
      return {
        ...state,
        isFetching: false,
        forecast: null,
        error: action.payload.error,
      };

    case actionTypes.CLEAR_FORECAST:
      return {
        ...state,
        forecast: null,
      };

    default:
      return state;
  }
};

export default reducer;
