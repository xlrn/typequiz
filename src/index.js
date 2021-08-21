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

function Quiz() {
  const [score, setScore] = useState(0);
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
    try {
      const response1 = await fetch(`https://pokeapi.co/api/v2/type/${random1}/`);
      const type1 = await response1.json();
      doData(type1, newTypes, weaknesses, resistances, immunities);
      if (checkRandom(random1, random2)) {
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

  function checkRandom(num1, num2) {
    return (num1 !== num2 ? true : false);
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

  function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = generateRandom(i+1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function handleQuizLogic(e) {
    if (weakness.includes(e.target.value)) {
      bigFetch();
      updateScore();
    } else {
      bigFetch();
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
    <div className="container">
      <div>{status}</div>
      <h1>Your target type: {types[0]} / {types[1]}</h1>
      <ScoreKeeper score={score}/>
      <div>Select the type your target is weak to!</div>
      <div className="buttons">
        {renderTypeButton(quizButtons[0])}
        {renderTypeButton(quizButtons[1])}
        {renderTypeButton(quizButtons[2])}
        {renderTypeButton(quizButtons[3])}
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