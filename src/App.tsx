import React from "react";
import "./App.css";
import Python from './Components/Python'
import TextExtractor from "./Components/TextExtractor"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TextExtractor />

        <Python />
      </header>
    </div>
  );
}

export default App;
