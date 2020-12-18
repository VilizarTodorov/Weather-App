import React, { Fragment } from "react";
import ForecastEntry from "../ForecastEntry";
import { connect } from "react-redux";
import { fetchForecast } from "../../redux/forecast/actions";
import "./styles.css";

const Forecast = (props) => {
  const getForecast = () => {
    const { lat, lon } = props.weather.coord;
    props.fetchForecast(lat, lon);
  };

  return (
    <Fragment>
      {!props.forecast ? (
        <button className="submit-button" onClick={getForecast}>
          Get Forecast
        </button>
      ) : (
        <ul className="forecast">
          {props.forecast.daily.slice(0, 3).map((x, index) => (
            <ForecastEntry key={index} icon={x.weather[0].icon} dt={x.dt} temp={x.temp.day}></ForecastEntry>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    forecast: state.forecast.forecast,
    weather: state.weather.weather,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchForecast: (lat, lon) => dispatch(fetchForecast(lat, lon)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
