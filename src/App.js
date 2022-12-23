import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"

// 5. Train the butler to use more words
// 6. Execution of commands
// 7. Set up replies ( possibly with English accent, because WHY THE HELL NOT?)

function App() {
  // 1. Create Model and Action states
  const [model, setModel] = useState(null); //has array of command models with labels
  const [action, setAction] = useState(null); //any triggers from microphone will be stored here
  const [labels, setLabel] = useState(null); // labeling commands
  const replies = { hello: "Hello Miss", alfred: "Yes, Miss?", yes: "Did you say yes?"}

  // 2. Create recognizer
  const loadModel = async () =>{
    const recognizer = await speech.create("BROWSER_FFT");
    console.log("Model loaded")
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabel(recognizer.wordLabels());
  }

  useEffect(() => {
    loadModel();
  }, [])

  // 3. Create list for Actions

  const argMax = (arr) => {
    return arr.map((x, index) => [x,index]).reduce((r,a) => (a[0] > r[0] ? a:r))[1];
    //this function maps through each one of score's values
    //then reducing it to find the value with the highest probability
    // a is the current value and r is the previous value
  }

  const recognizeCommands = async () => {
    console.log("Listening for commands");
    // built in listen function will ensure that our butler is "listening" through the microphone
    model.listen(result => {
      console.log(result)
      setAction(labels[argMax(Object.values(result.scores))])
      console.log(action)
    }, {includeSpectrogram: true, probabilityThreshold: 0.7})
    //will generate spectrogram (a picture of sound)
    //probability threshold can be adjusted. I put 0.7 because I have accent
    //however 0.99 will be the most accurate for native english speakers
    
    setTimeout(() => {
      return model.stopListening();
    }, 5000);
    //setTimeout ensures Alfred to stop listening after 5 senconds    
  }
  //when result is console logged, "score" key displays an array with probabilities.
  //for example when I say "down", array label #2's probability was 0.97 (down)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/*  // 4. Display commands */}
        <button onClick={recognizeCommands}>Command</button>
        {action ? <div>{action}</div> : <div>No Action Detected</div> }
        { action === "yes" ? <div>{replies.yes}</div>: ""}
      </header>
    </div>
  );
}

export default App;
