import weatherReducer from "./weather/weatherReducer";
import forecastReducer from "./forecast/forecastReducer";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ weather: weatherReducer, forecast: forecastReducer });

export default rootReducer;
