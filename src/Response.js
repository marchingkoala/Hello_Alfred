import React from 'react';

const Response = ({action}) => {
    
    
    const getWeather = async () => {
        const weatherData = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=47869e94aafd4fadbb0210955222712&q=New York&aqi=no`
            );
            const jsonweather = await weatherData.json();
            return jsonweather
        };
    const todaysDate = () => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let day = newDate.getDay();

        return `Today is ${month} ${date} of ${year} and it's ${day}`
    }
    const chucknorrisJoke = async () => {
        const jokeAPI = await fetch("https://api.chucknorris.io/jokes/random");
        const jsonJoke = await jokeAPI.json()
        return jsonJoke;
    }

    const devJoke = async () => {
        const thejoke = await fetch(
          "https://backend-omega-seven.vercel.app/api/getjoke"
        );
        const jsonjoke = await thejoke.json();
        return jsonjoke;
    }
    //below function will allow Alfred to 'speak back' to me
    const speak = (text)=>{
        const speech = new window.SpeechSynthesisUtterance(text); //convert text to speech
        window.speechSynthesis.speak(speech);
    }

    // 7. Set up replies ( possibly with English accent, because WHY THE HELL NOT?)
  const processWord = async (action) => {
      switch (action) {
        case "Hello":
           speak("Hello Miss! How are you doing today?");
          break;
        case "Alfred":
            speak("Yes, Miss?")
          break;
        case "Good Evening":
            speak("Good Evening Miss!")
          break;
        case "Good Morning":
            speak("Good Morning to you too!")
          break;
        case "Weather":
            const jsonweather = await getWeather();
            speak(
              `Right now in ${jsonweather.location.name}, it's ${jsonweather.current.temp_f} fahrenheit with ${jsonweather.current.condition.text}`
            );
          break;
        case "Jazz":
            speak("Here's your jazz, miss")
            const playJazz = () => {
                window.open("https://www.youtube.com/watch?v=lR7icNffxXE");
            }
            playJazz();
            break;
        case "Cheer":
            speak("Don't worry about a thing, Miss! I believe in you.")
            break;
        case "Dadjoke":
            speak("Here's a dad joke for you, miss");
            const joke = await devJoke();
            setTimeout(() => {
              speak(`${joke[0].question}...  ${joke[0].punchline}`);
            }, 3000);
            break;
        case "FavoriteSong":
            speak("Here's your favorite song. I hope you feel better.");
            const playFavoriteSong = () => {
                window.open("https://www.youtube.com/watch?v=ZZ0PZRYin2s");
            }
            setTimeout(() => {playFavoriteSong()}, 3000)
            break;
        case "How do I look":
            speak("Fantastic as usual, Miss!");
            break;
        case "Husband":
            speak("He is still here. I don't think he has found out yet...")
            break;
        case "Joke":
            speak("Here's a good one for you, miss")
            const badjoke = await chucknorrisJoke();
            setTimeout(()=> { speak(`${badjoke.value}`)}, 3000)
            break;
        case "Thank you":
            speak("You are most welcome, miss. It's my pleasure to assist you");
            break;
        case "Today":
            speak(todaysDate());
            setTimeout(()=>{speak("Today will be a fantastic day for you, miss");}, 3000)
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