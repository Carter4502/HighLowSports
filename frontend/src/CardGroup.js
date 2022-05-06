import React from 'react';
import Card from "./Card";

const CardGroup = props => {
    return ( 
        props.cards.map(card => (
                <Card
                key={card.id}
                {...card}
                card_pos={card.card_pos}
                ></Card>
        ))
     );
}

export default CardGroup;