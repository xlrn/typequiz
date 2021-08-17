import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function scoreKeeper(props) {
  return (
    <div>
      <h1>{props.score}</h1>
    </div>
  )
}


function SomeButton () {
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weakness, setWeakness] = useState([]);
  
  function fetchData() {
    let randomType = Math.floor(Math.random() * 18) + 1;
    fetch(`https://pokeapi.co/api/v2/type/${randomType}/`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setType(result.name);
          let weaknesses = result.damage_relations.double_damage_from;
          let weaknessState = [];
          for(const type in weaknesses) {
            weaknessState.push(weaknesses[type].name);
          }
          setWeakness(weaknessState);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
      })
  }

  useEffect(() => {
     fetchData();
  }, [])

  const weaklist = weakness.map((weak) => 
    <h2 key={weak}>{weak}</h2>);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
  return (
    <div>
      <h1>{type}</h1>
      <div>
        {weaklist}
      </div>
      <button onClick={fetchData}>Click here to change type</button>
    </div>
  )}
}

function Quiz() {
  // lift state from somebutton into quiz
  return SomeButton();
}

ReactDOM.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>,
  document.getElementById('root')
);

