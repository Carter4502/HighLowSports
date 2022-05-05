import './App.css';
import React, {useState} from 'react';
import CardGroup from './CardGroup';
import $ from 'jquery';


function App() {
  //if the user answers incorrectly set this to 1
  //State
  const [state, setState] = useState({
    gameStarted: 0,
    percent: 0,
    answer: 1
  })
  const [cards, setCards] = useState([
    {
      id: 0,
      pos: "left",
      name: "Lebron James",
      salary: 65000,
      img: "https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-03/11aa%20%287%29_0.png?itok=pVF2r-fD",
    },
    {
      id: 1,
      pos: "right",
      name: "Tom Brady",
      salary: 55000, 
      img: "https://www.gannett-cdn.com/presto/2020/06/16/USAT/b11cdc99-639b-4b70-a1aa-ee612a0a4dde-AP_Buccaneers_Brady_Football.jpg?crop=2974,1673,x614,y110&width=2974&height=1673&format=pjpg&auto=webp",
    }
  ]);

  const addCard = () => {
    const timestamp = Date.now();
    setCards([
      ...cards,
      {
        id: timestamp,
        pos: "off",
        name: "Jayden Flipp",
        salary: 20000,
        img: "https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-03/11aa%20%287%29_0.png?itok=pVF2r-fD",
      }
    ]);
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
        <CardGroup cards={cards} img={cards.img}></CardGroup>
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
