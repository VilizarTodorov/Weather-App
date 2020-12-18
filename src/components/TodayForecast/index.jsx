import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./styles.css";

const TodayForecast = (props) => {
  const dateBuilder = (dt) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dt * 1000);
    let day = days[date.getDay()];
    let currentDate = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return `${day}, ${month} ${currentDate}, ${year}`;
  };

  return (
    <Fragment>
      <div className="location-container">
        <h1 className="location">{props.weather.name}</h1>
        <div className="date">{props.weather.dt && dateBuilder(props.weather.dt)}</div>
      </div>
      <div className="weather-info-container">
        <div className="weather-conditions">
          <h1 className="current-temperature">{Math.round(props.weather.main.temp)}°c</h1>
          <p className="condition">{props.weather.weather[0].main}</p>
          <div className="min-max-temps">
            <p className="min-temp">{Math.round(props.weather.main.temp_min)}°c</p>
            <p>/</p>
            <p className="max-temp">{Math.round(props.weather.main.temp_max)}°c</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    weather: state.weather.weather,
  };
};

export default connect(mapStateToProps, null)(TodayForecast);
