import React from "react";

const Card = (props) => {
    if(props.card_pos === "left"){
        return (
            <div className="card"  id={props.card_pos + "card"}>
                <img src={props.img_url} draggable="false" alt="Sports athlete"/>
                <div className="card-info">
                    <h1 className="athleteName">{props.name}</h1>
                    <p>makes</p>
                    <h1 className="salary">{props.salary}</h1>
                    <p>per year</p>
                </div>
            </div>
        )
    //if the class is off then the 
    }else if (props.card_pos === "off"){
        return (
            <div className="card"  id={props.card_pos + "card"}>
                <img src={props.img_url} draggable="false" alt="Sports athlete"/>
                <div className="card-info">
                    <h1 className="athleteName">{props.name}</h1>
                    <p>makes</p>
                    <button id="higher" onClick={props.hc}>Higher</button>
                    <button id="lower" onClick={props.lc}>Lower</button>
                    <p>per year</p>
                </div>
            </div>
        )
    }
    //return the right card based on the class name
    return (
        <div  className="card" id={props.card_pos + "card"}>
            <img src={props.img_url} draggable="false" alt="Sports athlete"/>
            <div className="card-info">
                <h1 className="athleteName">{props.name}</h1>
                <p>makes</p>
                <button id="higher" onClick={props.hc}>Higher</button>
                    <button id="lower" onClick={props.lc}>Lower</button>
                <p>per year</p>
            </div>
        </div>
    )
}
export default Card;