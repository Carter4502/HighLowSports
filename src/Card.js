import React from "react";

const Card = (props) => {
    if(props.pos === "left"){
        return (
            <div className="card"  id={props.pos + "card"}>
                <img src={props.img} draggable="false" alt="Sports athlete"/>
                <div className="card-info">
                    <h1 className="athleteName">{props.name}</h1>
                    <p>makes</p>
                    <h1 className="salary">{props.salary}</h1>
                    <p>per year</p>
                </div>
            </div>
        )
    }else if (props.pos === "off"){
        return (
            <div className="card"  id={props.pos + "card"}>
                <img src={props.img} draggable="false" alt="Sports athlete"/>
                <div className="card-info">
                    <h1 className="athleteName">{props.name}</h1>
                    <p>makes</p>
                    <button id="higher">Higher</button>
                    <button id="lower">Lower</button>
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
                <button id="lower">Lower</button>
                <p>per year</p>
            </div>
        </div>
    )
}
export default Card;