import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
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
      <button type="button" className="btn btn-primary typeButton" value={props.type} onClick={props.onClick}>{props.type}</button>
  )
}

function ResetButton(props) {
  return (
    <button className="btn btn-secondary resetButton" onClick={props.onClick}>Reset</button>
  )
}

function TypeDisplay(props) {
  let typeString = `Your target type: ${props.types[0]}`;
  if (props.types.length > 1) {
    typeString = typeString + `/ ${props.types[1]}`
  }
  return (
    <div>
      <h1>{typeString}</h1>
    </div>
  )
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


  // main function for updating types displayed on the quiz
  async function bigFetch() {
    let newTypes = [];
    let weaknesses = [];
    let resistances = [];
    let immunities = [];
    let typeId1 = generateRandom(18) + 1;
    let typeId2 = generateRandom(18) + 1;
    let singleTypeChance = generateRandom(5);

    try {
      // grab first random type from api
      const response1 = await fetch(`https://pokeapi.co/api/v2/type/${typeId1}/`);
      const type1 = await response1.json();
      addData(type1, newTypes, weaknesses, resistances, immunities);
      // set chance of single-type pokemon showing up as the question
      // make sure the two random types will also not be the same
      if (singleTypeChance > 1 && random2 !== random1) {
        const response2 = await fetch(`https://pokeapi.co/api/v2/type/${typeId2}/`);
        const type2 = await response2.json();
        addData(type2, newTypes, weaknesses, resistances, immunities);
        // filter out resistances and immunities from the weaknesses array 
        // to only allow weaknesses from different type interactions
        // i.e. a fire/water type pokemon would not be weak to fire because water is resistant to itself
        removeTypeFromArray(resistances, weaknesses);
        removeTypeFromArray(immunities, weaknesses);
      }
      setWeakness(weaknesses);
      setTypes(newTypes);
      let typeButtons = shuffleTypes(weaknesses[generateRandom(weaknesses.length)]);
      setQuizButtons(typeButtons);
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

  // figure out some better way to call bigFetch on load
  useEffect(() => {
    bigFetch();
  }, []);

  // adds the result from api call to each array, weaknesses, resistances, immunities
  function addData(res, typesArr, weakArr, resArr, immuArr) {
    typesArr.push(res.name);
    addTypeToArray(res.damage_relations.double_damage_from, weakArr);
    addTypeToArray(res.damage_relations.half_damage_from, resArr);
    addTypeToArray(res.damage_relations.no_damage_from, immuArr);
  }

  function addTypeToArray(res, arr) {
    for(const type in res) {
      if (!arr.includes(type)) {
        arr.push(res[type].name);
      }
    }
  }

  function removeTypeFromArray(types, arr) {
    types.forEach(type => {
      if (arr.includes(type)) {
        arr.splice(arr.indexOf(type), 1);
      }
    })
  }

  // returns a shuffled array of 4 types, one being the weakness
  function shuffleTypes(weakness) {
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
    let shuffledTypes = shuffleArray(types);
    return shuffledTypes;
  }

  // update totals, scores and types upon clicking quiz button
  function handleQuizLogic(e) {
    updateTotal();
    if (weakness.includes(e.target.value)) {
      bigFetch();
      updateScore();
    } else {
      bigFetch();
    }
  }

  function handleReset() {
    setScore(0);
    setTotal(0);
    setStatus("");
    bigFetch();
  }

  // total is used to calculate the percentage given at the completion message
  function updateTotal() {
    let newTotal = total + 1;
    setTotal(newTotal);
  }

  // update the score upon answering the question correctly
  // disables button and delivers completion message upon reaching 10 points
  function updateScore() {
    let newScore = score + 1;
    setScore(newScore);
    if (newScore >= 10) {
      let percent = Math.floor((score / total) * 100);
      disableButtons();
      setStatus(`You have completed the quiz! You got ${percent}%!`);
    }
  }

  function renderTypeButton(type) {
    return (
      <TypeButton type={type} onClick={handleQuizLogic}>{type}</TypeButton>
    )
  }

  // render error message if one occurs
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    // render loading message if not loaded
    return <div>Loading...</div>
  } else {
    return (
        <div className="container">
          <div className="text">Reach 10 points to finish the quiz.</div>
          <div>
            <h1>{status}</h1>
          </div>
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
            <ResetButton onClick={handleReset}/>
          </div>
        </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>,
  document.getElementById('root')
);

// generate random number 0 to num
function generateRandom(num) {
  return Math.floor(Math.random() * num);
}

// shuffle the array by using the durstenfeld shuffle
// pick random element, exclude from next draw by swapping with
// current element, done in place.
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = generateRandom(i+1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function disableButtons() {
  let buttons = document.querySelectorAll(".typeButton");
  buttons.forEach(button => button.disabled = true);
}