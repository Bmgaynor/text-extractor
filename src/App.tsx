import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";

const worker = createWorker({
  logger: (m) => console.log(m),
});

function App() {

  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(
      "https://tesseract.projectnaptha.com/img/eng_bw.png"
    );
    setOcr(text);
  };
  const [ocr, setOcr] = useState("Recognizing...");
  useEffect(() => {
    doOCR();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://tesseract.projectnaptha.com/img/eng_bw.png"
          className="App-logo"
          alt="logo"
        />
        <p>{ocr}</p>
      </header>
    </div>
  );
}

export default App;
