// CardCarousel.js
import React, { useState } from 'react';
import CurrencyCard from './CurrencyCard';
import AddCardButton from './AddCardButton';

function CardCarousel() {
  const [cards, setCards] = useState([<CurrencyCard key={0} />]);
  const [showAddButton, setShowAddButton] = useState(true);

  const handleAddCard = () => {
    const newCards = [...cards, <CurrencyCard key={cards.length} />];
    setCards(newCards);
    setShowAddButton(false);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        {cards.map((card, index) => (
          <div key={index} className="mb-8">
            {card}
          </div>
        ))}
      </div>
      <AddCardButton onClick={handleAddCard} isVisible={showAddButton} />
    </div>
  );
}

export default CardCarousel;
