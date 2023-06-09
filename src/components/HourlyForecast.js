import React, { useState, useEffect } from "react";
import WeatherIconSmall from "./WeatherIconSmall.js";

export default function HourlyForecast({activeCity, latitude, longitude}) {
  const [temperatureHigh, setTemperatureHigh] = useState("");
  const [temperatureLow, setTemperatureLow] = useState("");
  const [chanceOfRain, setChanceOfRain] = useState("");
  const [cloudCoverage, setCloudCoverage] = useState("");
  const [hourlyTemps, setHourlyTemps] = useState("");
  const [windSpeeds, setWindSpeeds] = useState("");
  const currentHour = new Date().getHours();
  const [showForecastTable, setShowForecastTable] = useState(true);

  const toggleForecastTable = () => {
    setShowForecastTable(!showForecastTable);
  };

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

        {showForecastTable ? (
      <ForecastTable
        cloudCoverage={cloudCoverage}
        chanceOfRain={chanceOfRain}
        hourlyTemps={hourlyTemps}
        currentHour={currentHour}
        windSpeeds={windSpeeds}
      />
    ) : (
      <ForecastTable6MoreHours
        cloudCoverage={cloudCoverage}
        chanceOfRain={chanceOfRain}
        hourlyTemps={hourlyTemps}
        currentHour={currentHour}
        windSpeeds={windSpeeds}
      />
    )}

<button className="sixHourToggle" onClick={toggleForecastTable}>
        {showForecastTable ? 'Next Six Hours' : 'Previous Six Hours'}
      </button>


    </div>
  </div>
  );

}
/* Takes current day and makes an array call daysOfWeek with numbers 0-6 (o being Sunday) */
function ForecastTable({ cloudCoverage, chanceOfRain, hourlyTemps, currentHour, windSpeeds }) {
  //currentHour == milatary time, hour = 12 clock time
  //timeCount needed to display proper time once time goes from 12AM back to beginning of array 1AM
  const timeDisplay = ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
                       "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM",];
  let timeCount = currentHour;

  const tableRows = [];
  for (let i = 1; i <= 6; i++) {

    //currentHour plus i (current hour is military time so + i continues into next day if it goes above 23)
    let hour = currentHour + i;

    if (hour > 12){
      hour = hour -12;
    }

    // Generate table rows for the next 6 hours
    tableRows.push(
      <tr key={i}>
        <td>{timeDisplay[timeCount]}: &nbsp;&nbsp;</td>
        <td><WeatherIconSmall chanceOfRain={chanceOfRain[currentHour + i]} cloudCoverage={cloudCoverage[currentHour + i]} /> &nbsp;</td>
        <td><strong> {hourlyTemps[currentHour + i]} &nbsp;&nbsp;&nbsp;</strong></td>
        <td>Rain: <strong> {chanceOfRain[currentHour + i]}% &nbsp;&nbsp;&nbsp;</strong></td>
        <td>Wind: <strong> {windSpeeds[currentHour + i]} mph</strong></td>
      </tr>
    );

    timeCount++;
    if (timeCount > 23){
      timeCount = timeCount - 23;
    }
  }

  return (
    <table className="forecastTableHourly">
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}

function ForecastTable6MoreHours({ cloudCoverage, chanceOfRain, hourlyTemps, currentHour, windSpeeds }) {
  //currentHour == milatary time, hour = 12 clock time
  //timeCount needed to display proper time once time goes from 12AM back to beginning of array 1AM
  const timeDisplay = ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
                       "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM",];
  let timeCount = currentHour + 6;

  const tableRows = [];
  for (let i = 1; i <= 6; i++) {

    //currentHour plus i (current hour is military time so + i continues into next day if it goes above 23)
    let hour = currentHour + i;

    if (hour > 12){
      hour = hour -12;
    }

    if (timeCount > 23){
      timeCount = timeCount - 23;
    }

    // Generate table rows for the next 6 hours
    tableRows.push(
      <tr key={i}>
        <td>{timeDisplay[timeCount]}: &nbsp;&nbsp;</td>
        <td><WeatherIconSmall cloudCoverage={cloudCoverage[currentHour + i + 6]} /> &nbsp;</td>
        <td><strong> {hourlyTemps[currentHour + i + 6]} &nbsp;&nbsp;&nbsp;</strong></td>
        <td>Rain: <strong> {chanceOfRain[currentHour + i + 6]}% &nbsp;&nbsp;&nbsp;</strong></td>
        <td>Wind: <strong> {windSpeeds[currentHour + i + 6]} mph</strong></td>
      </tr>
    );

    timeCount++;
    if (timeCount > 23){
      timeCount = timeCount - 23;
    }
  }

  return (
    <table className="forecastTableHourly">
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}


