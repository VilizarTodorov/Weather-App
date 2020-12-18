import React, { Fragment } from "react";
import { connect } from "react-redux";
import Forecast from "../Forecast";
import SearchForm from "../SearchForm";
import TodayForecast from "../TodayForecast";
import "./styles.css";

const AppPage = (props) => {
  return (
    <Fragment>
      {!props.weather ? (
        <div className="App-page">
          <main className="app-main initial">
            <SearchForm></SearchForm>
          </main>
        </div>
      ) : (
        <div className={`App-page ${props.weather.main.temp > 15 ? "warm" : "cold"}-weather`}>
          <main className="app-main">
            <SearchForm></SearchForm>
            <section className="info-container">
              <TodayForecast></TodayForecast>
              <Forecast></Forecast>
            </section>
          </main>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    weather: state.weather.weather,
    error: state.weather.error,
  };
};

export default connect(mapStateToProps, null)(AppPage);
