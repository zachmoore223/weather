import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIconLarge.js";
import Time from "./Time.js";
import DailyForecast from "./DailyForecast.js";
import HourlyForecast from "./HourlyForecast.js";

export default function Weather() {
  const [activeCity, setActiveCity] = useState("Columbus");
  const [latitude, setLatitude] = useState(39.96);
  const [longitude, setLongitude] = useState(-83.0);
  const [temperature, setTemperature] = useState("");
  const [chanceOfRain, setChanceOfRain] = useState("");
  const [cloudCoverage, setCloudCoverage] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const currentHour = new Date().getHours();

  //Logs for testing
  console.log("Current Hour: " + currentHour);

  //Ues effect to set weather variables
  useEffect(() => {
    function changeCity() {
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=" +
          latitude +
          "&longitude=" +
          longitude +
          "&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&timezone=America%2FNew_York"
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          

          setTemperature(response.current_weather.temperature);
          console.log("Temp: " + response.current_weather.temperature);

          setChanceOfRain(
            response.hourly.precipitation_probability[currentHour]);
            console.log("Chance of Rain: " + response.hourly.precipitation_probability[currentHour]);

          setCloudCoverage(
            response.hourly.cloudcover[currentHour]
          );
          console.log("Cloud Coverage: " + response.hourly.cloudcover[currentHour]);

          setWindSpeed(
            response.current_weather.windspeed
          );
          console.log("Wind Speed: " + response.current_weather.windspeed);

        });
    }
    changeCity();
  }, [activeCity]);


  return (
    <div>
      <div className="cityButtons">
        <button
          className={`cityButton ${activeCity === "Columbus" ? "active" : ""}`}
          id="Columbus"
          onClick={() => {
            setActiveCity("Columbus");
            setLatitude(39.96);
            setLongitude(-83.0);
          }}
        >
          Columbus
        </button>
        <br />
        <br />
        <button
          className={`cityButton ${activeCity === "Shelby" ? "active" : ""}`}
          id="Shelby"
          onClick={() => {
            setActiveCity("Shelby");
            setLatitude(40.8);
            setLongitude(-82.66);
          }}
        >
          Shelby
        </button>
        <br />
        <br />
        <button
          className={`cityButton ${activeCity === "Tampa" ? "active" : ""}`}
          id="Tampa"
          onClick={() => {
            setActiveCity("Tampa");
            setLatitude(27.95);
            setLongitude(-82.46);
          }}
        >
          Tampa
        </button>

      </div>
      <br /> <br />
      <div className="weather-app">
            <ul className="weatherUL">
                <li className="weather-card">
                <p className="currentWeatherHeader"> <strong> {activeCity} Current </strong>  </p> 
                <Time />
                <WeatherIcon cloudCoverage={cloudCoverage} /> &nbsp;&nbsp;
                <p className="temperature">{temperature} &#8457;</p>
                <p className="wind">Wind Speed: <strong> {windSpeed} mph</strong></p>
                <p className="rain">Chance of Rain:<strong> {chanceOfRain} %</strong></p>
                {/*<Forecast className="icon" activeCity={activeCity} latitude={latitude} longitude={longitude} />*/}
                </li>

            </ul>
            <div className="centerCard">
            <ul className="hourly-card">
            <p className="hourly-header"> <strong> {activeCity} Hourly Forecast </strong> </p>
            <HourlyForecast className="icon" activeCity={activeCity} latitude={latitude} longitude={longitude} />
            </ul>
            </div>

        </div>
        <br /> <br />
        <div className="weather-app">
        <div className="centerCard">
            <ul className="weekly-card">
            <p className="daily-header"> <strong> {activeCity} Forecast for Next Week </strong> </p>
            <DailyForecast className="icon" activeCity={activeCity} latitude={latitude} longitude={longitude} />
            </ul>
            </div>
         </div>
    </div>

  );
}
