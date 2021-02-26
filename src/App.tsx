import React, { useEffect, useState } from "react";
import { createWorker, ImageLike } from "tesseract.js";
import "./App.css";
// import Search from "./Components/Search"

const getURLParams = () => {
  return new URLSearchParams(window.location.search)
}
const getImageURL = () => {
  const userURL = getURLParams().get('image')
  return userURL
}

function App() {
  const [ocr, setOcr] = useState("Waiting for image...");
  const [inProgress, setInprogress] = useState(false)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const doOCR = async (target: ImageLike)  => {
    const worker = createWorker({
      logger: (m) => setProgress(m.progress),
    });
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    setInprogress(true)
    setOcr('processing please wait..')
    try {
      setImage(URL.createObjectURL(target))
      const {
        data: { text },
      } = await worker.recognize(
        target
      )
          
      setInprogress(false)
      setOcr(text)
    } catch (e) {
      console.log(e)
      setInprogress(false)
      setOcr('Failed to read image data :(')
    }

  };
  useEffect(() => {
    const imageURL = getImageURL()
    if (imageURL) {
      doOCR(imageURL);
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Extractor</h1>
        <input type='file' id='uploader' disabled={inProgress} onChange={(e) => {
          const files = e.target?.files
          
          if (files && files[0]) {
            return doOCR(files[0])
          }
          }} />

        {inProgress && <span>Percent Complete: {progress}</span>}
        {/* <Search /> */}
        {image !== '' && <img
          src={image}
          className="App-logo"
          alt="logo"
        />}
        <p>{ocr}</p>
      </header>
    </div>
  );
}

export default App;
