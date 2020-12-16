import React from "react";
import "./styles.css";

const icons = {
  "01d": <i className="far fa-sun fa-lg"></i>,
  "01n": <i className="far fa-moon fa-lg"></i>,
  "02d": <i className="fas fa-cloud-sun fa-lg"></i>,
  "02n": <i className="fas fa-cloud-moon fa-lg"></i>,
  "03d": <i className="fas fa-cloud fa-lg"></i>,
  "03n": <i className="fas fa-cloud fa-lg"></i>,
  "04d": <i className="fas fa-cloud fa-lg"></i>,
  "04n": <i className="fas fa-cloud fa-lg"></i>,
  "09d": <i className="fas fa-cloud-showers-heavy fa-lg"></i>,
  "09n": <i className="fas fa-cloud-showers-heavy fa-lg"></i>,
  "10d": <i className="fas fa-cloud-sun-rain fa-lg"></i>,
  "10n": <i className="fas fa-cloud-moon-rain fa-lg"></i>,
  "11d": <i className="fas fa-bolt fa-lg"></i>,
  "11n": <i className="fas fa-bolt fa-lg"></i>,
  "13d": <i className="far fa-snowflake fa-lg"></i>,
  "13n": <i className="far fa-snowflake fa-lg"></i>,
  "50d": <i className="fas fa-smog fa-lg"></i>,
  "50n": <i className="fas fa-smog fa-lg"></i>,
};

const ForecastEntry = (props) => {
  const getDay = (dt) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dt * 1000);
    let day = days[date.getDay()];
    return day;
  };

  return (
    <li className='forecast-entry'>
      <p className="icon">{icons[props.icon]}</p>
      <p>{props.temp}°c</p>
      <p>{getDay(props.dt)}</p>
    </li>
  );
};

export default ForecastEntry;
