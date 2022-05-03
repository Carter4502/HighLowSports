import React from "react";
import './Card.css';

const Card = (props) => {
  return (
        <div className="card">
            <img src={props.img} draggable="false" alt="Sports athlete"/>
            <div className="card-info">
                <h1 className="athleteName">{props.name}</h1>
                <p>makes</p>
                <h1 className="salary">{props.salary}</h1>
                <p>per year</p>
            </div>
        </div>
    )
}
export default Card;