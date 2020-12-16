import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchForecast, clearForecast } from "../../redux/forecast/actions";
import { fetchWeather } from "../../redux/weather/actions";
import ForecastEntry from "../ForecastEntry";
import "./styles.css";

const INITIAL_STATE = {
  city: "",
  country: "",
};

class AppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { city, country } = this.state;
    this.props.fetchWeather(city, country);
    this.props.clearForecast();
  };

  getForecast = () => {
    const { lat, lon } = this.props.weather.coord;
    this.props.fetchForecast(lat, lon);
  };

  dateBuilder = (dt) => {
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

  render() {
    const { city, country } = this.state;
    return (
      <Fragment>
        {!this.props.weather ? (
          <div className="App-page">
            <main className="app-main initial">
              <form className="page-form" onSubmit={this.onSubmit}>
                <div className="search-container">
                  <input
                    className="search-bar"
                    name="city"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={this.onChange}
                    autoComplete="off"
                    required
                  />
                  <input
                    className="search-bar"
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={this.onChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <button
                  className={`submit-button ${this.props.isFetching ? "disabled" : ""}`}
                  disabled={this.props.isFetching}
                  type="submit"
                >
                  {`Get${this.props.isFetching ? "ting" : ""} Weather`}
                </button>
              </form>
            </main>
          </div>
        ) : (
          <div className={`App-page ${this.props.weather.main.temp > 15 ? "warm" : "cold"}-weather`}>
            <main className="app-main">
              <form className="page-form" onSubmit={this.onSubmit}>
                <div className="search-container">
                  <input
                    className="search-bar"
                    name="city"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={this.onChange}
                    autoComplete="off"
                    required
                  />
                  <input
                    className="search-bar"
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={this.onChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <button
                  className={`submit-button ${this.props.isFetching ? "disabled" : ""}`}
                  disabled={this.props.isFetching}
                  type="submit"
                >
                  {`Get${this.props.isFetching ? "ting" : ""} Weather`}
                </button>
              </form>
              <section className="info-container">
                <div className="location-container">
                  <h1 className="location">{this.props.weather.name}</h1>
                  <div className="date">{this.props.weather.dt && this.dateBuilder(this.props.weather.dt)}</div>
                </div>
                <div className="weather-info-container">
                  <div className="weather-conditions">
                    <h1 className="current-temperature">{Math.round(this.props.weather.main.temp)}°c</h1>
                    <p className="condition">{this.props.weather.weather[0].main}</p>
                    <div className="min-max-temps">
                      <p className="min-temp">{Math.round(this.props.weather.main.temp_min)}°c</p>
                      <p>/</p>
                      <p className="max-temp">{Math.round(this.props.weather.main.temp_max)}°c</p>
                    </div>
                  </div>
                  {!this.props.forecast ? (
                    <button className="submit-button" onClick={this.getForecast}>
                      Get Forecast
                    </button>
                  ) : (
                    <ul className="forecast">
                      {this.props.forecast.daily.slice(0, 3).map((x, index) => (
                        <ForecastEntry key={index} icon={x.weather[0].icon} dt={x.dt} temp={x.temp.day}></ForecastEntry>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </main>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.weather.isFetching,
    weather: state.weather.weather,
    error: state.weather.error,
    forecast: state.forecast.forecast,
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearForecast: () => dispatch(clearForecast()),
    fetchWeather: (city, country) => dispatch(fetchWeather(city, country)),
    fetchForecast: (lat, lon) => dispatch(fetchForecast(lat, lon)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
