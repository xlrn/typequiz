import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import typeList from './types';

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

function Quiz() {
  // lift state from somebutton into quiz
  const [score, setScore] = useState(0);
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [weakness, setWeakness] = useState([]);
  const [quizButtons, setQuizButtons] = useState([]);
  const [status, setStatus] = useState("");
  
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
          let rando = Math.floor(Math.random() * weaknessState.length);
          gatherTypes(weaknessState[rando]);
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

  function gatherTypes(weakness) {
    let types = [];
    let count = 0;
    while (count < 3) {
      let rando = Math.floor(Math.random() * 17) + 1;
      let getType = Object.values(typeList)[rando];
      if (getType !== weakness && !types.includes(getType)) {
        types.push(getType);
        count++;
      }
    }
    types.push(weakness);
    shuffleArray(types);
    setQuizButtons(types);
  }

  function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function handleQuizLogic(e) {
    if (weakness.includes(e.target.value)) {
      updateScore();
      fetchData();
    } else {
      fetchData();
    }
  }

  function updateScore() {
    let newScore = score + 1;
    setScore(newScore);
    if (newScore >= 10) {
      setStatus("You have completed the quiz!");
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
  return (
    <div>
      <div>{status}</div>
      <h1>{type}</h1>
      <ScoreKeeper score={score}/>
      {renderTypeButton(quizButtons[0])}
      {renderTypeButton(quizButtons[1])}
      {renderTypeButton(quizButtons[2])}
      {renderTypeButton(quizButtons[3])}
    </div>
  )}
}

ReactDOM.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>,
  document.getElementById('root')
);
