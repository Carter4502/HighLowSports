import './App.css';
import React, {useState} from 'react';
import CardGroup from './CardGroup';
import $ from 'jquery';
import { useEffect } from 'react';


function App() {
  //if the user answers incorrectly set this to 1
  //State
  const [state, setState] = useState({
    gameStarted: 0,
    percent: 0,
    answer: 1
  })
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const getFirstTwoCards = async() => {
      try {
        const body = {'currency': 'USD'};
        var newPlayers;
        await fetch('http://localhost:8081/firstTwoPlayers', {
          method: 'POST',
          headers: {"Content-Type": "application/json",
                    Accept: "application/json"},
          body: JSON.stringify(body)
        })
        .then(function (response) {
          return response.json()
        })
        .then(function (response) {
          newPlayers = response; 
        })
        newPlayers[0].card_pos = "left";
        newPlayers[1].card_pos = "right";
        console.log(newPlayers);
        setCards(newPlayers);
      } catch (err) {
        console.error(err.message);
      }
    }
    getFirstTwoCards();
  }, []);

  
  
 
  const addCard = async() => {
    try {
      const body = {'currency': 'USD', 'compared_to': 1};
      var newPlayer;
      await fetch('http://localhost:8081/newPlayer', {
        method: 'POST',
        headers: {"Content-Type": "application/json",
                  Accept: "application/json"},
        body: JSON.stringify(body)
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        newPlayer = response[0]; 
      })
      newPlayer.id = Date.now();
      newPlayer.card_pos = 'off';
      
      setCards([
        ...cards,
        newPlayer
      ]);
    } catch (err) {
      console.error(err.message);
    }
    var newPercent = state.percent + 50;
    setState({...state, percent: newPercent});
  }

  const moveCards = (salary) => {
    // animation to show the salary of the right player:
    $("#rightcard").children('div')[0].children[2].remove();
    //create new h1
    const h1 = document.createElement("h1");
    const textNode = document.createTextNode(salary);
    h1.appendChild(textNode); 
    //set class name to salary for styling
    h1.className += "salary"
    //get the button element
    const element = $("#rightcard").children('div')[0];
    //replace the button with the h1
    element.replaceChild(h1, element.childNodes[2]);
    // move all cards over:                   
    $('#leftcard, #rightcard, #offcard').animate({'right' : state.percent+'%'}, 700);
    //change the card ids to reflect the move
    $('#leftcard').attr('id', 'deleted');
    $('#rightcard').attr('id', 'leftcard');
    $('#offcard').attr('id', 'rightcard');
  }

  //game logic
  $('#higher').click(function(){
    var rightSalary = cards[cards.length - 2].salary;
    var leftSalary = cards[cards.length - 3].salary;
    if (leftSalary > rightSalary) {
      return setState({...state, answer: 0});
    }
    moveCards(rightSalary);
  });

  $('#lower').on("click", function(){
    var rightSalary = cards[cards.length - 2].salary;
    var leftSalary = cards[cards.length - 3].salary;
    if (leftSalary < rightSalary) {
      return setState({...state, answer: 0});
    }
    moveCards(rightSalary);
  });
  //if they answered a question incorrectly, display the game over screen
  if(state.answer === 0){
    return (
      <div className='app'>
        <h1>Game Over!</h1>
      </div>
    )
  }
  //if game has started, game = 1, so show the game
  if(state.gameStarted === 1){
    return (
      <div className='app'>
        <button id='centerBtn' onClick={addCard}>VS</button>
        <CardGroup cards={cards} img={cards.img_url}></CardGroup>
    </div>
    )
  }
  //if the game hasnt started, show the loading screen with the start game btn
  return(
    <div className='app'>
      <button id="startBtn" onClick={() => {
        setState({...state, gameStarted: 1});
      }}>Start Game</button>
    </div>
  )
}
export default App;
