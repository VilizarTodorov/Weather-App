import React from "react";
import { connect } from "react-redux";
import { clearForecast } from "../../redux/forecast/actions";
import { fetchWeather } from "../../redux/weather/actions";

const INITIAL_STATE = {
  city: "",
  country: "",
};

class SearchForm extends React.Component {
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

  render() {
    const { city, country } = this.state;
    return (
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.weather.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeather: (city, country) => dispatch(fetchWeather(city, country)),
    clearForecast: () => dispatch(clearForecast()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
