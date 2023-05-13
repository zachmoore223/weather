import React, { useState, useEffect } from "react";


export default function Time() {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentMinutesTwoDigits = new Date().getMinutes().toString().padStart(2, '0');
  const hour12 = currentHour > 12 ? currentHour - 12 : currentHour;
  const ampm = currentHour < 12 ? "AM" : "PM";

  
  
  return (
      <p className="currentTime"> {hour12}:{currentMinutesTwoDigits} {ampm} </p>

  );
}
