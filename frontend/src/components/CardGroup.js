import React from 'react';
import Card from "./Card";

const CardGroup = props => {
    return ( 
        props.cards.map(card => (
                <Card
                key={card.id}
                {...card}
                card_pos={card.card_pos}
                lc={props.lc} hc={props.hc}
                ></Card>
        ))
     );
}

export default CardGroup;