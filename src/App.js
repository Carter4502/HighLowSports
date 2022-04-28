import './App.css';
import React from 'react';
import Card from './Card';


function App() {
  return (
    <div className='app'>
      <Card className="card" name="Lebron James" sport="Basketball"/>
      <Card className="card" name="Tom Brady" sport="Football"/>
    </div>
  );
}

export default App;
