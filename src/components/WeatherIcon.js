import React from "react";
import sunny from "../icons/sunny.png";
import partlyCloudy from "../icons/partlyCloudy.png";
import cloudy from "../icons/cloudy.png";
import clearNight from "../icons/clearNight.png";
import partlyCloudyNight from "../icons/partlyCloudyNight.png";

export default function WeatherIcon({ cloudCoverage }) {
  const currentHour = new Date().getHours();

  //SUNNY
  if (cloudCoverage <= 25) {
    if(currentHour <= 17){
      return <img src={sunny} alt="Sunny" width="50" height="50" />;
    } else {
    return <img src={clearNight} alt="Clear Night" width="50" height="50" />;
    }
  } 
  //PARTLY CLOUDY
  else if (cloudCoverage > 25 && cloudCoverage < 50) {
    if(currentHour <= 17){
      return <img src={partlyCloudy} alt="Partly Cloudy" width="50" height="50" />;
    } else {
    return (
      <img src={partlyCloudyNight} alt="Partly Cloudy Night" width="50" height="50" />
    );}
  //CLOUDY
  } else if (cloudCoverage >= 50) {
    return <img src={cloudy} alt="Cloudy" width="50" height="50" />;
  }
}