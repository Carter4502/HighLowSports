import React from "react";
import './Card.css';
import $ from 'jquery';

const Card = (props) => {
    $('#higher').click(function(){
        $('#rightcard').animate({
            'right' : "300px"
        });
    });

    if(props.pos === "left"){
        return (
            <div id={props.pos + "card"}>
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

    return (
        <div  className="card" id={props.pos + "card"}>
            <img src={props.img} draggable="false" alt="Sports athlete"/>
            <div className="card-info">
                <h1 className="athleteName">{props.name}</h1>
                <p>makes</p>
                <button id="higher">Higher</button>
                <button>Lower</button>
                <p>per year</p>
            </div>
        </div>
    )
}
export default Card;