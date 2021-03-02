import React from "react"

declare global {
  interface Window {
    languagePluginLoader: any;
    pyodide: any;
  }
}


const DEFAULT_PYTHON = 
`
import nltk
nltk.download('punkt')
sentence = 'At eight oclock on Thursday morning'
tokens = nltk.word_tokenize(sentence)
tokens
`

export const Python: React.FC = () => {
    const [pytonCode, setPythonCode] = React.useState(DEFAULT_PYTHON)
    const [output, setOutput] = React.useState('...Loading....')
    const [isLoadingPlayground, setIsLoadingPlayground] = React.useState(true)
    React.useEffect(() => {
      window.languagePluginLoader.then(function () {
        
        console.log('done loading running python')
        window.pyodide.loadPackage(['nltk', 'numpy'])
        setIsLoadingPlayground(false)
        setOutput('...Waiting....')
      })      
    }, [])

    
    return (
        <div>
            <h1>python playground</h1>
            <textarea id='code' value={pytonCode} rows={7} cols={100} onChange={e => setPythonCode(e.target.value)}></textarea>
            <button disabled={isLoadingPlayground} onClick={async function () {
              try {
                const output = await window.pyodide.runPythonAsync(pytonCode)
                setOutput(output)  
              } catch (e) {
                console.log(e)
                setOutput('error check console')
              }
              
            }}>Submit</button>
            <span>{output}</span>
        </div>
    )
};

export default Python;