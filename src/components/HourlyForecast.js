import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon.js";

export default function HourlyForecast({activeCity, latitude, longitude}) {
  const [temperatureHigh, setTemperatureHigh] = useState("");
  const [temperatureLow, setTemperatureLow] = useState("");
  const [chanceOfRain, setChanceOfRain] = useState("");
  const [cloudCoverage, setCloudCoverage] = useState("");
  const [hourlyTemps, setHourlyTemps] = useState("");
  const [windSpeeds, setWindSpeeds] = useState("");
  const currentHour = new Date().getHours();

  //Logs for testing
  console.log("Current Hour: " + currentHour);

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

          setTemperatureHigh(response.daily.apparent_temperature_max);
          console.log("Forecase High Temp: " + response.daily.apparent_temperature_max);

          setTemperatureLow(response.daily.apparent_temperature_min);
          console.log("Forecase Low Temp: " + response.daily.apparent_temperature_min);

          setChanceOfRain(
            response.hourly.precipitation_probability);
            console.log("Hourly Precip: " + response.hourly.precipitation_probability);

          setHourlyTemps(response.hourly.temperature_2m);
          console.log("Hourly Temps: " + response.hourly.temperature_2m);

          setWindSpeeds(response.hourly.windspeed_10m);
          console.log("Hourly WindSpeeds: " + response.hourly.windspeed_10m);

          setCloudCoverage(
            response.hourly.cloudcover_mid
          );
          console.log("Forecast Cloud Cover Array: " + response.hourly.cloudcover_mid);



        });
    }
    changeCity();
  }, [activeCity]);


  return (
  <div>
    <br /><br />
    <div>
    <ForecastTable cloudCoverage={cloudCoverage} chanceOfRain={chanceOfRain} hourlyTemps={hourlyTemps} currentHour={currentHour} windSpeeds={windSpeeds}
    />
    </div>
  </div>
  );

}
/* Takes current day and makes an array call daysOfWeek with numbers 0-6 (o being Sunday) */
function ForecastTable({ cloudCoverage, chanceOfRain, hourlyTemps, currentHour, windSpeeds }) {
  let amPM = currentHour > 12 ? 'PM' : 'AM';

  // Generate table rows for the next 6 hours
  const tableRows = [];
  for (let i = 1; i <= 6; i++) {
    let hour = currentHour + i;
    if (hour > 12) {
      hour = hour - 12;
      amPM = 'PM';
    }
  
    tableRows.push(
      <tr key={i}>
        <td>{hour} {amPM}: &nbsp;&nbsp;</td>
        <td><WeatherIcon cloudCoverage={cloudCoverage[hour]} /> &nbsp;</td>
        <td><strong> {hourlyTemps[hour]} &nbsp;&nbsp;&nbsp;&nbsp;</strong></td>
        <td>Rain: <strong> {chanceOfRain[hour]}% &nbsp;&nbsp;&nbsp;&nbsp;</strong></td>
        <td>Wind: <strong> {windSpeeds[hour]} mph</strong></td>
      </tr>
    );
  }

  return (
    <table className="forecastTableHourly">
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}


