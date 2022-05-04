import './App.css';
import React, {useState} from 'react';
import CardGroup from './CardGroup';



function App() {
  //if the user answers incorrectly set this to 1
  var answeredWrong = 0;
  var score = 0;
  //State
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

  //const correctAnswer = () => {
    //score = score + 1;
  //}

  if(answeredWrong === 1){
    return (
      <div className='app'>
        <h1>Game Over!</h1>
      </div>
    )
  }
  return(
    <div className='app'>
      <button className='centerBtn' onClick={addCard}>VS</button>
      <CardGroup cards={cards} img={cards.img}></CardGroup>
    </div>
  )
}

export default App;
