import React from "react";
import { connect } from "react-redux";
import { fetchWeather } from "../../redux/actions";
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
    const main = this.props.weather ? this.props.weather.main : null;
    const name = this.props.weather ? this.props.weather.name : "";
    const dt = this.props.weather ? this.props.weather.dt : "";
    const weather = this.props.weather ? this.props.weather.weather[0].main : "";
    const temp = main ? Math.round(main.temp) : "";
    const min = main ? Math.round(main.temp_min) : "";
    const max = main ? Math.round(main.temp_max) : "";

    return (
      <div className={`App-page ${temp > 15 ? "warm" : "cold"}-weather`}>
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
              <h1 className="location">{name}</h1>
              <div className="date">{dt && this.dateBuilder(dt)}</div>
            </div>
            <div className="weather-info-container">
              <div className="weather-conditions">
                <h1 className="current-temperature">{temp}°c</h1>
                <p className="condition">{weather}</p>
                <div className="min-max-temps">
                  <p className="min-temp">{min}°c</p>
                  <p>/</p>
                  <p className="max-temp">{max}°c</p>
                </div>
              </div>
              <div className="forecast">
                <div className="day">
                  <p>icon</p>
                  <p>today</p>
                </div>
                <div className="day">
                  <p>icon</p>
                  <p>today</p>
                </div>
                <div className="day">
                  <p>icon</p>
                  <p>today</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    weather: state.weather,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeather: (city, country) => dispatch(fetchWeather(city, country)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
