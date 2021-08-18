import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ScoreKeeper(props) {
  return (
    <div>
      <h1>{props.score}</h1>
    </div>
  )
}


function SomeButton (props) {

  useEffect(() => {
    props.fetchData();
  }, [])

  const weaklist = props.weakness.map((weak) => 
    <h2 key={weak}>{weak}</h2>);

  if (props.error) {
    return <div>Error: {props.error.message}</div>
  } else if (!props.isLoaded) {
    return <div>Loading...</div>
  } else {
  return (
    <div>
      <h1>{props.type}</h1>
      <div>
        {weaklist}
      </div>
      <button>Click here to change type</button>
    </div>
  )}
}

function Quiz() {
  // lift state from somebutton into quiz
  const [score, setScore] = useState(0);
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

  function handleClick() {
    let newScore = score + 1;
    setScore(newScore);
  }

  return (
    <div>
      <ScoreKeeper score={score}/>
      <SomeButton type={type} error={error} isLoaded={isLoaded} weakness={weakness}/>
      <button onClick={handleClick}>AAAA</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>,
  document.getElementById('root')
);

