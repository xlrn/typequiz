import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function SomeButton () {
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  function fetchData() {
    let randomType = Math.floor(Math.random() * 18) + 1;
    fetch(`https://pokeapi.co/api/v2/type/${randomType}/`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setType(result.name)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
      })
  }

  useEffect(() => {
     fetchData();
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
  return (
    <div>
      <h1>{type}</h1>
      <button onClick={fetchData}>Click here to change type</button>
    </div>
  )}
}

function App() {
  return SomeButton();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

