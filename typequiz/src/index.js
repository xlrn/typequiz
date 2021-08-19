import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

function ScoreKeeper(props) {
  return (
    <div>
      <h1>{props.score}</h1>
    </div>
  )
}

function TypeButton(props) {
  return (
    <div>
      <button value={props.type} onClick={props.onClick}>{props.type}</button>
    </div>
  )
}

function SomeButton (props) {
  return (
    <div>
      <button onClick={props.handleClick}>Click here to change type</button>
    </div>
  )
}

function Quiz() {
  // lift state from somebutton into quiz
  const [score, setScore] = useState(0);
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
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
  
  // figure out some way to call fetchData on load
  useEffect(() => {
    fetchData();
  }, []);

  function renderTypeButton(type) {
    return (
      <TypeButton type={type} onClick={handleQuizLogic}>{type}</TypeButton>
    )
  }

  function handleQuizLogic(e) {
    console.log(weakness);
    console.log(e.target.value);
    if (weakness.includes(e.target.value)) {
      updateScore();
      fetchData();
    }
  }

  function updateScore() {
    let newScore = score + 1;
    setScore(newScore);
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
  return (
    <div>
      <h1>{type}</h1>
      <ScoreKeeper score={score}/>
      {renderTypeButton(weakness[0])}
      <SomeButton handleClick={fetchData}/>
    </div>
  )}
}

ReactDOM.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>,
  document.getElementById('root')
);
