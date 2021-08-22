import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import typeList from './types';

function ScoreKeeper(props) {
  return (
    <div>
      <h1>Correct Answers: {props.score}</h1>
    </div>
  )
}

function TypeButton(props) {
  return (
      <button className="typeButton" value={props.type} onClick={props.onClick}>{props.type}</button>
  )
}

function ResetButton(props) {
  return (
    <button className="resetButton" onClick={props.onClick}>Reset</button>
  )
}

function TypeDisplay(props) {
  if (props.types.length > 1) {
    return (
      <div>
        <h1>Your target type: {props.types[0]} / {props.types[1]}</h1>
      </div>
    )
  } else {
    return (
      <h1>Your target type: {props.types[0]}</h1>
    )
  }
}

function Quiz() {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weakness, setWeakness] = useState([]);
  const [quizButtons, setQuizButtons] = useState([]);
  const [status, setStatus] = useState("");

  async function bigFetch() {
    let newTypes = [];
    let weaknesses = [];
    let resistances = [];
    let immunities = [];
    let random1 = generateRandom(18) + 1;
    let random2 = generateRandom(18) + 1;
    let random3 = generateRandom(5);
    try {
      const response1 = await fetch(`https://pokeapi.co/api/v2/type/${random1}/`);
      const type1 = await response1.json();
      doData(type1, newTypes, weaknesses, resistances, immunities);
      if (random3 < 1) {
        const response2 = await fetch(`https://pokeapi.co/api/v2/type/${random2}/`);
        const type2 = await response2.json();
        doData(type2, newTypes, weaknesses, resistances, immunities);
        removeResistances(resistances, weaknesses);
        removeImmunities(immunities, weaknesses);
      }
      setWeakness(weaknesses);
      setTypes(newTypes);
      gatherTypes(weaknesses[generateRandom(weaknesses.length)]);
      setIsLoaded(true);
    }
    catch (error) {
      handleError(error);
    }
  }

  function handleError(error) {
    if (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  function doData(res, typesArr, weakArr, resArr, immuArr) {
          typesArr.push(res.name);
          addToWeaknesses(res.damage_relations.double_damage_from, weakArr);
          addToResistances(res.damage_relations.half_damage_from, resArr);
          addToImmunities(res.damage_relations.no_damage_from, immuArr)
  }

  function addToWeaknesses(res, weaknessArr) {
    for(const type in res) {
      if (!weaknessArr.includes(type)) {
        weaknessArr.push(res[type].name);
      }
    }
  }

  function addToResistances(res, resistArr) {
    for(const type in res) {
      if (!resistArr.includes(type)) {
        resistArr.push(res[type].name)
      }
    }
  }

  function addToImmunities(res, immuArr) {
    for(const type in res) {
      if (!immuArr.includes(type)) {
        immuArr.push(res[type].name);
      }
    }
  }

  function removeResistances(resists, weaknessArr) {
    resists.forEach(resist => {
      if (weaknessArr.includes(resist)) {
        weaknessArr.splice(weaknessArr.indexOf(resist), 1);
      }
    })
  }

  function removeImmunities(immunities, weaknesses) {
    immunities.forEach(immunity => {
      if (weaknesses.includes(immunity)) {
        weaknesses.splice(weaknesses.indexOf(immunity), 1);
      }
    })
  }
  

  // figure out some way to call fetchData on load
  useEffect(() => {
    bigFetch();
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
      let rando = generateRandom(17) + 1;
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

  function handleQuizLogic(e) {
    updateTotal();
    if (weakness.includes(e.target.value)) {
      bigFetch();
      updateScore();
    } else {
      bigFetch();
    }
  }

  function updateTotal() {
    let newTotal = total + 1;
    setTotal(newTotal);
  }

  function updateScore() {
    let newScore = score + 1;
    setScore(newScore);
    if (newScore >= 10) {
      let percent = Math.floor((score / total) * 100);
      setStatus(`You have completed the quiz! You got ${percent}%!`);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
  return (
    <div className="container">
      <div className="text">Reach 10 points to finish the quiz.</div>
      <div>{status}</div>
      <TypeDisplay types={types}/>
      <ScoreKeeper score={score}/>
      <div className="text">Select the type your target is weak to!</div>
      <div className="buttons">
        {renderTypeButton(quizButtons[0])}
        {renderTypeButton(quizButtons[1])}
        {renderTypeButton(quizButtons[2])}
        {renderTypeButton(quizButtons[3])}
      </div>
      <div>
        <ResetButton/>
      </div>
    </div>
  )}
}

ReactDOM.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>,
  document.getElementById('root')
);

function generateRandom(num) {
  return Math.floor(Math.random() * num);
}

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = generateRandom(i+1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}