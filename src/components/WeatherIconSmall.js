import React from "react";
import sunny from "../icons/sunny.png";
import partlyCloudy from "../icons/partlyCloudy.png";
import cloudy from "../icons/cloudy.png";
import clearNight from "../icons/clearNight.png";
import partlyCloudyNight from "../icons/partlyCloudyNight.png";

export default function WeatherIconSmall({ cloudCoverage }) {
  const currentHour = new Date().getHours();

  //SUNNY
  if (cloudCoverage <= 25) {
    if(currentHour <= 17){
      return <img className="weatherIconSmall" src={sunny} alt="Sunny" width="40" height="40" />;
    } else {
    return <img className="weatherIconSmall" src={clearNight} alt="Clear Night" width="40" height="40" />;
    }
  } 
  //PARTLY CLOUDY
  else if (cloudCoverage > 25 && cloudCoverage < 50) {
    if(currentHour <= 17){
      return <img className="weatherIconSmall" src={partlyCloudy} alt="Partly Cloudy" width="40" height="40" />;
    } else {
    return (
      <img className="weatherIconSmall" src={partlyCloudyNight} alt="Partly Cloudy Night" width="40" height="40" />
    );}
  //CLOUDY
  } else if (cloudCoverage >= 50) {
    return <img className="weatherIconSmall" src={cloudy} alt="Cloudy" width="40" height="40" />;
  }
}