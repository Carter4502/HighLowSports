import './App.css';
import React, {useState} from 'react';
import CardGroup from './CardGroup';
import $ from 'jquery';


function App() {
  //if the user answers incorrectly set this to 1
  var answeredWrong = 0;
  //State
  const [game, setGame] = useState(0);
  const [cards, setCards] = useState([
    {
      id: 0,
      pos: "left",
      name: "Lebron James",
      salary:"$5.5 million" ,
      img: "https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-03/11aa%20%287%29_0.png?itok=pVF2r-fD",
    },
    {
      id: 1,
      pos: "right",
      name: "Tom Brady",
      salary: "$5.5 million", 
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
        salary: "$20 million",
        img: "https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-03/11aa%20%287%29_0.png?itok=pVF2r-fD",
      }
    ]);
  }

  // const removeCard = id => {
  //   const newCards = [...cards].filter(card => {
  //     return card.id !== id;
  //   })
  //   setCards(newCards);
  // }

  $(document).ready(function() {
    $('#higher, #lower').click(function(){
        // animation to show the salary of the right player:
        $("#rightcard").children('div')[0].children[2].remove();
        //create new h1
        const h1 = document.createElement("h1");
        const textNode = document.createTextNode("$15 million");
        h1.appendChild(textNode); 
        //set class name to salary for styling
        h1.className += " salary"
        //get the button element
        const element = $("#rightcard").children('div')[0];
        //replace the button with the h1
        element.replaceChild(h1, element.childNodes[2]);
        // move all cards over:
        $('#leftcard, #rightcard, #offcard').animate({'right' : "50%"}, 700);
        //change the card ids to reflect the move
        $('#leftcard').attr('id', 'deleted');
        $('#rightcard').attr('id', 'leftcard');
      });
  });
  $('#offcard').attr('id', 'rightcard');
  //if game has started, game = 1, so show the game
  if(game === 1){
    return (
      <div className='app'>
        <button id='centerBtn' onClick={addCard}>VS</button>
        <CardGroup cards={cards} img={cards.img}></CardGroup>
    </div>
    )
  }
  //if they answered a question incorrectly, display the game over screen
  else if(answeredWrong === 1){
    return (
      <div className='app'>
        <h1>Game Over!</h1>
      </div>
    )
  }
  //if the game hasnt started, show the loading screen with the start game btn
  return(
    <div className='app'>
      <button id="startBtn" onClick={() => {
        setGame(1);
      }}>Start Game</button>
    </div>
  )
}
export default App;
