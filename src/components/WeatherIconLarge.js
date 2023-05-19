import React from "react";
import sunny from "../icons/sunny.png";
import partlyCloudy from "../icons/partlyCloudy.png";
import cloudy from "../icons/cloudy.png";
import clearNight from "../icons/clearNight.png";
import partlyCloudyNight from "../icons/partlyCloudyNight.png";

export default function WeatherIconLarge({ cloudCoverage }) {
  const currentHour = new Date().getHours();

  //SUNNY
  if (cloudCoverage <= 25) {
    if(currentHour <= 19){
      return <img className="weatherIconLarge" src={sunny} alt="Sunny" width="80" height="80" />;
    } else {
    return <img className="weatherIconLarge" src={clearNight} alt="Clear Night" width="80" height="80" />;
    }
  } 
  //PARTLY CLOUDY
  else if (cloudCoverage > 25 && cloudCoverage < 50) {
    if(currentHour <= 17){
      return <img className="weatherIconLarge" src={partlyCloudy} alt="Partly Cloudy" width="80" height="80" />;
    } else {
    return (
      <img className="weatherIconLarge" src={partlyCloudyNight} alt="Partly Cloudy Night" width="80" height="80" />
    );}
  //CLOUDY
  } else if (cloudCoverage >= 50) {
    return <img className="weatherIconLarge" src={cloudy} alt="Cloudy" width="80" height="80" />;
  }
}