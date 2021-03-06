import '../App.css';
import React, {useState} from 'react';
import CardGroup from './CardGroup';
import $ from 'jquery';
import { useEffect } from 'react';


function App() {
  //State
  const [state, setState] = useState({
    gameStarted: 0,
    percent: 50,
    answer: 1,
    score: 0,
    hasWon: 0
  });
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const getStartingPlayers = async() => {
      try {
        const body = {'currency': 'USD'};
        var newPlayers;
        await fetch('http://localhost:8081/getStartingPlayers', {
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
        newPlayers[2].card_pos = "off";
        setCards(newPlayers);
      } catch (err) {
        console.error(err.message);
      }
    }
    getStartingPlayers();
  }, []);

  const addCard = async(ids) => {
    var hasWon = 0;
    try {
      console.log(ids);
      const body = {'currency': 'USD', 'compared_to': ids};
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
      //need to set this equal to an incremented id from database
      if (newPlayer === undefined) {
        hasWon = 1;
      } else {
        newPlayer.card_pos = 'off';
        setCards([
          ...cards,
          newPlayer
        ]);
      }
      
    } catch (err) {
      console.error(err.message);
    }
    if (hasWon === 1) {
      console.log("setting haswon");
      setState({...state, hasWon: 1});
    }
    var newPercent = state.percent + 50;
    setState({...state, percent: newPercent});
  }

  const moveCards = async(salary) => {
    if (window.matchMedia('(max-width: 900px)').matches){
      // do functionality on screens smaller than 860px
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
      $('#leftcard, #rightcard, #offcard').animate({'bottom' : state.percent+'%'}, 700);
      //change the card ids to reflect the move
      $('#leftcard').attr('id', 'deleted');
      $('#rightcard').attr('id', 'leftcard');
      $('#offcard').attr('id', 'rightcard');
    }else{
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
      console.log("moving " + state.percent);       
      $('#leftcard, #rightcard, #offcard').animate({'right' : state.percent+'%'}, 700);
      //change the card ids to reflect the move
      $('#leftcard').attr('id', 'deleted');
      $('#rightcard').attr('id', 'leftcard');
      $('#offcard').attr('id', 'rightcard');
    }
  }

  //game logic
  const higherClick = () => {
    console.log("HasWon =" + state.hasWon);
    var rightSalary = cards[cards.length - 2].salary;
    var leftSalary = cards[cards.length - 3].salary;
    if (state.hasWon === 1) {
      console.error("You won");
    } else if (leftSalary > rightSalary) {
      return setState({...state, answer: 0});
    } else {
      var ids = [];
      for (var i = 0; i < cards.length; i++) {
        ids.push(cards[i].id);
      }
      addCard(ids);
      moveCards(rightSalary);
      return setState({...state, score: state.score++});
    }
  }
  const lowerClick = () => {
    console.log("HasWon =" + state.hasWon);
    var rightSalary = cards[cards.length - 2].salary;
    var leftSalary = cards[cards.length - 3].salary;
    if (state.hasWon === 1) {
      console.error("You won");
    } else if (leftSalary < rightSalary) {
      return setState({...state, answer: 0});
    }
    else{
      var ids = [];
      for (var i = 0; i < cards.length; i++) {
        ids.push(cards[i].id);
      }
      addCard(ids);
      moveCards(rightSalary);
      return setState({...state, score: state.score++});
    }
  }
  
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
        <button id='centerBtn' /*needs to be deleted after request is made for first three cards*/onClick={addCard}>VS</button>
        <CardGroup cards={cards} img={cards.img_url} lc={lowerClick} hc={higherClick}></CardGroup>
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
