import React from "react";
import './Card.css';

function Card (props) {
    return (
        <div className="card">
            <img src="https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-03/11aa%20%287%29_0.png?itok=pVF2r-fD" />
            <h1>{props.name}</h1>
            <p>Sport: {props.sport}</p>
        </div>
    )
}
export default Card;