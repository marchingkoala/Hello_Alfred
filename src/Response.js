import React, { useState } from 'react';

const Response = ({action}) => {

    const [weather, setWeather] = useState("");
    
    //below function will allow Alfred to 'speak back' to me
    const speak = (text)=>{
        const speech = new window.SpeechSynthesisUtterance(text); //convert text to speech
        window.speechSynthesis.speak(speech);
    }

    const getWeather = async () => {
        const weatherData = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=47869e94aafd4fadbb0210955222712&q=New York&aqi=no`
        );
        const jsonweather = await weatherData.json();
        setWeather(
          `Right now in ${jsonweather.location.name}, it's ${jsonweather.current.temp_f} fahrenheit with ${jsonweather.current.condition.text}`
        );
    };
    
    // 7. Set up replies ( possibly with English accent, because WHY THE HELL NOT?)
  const processWord = async (action) => {
      switch (action) {
        case "Hello":
            setTimeout(speak("Hello Miss! How are you doing today?"), 2000);
          break;
        case "Alfred":
            speak("Yes Miss?")
          break;
        case "Good Evening":
            speak("Good Evening Miss!")
          break;
        case "Good Morning":
            speak("Good Morning to you too!")
          break;
        case "Weather":
            getWeather();
            speak(weather);
          break;
      }
  }

  let processingWord = null;

  const onListen = (action) => {
      if(processingWord){ return;}
      processingWord = action;
      console.log("spoken: ", action)
      processWord(action);
  }

  return (
    <div>
      {action ? onListen(action) : <div>waiting...</div>}
    </div>
  );
};

export default Response;